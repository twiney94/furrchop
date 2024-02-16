<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Review;
use App\Repository\BookingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

class UnreviewedController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private BookingRepository $bookingRepository,
        private Security $security
    ) {}

    public function __invoke(Security $security, EntityManagerInterface $entityManager): Response
    {
        $user = $security->getUser();

        $bookings = $entityManager->getRepository(Booking::class)->findBy([
            'user' => $user,
            'status' => 'validated'
        ]);

        $unreviewedBookings = [];

        foreach ($bookings as $booking) {
            $reviewExist = $entityManager->getRepository(Review::class)->findOneBy(['booking' => $booking]);
            if (!$reviewExist) {
                // Récupération des informations du magasin
                $shop = $booking->getShop();
                $shopData = [
                    "name" => $shop->getName(),
                    "description" => $shop->getDescription()
                ];

                // Ajout des informations du magasin à la réservation
                $unreviewedBooking = [
                    "id" => $booking->getId(),
                    "beginDateTime" => $booking->getBeginDateTime(),
                    "endDateTime" => $booking->getEndDateTime(),
                    "service" => $booking->getService(),
                    "comment" => $booking->getComment(),
                    "status" => $booking->getStatus(),
//                    "user" => $booking->getUser(),
                    "shop" => $shopData,
                    "employee" => $booking->getEmployee()
                ];


                $unreviewedBookings[] = $unreviewedBooking;
            }
        }

        return $this->json($unreviewedBookings);
    }
}
