<?php

namespace App\Service;

use Dompdf\Dompdf;
use Dompdf\Options;

class ExportPDFService
{
    public function export(string $html, string $filename = 'export.pdf'): void
    {
        // Instancier et utiliser dompdf
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($pdfOptions);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream($filename, [
            "Attachment" => true
        ]);
    }
}
