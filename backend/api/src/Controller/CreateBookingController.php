<?php

// Controller adjustments for dependency injection and simplification
namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Booking;
use App\Service\BookingService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateBookingController extends AbstractController
{
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Delegate booking creation to the BookingService
        $result = $this->bookingService->createBookingFromData($data);

        if ($result['status'] === 'error') {
            return new JsonResponse(['error' => $result['message']], JsonResponse::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['message' => 'Booking created successfully'], JsonResponse::HTTP_CREATED);
    }
}
