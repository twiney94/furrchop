<?php

namespace App\Service;

use App\Entity\Booking;
use App\Repository\BookingRepository;
use App\Repository\EmployeeRepository;
use App\Repository\ServiceRepository;
use App\Repository\ShopRepository;
use Doctrine\ORM\EntityManagerInterface;

class BookingService
{
    private EntityManagerInterface $entityManager;
    private EmployeeRepository $employeeRepository;
    private ServiceRepository $serviceRepository;
    private ShopRepository $shopRepository;

    public function __construct(EntityManagerInterface $entityManager, EmployeeRepository $employeeRepository, ServiceRepository $serviceRepository, ShopRepository $shopRepository)
    {
        $this->entityManager = $entityManager;
        $this->employeeRepository = $employeeRepository;
        $this->serviceRepository = $serviceRepository;
        $this->shopRepository = $shopRepository;
    }

    /**
     * @throws \Exception
     */
    public function createBookingFromData(array $data): array
    {

        $employee = $this->extractIdFromUri($data['employee']);
        $service = $this->extractIdFromUri($data['service']);
        $shop = $this->extractIdFromUri($data['shop']);

        $employee = $employee ? $this->employeeRepository->find($employee) : null;
        $service = $service ? $this->serviceRepository->find($service) : null;
        $shop = $shop ? $this->shopRepository->find($shop) : null;

        if (!$employee || !$service || !$shop) {
            return ['status' => 'error', 'message' => 'Invalid employee, service or shop'];
        }

        $booking = new Booking();
        $booking->setEmployee($employee);
        $booking->setService($service);
        $booking->setShop($shop);
        $booking->setBeginDateTime(new \DateTime($data['beginDateTime']));
        $booking->setEndDateTime(new \DateTime($data['endDateTime']));
        if (isset($data['comment'])) {
            $booking->setComment($data['comment']);
        }

        if ($this->checkOverlaps($booking)) {
            return ['status' => 'error', 'message' => 'Booking overlaps with another booking' . $data['employee'] . $data['beginDateTime'] . $data['endDateTime']];
        }

        $this->entityManager->persist($booking);
        $this->entityManager->flush();

        return ['status' => 'success', 'message' => 'Booking created successfully'];
    }

    public function checkOverlaps(Booking $booking): bool
    {
        $overlappingBookings = $this->entityManager->getRepository(Booking::class)->findByEmployeeAndTimeRange(
            $booking->getEmployee()->getId(),
            $booking->getBeginDateTime(),
            $booking->getEndDateTime(),
            $booking->getStatus()
        );

        foreach ($overlappingBookings as $overlappingBooking) {
            if ($overlappingBooking->getStatus() === 'canceled') {
                $key = array_search($overlappingBooking, $overlappingBookings);
                unset($overlappingBookings[$key]);
            }
        }

        return count($overlappingBookings) > 0;
    }

    private function extractIdFromUri(string $uri): ?int
    {
        preg_match('/\d+$/', $uri, $matches);
        return $matches ? (int)$matches[0] : null;
    }

}

