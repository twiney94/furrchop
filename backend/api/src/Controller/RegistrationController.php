<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\MailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationController extends AbstractController
{
    private $mailService;

    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher, MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function __invoke(User $user): User
    {
        $plaintextPassword = $user->getPassword();

        // hash the password (based on the security.yaml config for the $user class)
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);

        $userId = base64_encode($user->getId());
        $websiteURI = $_ENV['WEBSITE_URI'];

        dump("RegistrationController " . $user->getEmail());
        dump($websiteURI);
        dump($userId);

        $this->mailService->sendEmail(
            $user->getEmail(),
            'Welcome to FurrChop',
            '<p>Your registration is successful, activate your account by clicking on this link: <a href="' . $websiteURI . '/activate/' . $userId . '">Activate</a></p>'
        );

        return $user;
    }
}
