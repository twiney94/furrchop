<?php

namespace App\Controller;

use App\Enum\Booking\StatusEnum;
use App\Repository\ShopRepository;
use App\Repository\UserRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ShopScheduleController extends AbstractController
{

    public function __construct(
        private readonly LoggerInterface $logger,
        private UserRepository           $userRepository,
        private readonly ShopRepository  $shopRepository
    )
    {
    }


    public function __invoke(Request $request, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent(), true);
        $startDate = $data["startDate"] ?? null;
        $endDate = $data["endDate"] ?? null;


        if (!$startDate || !$endDate) {
            throw new BadRequestHttpException("Start and end date are required to access the shop schedule.");
        }

        $date1 = new \DateTime($startDate);
        $date2 = new \DateTime($endDate);
        $diff = $date2->diff($date1)->format("%a");
        if ($diff > 7) {
            throw new BadRequestHttpException("Difference between dates is greater than 7 days.");
        }

        $shopId = $request->attributes->get('id');

        $shop = $this->shopRepository->findOneBy(['id' => $shopId]);

        $employees = $shop->getEmployees();

        $shopSchedule = [];
        foreach ($employees as $employee) {
            $schedules = $employee->getSchedules();
            $leaves = $employee->getLeaves();
            $employeeLeaves = [];
            $employeeBookings = [];
            foreach ($leaves as $leave) {
                $leaveStartDate = $leave->getBeginsAt();
                $leaveEndDate = $leave->getEndsAt();
                if ($leaveStartDate >= $date1 && $leaveEndDate <= $date2)
                    $employeeLeaves[] = $leave;

            }

            $bookings = $employee->getBookings();
            $bookings = $bookings->filter(function ($booking) {
                return $booking->getStatus() === StatusEnum::VALIDATED;
            });
            foreach ($bookings as $booking) {
                $bookingDate = $booking->getBeginDateTime();
                $bookingEndDate = $booking->getEndDateTime();
                if ($bookingDate >= $date1 && $bookingEndDate <= $date2) {
                    $employeeBookings[] = $booking;
                }
            }

            $shopSchedule[] = [
                'employee' => [
                    'id' => $employee->getId(),
                    'name' => $employee->getName(),
                    'schedules' => $schedules,
                    'leaves' => $employeeLeaves,
                    'bookings' => $employeeBookings
                ]
            ];

        }

        $jsonContent = $serializer->serialize($shopSchedule, 'json');

        return new Response($jsonContent, 200);
    }
}
