<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository; // Import UserRepository
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;

class CustomUserController extends AbstractController
{
    private Security $security;
    private UserRepository $userRepository; // Add UserRepository property

    public function __construct(Security $security, UserRepository $userRepository)
    {
        $this->security = $security;
        $this->userRepository = $userRepository; // Initialize UserRepository
    }

    public function __invoke(): Response
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            // Use UserRepository to get all users
            $users = $this->userRepository->findAll();
            return $this->json($users);
        } else {
            // Return the current user
            $user = $this->security->getUser();
            return $this->json([$user]);
        }
    }
}
