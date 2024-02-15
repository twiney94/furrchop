<?php

namespace App\Controller;


use App\Repository\BookingRepository;
use App\Service\ExportCSVService;
use App\Service\ExportPDFService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class BookingExportController extends AbstractController
{
   #[Route('/export/bookings/csv', name: 'export_bookings_csv')]
    public function exportCsv(BookingRepository $bookingRepository, ExportCSVService $exportcsv): Response
   {
       $bookings = $bookingRepository->findAll();
       $headers = ['ID', 'Date de début', 'Date de fin', 'Service', 'Commentaire', 'Statut'];

       return $exportcsv->export($bookings, $headers);
   }

    #[Route('/export/bookings/pdf', name: 'export_bookings_pdf')]
    public function exportPdf(BookingRepository $bookingRepository, ExportPDFService $exportPDF): Response
    {
        $bookings = $bookingRepository->findAll(); // Imaginez que cette méthode renvoie les données nécessaires
        $html = $this->renderView('bookings/export_pdf.html.twig', ['bookings' => $bookings]);

        $exportPDF->export($html, 'bookings_export.pdf');

        return new Response(); // La réponse est gérée par le service
    }
}
