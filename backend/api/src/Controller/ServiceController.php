<?php

namespace App\Controller;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
class ServiceController extends AbstractController
{
    private ServiceRepository $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function __invoke(Service $service): Response
    {

        $servicesSuggestions = [
            "Groomer",
            "Haircut",
            "Special services",
            "Nail trimming",
            "Bathing",
            "Teeth cleaning",
            "Ear cleaning",
            "Anal gland expression",
            "Flea bath",
            "Deshedding",
            "Furminator",
        ];

        if (!empty($service->getName()) && in_array($service->getName(), $servicesSuggestions)) {
            $this->serviceRepository->save($service);
            return new Response("Service has been created.", 201);
        } else {
            throw new BadRequestHttpException("Service name is not valid");
        }
    }
}
