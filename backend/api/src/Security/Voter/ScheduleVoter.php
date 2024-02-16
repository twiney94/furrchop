<?php

// src/Security/Voter/ServiceVoter.php

namespace App\Security\Voter;

use App\Entity\Schedule;
use App\Entity\Service;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Psr\Log\LoggerInterface;


class ScheduleVoter extends Voter
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }


    protected function supports(string $attribute, $subject): bool
    {
        // Edit or delete only if the user tries to access a Service entity
        return in_array($attribute, ['SCHEDULE_CREATE', 'SCHEDULE_READ', 'SCHEDULE_EDIT', 'SCHEDULE_DELETE'])
            && $subject instanceof Schedule;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        /** @var Schedule $schedule */
        $schedule = $subject;

        switch ($attribute) {
            case 'SCHEDULE_CREATE':
                return $this->canCreate($schedule, $user);
            case 'SCHEDULE_EDIT':
                return $this->canEdit($schedule, $user);
            case 'SCHEDULE_DELETE':
                return $this->canDelete($schedule, $user);
            case 'SCHEDULE_READ':
                return true;
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canEdit(Schedule $schedule, UserInterface $user): bool
    {
        // Check if the user has the ROLE_ADMIN authority
        $isAdmin = in_array('ROLE_ADMIN', $user->getRoles());

        // Assuming getShop() and getUser() are properly implemented and return the expected values
        $isOwner = $schedule->getEmployee()->getShop() && $user === $schedule->getEmployee().getShop()->getUser();

        return $isAdmin || $isOwner;
    }

    private function canCreate(Schedule $schedule, UserInterface $user): bool
    {
        return $this->canEdit($schedule, $user);
    }

    private function canDelete(Schedule $schedule, UserInterface $user): bool
    {
        return $this->canEdit($schedule, $user); // Reuse the canEdit logic for simplicity
    }

}
