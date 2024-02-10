<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


#[AsController]
class ActivationController extends AbstractController
{
    public function __construct(
        private readonly LoggerInterface $logger,
        private UserRepository $userRepository
    )
    {
    }


    public function __invoke(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $userId = $data['uuid'] ?? null;

        if (!$userId) {
            throw new BadRequestHttpException("Token is not available in the request body.");
        }

        $user = $this->userRepository->findOneBy(['id' => $userId]);
        if (!$user) {
            throw new BadRequestHttpException("User with ID $userId not found.");
        }
        $user->setIsVerified(true);
        $this->userRepository->save($user);

        return new Response("User account has been activated.", 200);
    }
}
