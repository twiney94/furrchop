<?php

namespace App\Controller;

use App\Entity\Review;
use App\Entity\Booking;
use App\Repository\BookingRepository;
use App\Repository\ReviewRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

class ReviewController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private BookingRepository $bookingRepository,
        private Security $security
    ) {}

    public function __invoke(Request $request): Response
    {
        $user = $this->security->getUser();
        $data = json_decode($request->getContent(), true);

        // Les informations nécessaires pour créer un avis
        $bookingId = $data['booking'] ?? '';
        $comment = $data['comment'] ?? '';
        $rating = $data['rating'] ?? 0;

        $booking = str_replace('bookings/', '', $bookingId);

        // Trouver la réservation basée sur l'ID fourni
        $booking = $this->bookingRepository->findOneBy([
            'id' => $booking,
            'user' => $user
        ]);

        // Vérifier si la réservation existe, est validée et appartient à l'utilisateur actuel || $booking->getBeginDateTime() > new \DateTime('now')
        if (!$booking || $booking->getStatus() !== 'validated'|| $booking->getBeginDateTime() < new \DateTime()) {
            return $this->json(['message' => 'Invalid booking for review.'], Response::HTTP_BAD_REQUEST);
        }

        // Vérifier si l'utilisateur actuel est le propriétaire du magasin lié à la réservation
        if ($booking->getShop()->getUser() !== $user) {
            return $this->json(['message' => 'You are not the owner of the shop related to this booking.'], Response::HTTP_FORBIDDEN);
        }

        // Créer et sauvegarder l'avis
        $review = new Review();
        $review->setUser($booking->getUser()); // L'utilisateur qui a fait la réservation
        $review->setComment($comment);
        $review->setRating($rating);
        $review->setCreatedAt(new \DateTimeImmutable());
        $review->setBooking($booking);

        $this->entityManager->persist($review);
        $this->entityManager->flush();

        return $this->json(['message' => 'Review created successfully.'], Response::HTTP_CREATED);
    }

    public function getUnreviewedBookings(Security $security, EntityManagerInterface $entityManager): Response
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
                $unreviewedBookings[] = $booking;
            }
        }

        return $this->json($unreviewedBookings);
    }
}
