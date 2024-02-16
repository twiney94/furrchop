<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Enum\Booking\StatusEnum;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class BookingController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Booking $booking): Response
    {

        $booking->setStatus(StatusEnum::CANCELED);


        $this->entityManager->persist($booking);
        $this->entityManager->flush();

        return new Response('Booking canceled successfully', Response::HTTP_OK);
    }

}
