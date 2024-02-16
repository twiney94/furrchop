<?php

// src/Security/Voter/ServiceVoter.php

namespace App\Security\Voter;

use App\Entity\Service;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Psr\Log\LoggerInterface;


class ServiceVoter extends Voter
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }


    protected function supports(string $attribute, $subject): bool
    {
        // Edit or delete only if the user tries to access a Service entity
        return in_array($attribute, ['SERVICE_CREATE', 'SERVICE_READ', 'SERVICE_EDIT', 'SERVICE_DELETE'])
            && $subject instanceof Service;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        /** @var Service $service */
        $service = $subject;

        switch ($attribute) {
            case 'SERVICE_CREATE':
                return $this->canCreate($service, $user);
            case 'SERVICE_EDIT':
                return $this->canEdit($service, $user);
            case 'SERVICE_DELETE':
                return $this->canDelete($service, $user);
            case 'SERVICE_READ':
                return true;
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canEdit(Service $service, UserInterface $user): bool
    {
        // Check if the user has the ROLE_ADMIN authority
        $isAdmin = in_array('ROLE_ADMIN', $user->getRoles());

        // Assuming getShop() and getUser() are properly implemented and return the expected values
        $isOwner = $service->getShop() && $user === $service->getShop()->getUser();

        return $isAdmin || $isOwner;
    }

    private function canCreate(Service $service, UserInterface $user): bool
    {
        return $this->canEdit($service, $user);
    }

    private function canDelete(Service $service, UserInterface $user): bool
    {
        return $this->canEdit($service, $user); // Reuse the canEdit logic for simplicity
    }

}
