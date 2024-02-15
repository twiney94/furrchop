<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\MailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationController extends AbstractController
{
    private $mailService;
    private UserRepository $userRepository;

    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher, MailService $mailService, UserRepository $userRepository)
    {
        $this->mailService = $mailService;
        $this->userRepository = $userRepository;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function __invoke(User $user): Response
    {
        $plaintextPassword = $user->getPassword();

        // hash the password (based on the security.yaml config for the $user class)
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $this->userRepository->save($user);

        $id= $user->getId();
        $userId = base64_encode($user->getId());
        $websiteURI = $_ENV['WEBSITE_URI'];


        $this->mailService->sendEmail(
            $user->getEmail(),
            'Welcome to FurrChop',
            '<p>Your registration is successful, activate your account by clicking on this link: <a href="https://furrchop.me/activate/' . $userId . '">Activate</a></p>'
        );



        return new Response("User account has been created.", 201);
    }
}
