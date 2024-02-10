<?php

namespace App\Service;

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailService
{
    private MailerInterface $mailer;
    private $logger;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function sendEmail(string $to, string $subject, string $htmlContent): void
    {
        $email = (new Email())
            ->from('noreply@furrchop.me')
            ->to($to)
            ->subject($subject)
            ->html($htmlContent);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {

             $this->logger->error('Email could not be sent: ' . $e->getMessage());
        }

    }
}
