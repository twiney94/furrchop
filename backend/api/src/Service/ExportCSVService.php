<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportCSVService
{
    public function export(array $data, array $headers): StreamedResponse
    {
        $response = new StreamedResponse();
        $response->setCallback(function() use ($data, $headers) {
            $handle = fopen('php://output', 'w');
            // En-têtes
            fputcsv($handle, $headers);

            // Données
            foreach ($data as $row) {
                fputcsv($handle, $row);
            }
            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="export.csv"');

        return $response;
    }
}
