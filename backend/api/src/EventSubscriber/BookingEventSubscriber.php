<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Booking;
use App\Entity\Shop;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Bundle\SecurityBundle\Security;

#[AsDoctrineListener(event: Events::prePersist)]
class BookingEventSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly Security $security
    )
    {
    }

    public function prePersist(LifecycleEventArgs $args): void
    {
        $this->handleEvent($args);
    }

    private function handleEvent(LifecycleEventArgs $args): void
    {
        $object = $args->getObject();
        if (!$object instanceof Booking) {
            return;
        }

        $user = $this->security->getUser();
        if ($user) {
            $object->setUser($user);
        }

    }


    public static function getSubscribedEvents(): array
    {
        return [
            Events::prePersist => 'prePersist',
        ];
    }
}
