<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Shop;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Bundle\SecurityBundle\Security;

//class ShopEventSubscriber implements EventSubscriberInterface
//{
//    private Security $security;
//
//    public function __construct(Security $security)
//    {
//        $this->security = $security;
//    }
//
//    public static function getSubscribedEvents(): array
//    {
//        return [
//            KernelEvents::VIEW => ['setUserForShop', EventPriorities::PRE_VALIDATE],
//        ];
//    }
//
//    public function setUserForShop(ViewEvent $event): void
//    {
//        $shop = $event->getControllerResult();
//        $method = $event->getRequest()->getMethod();
//
//        if (!$shop instanceof Shop || Request::METHOD_POST !== $method && Request::METHOD_PUT !== $method) {
//            return;
//        }
//
//        // Set the user from the token
//        $user = $this->security->getUser();
//        if ($user) {
//            $shop->setUser($user);
//        }
//    }
//}

#[AsDoctrineListener(event: Events::prePersist)]
class ShopEventSubscriber implements EventSubscriberInterface
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
        if (!$object instanceof Shop) {
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
