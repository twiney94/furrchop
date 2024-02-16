<?php

namespace App\Controller;

use App\Service\KpiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class KpiController extends AbstractController
{
    private KpiService $kpiservice;

    public function __construct(KpiService $kpiService)
    {
        $this->kpiservice = $kpiService;
    }


    public function __invoke(): Response
    {
        $response = $this->kpiservice->bookingKpi();

        return new JsonResponse($response, JsonResponse::HTTP_OK);
    }
}
