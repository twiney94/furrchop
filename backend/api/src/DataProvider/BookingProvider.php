<?php

namespace App\DataProvider;

use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Booking;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class BookingProvider implements ProviderInterface
{
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Booking::class === $resourceClass; // Corrected the syntax here
    }

    private function getBookingsForOwner(User $user): iterable
    {
        $queryBuilder = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b');
        $queryBuilder->join('b.shop', 's');
        $queryBuilder->where('s.user = :user')->setParameter('user', $user);

        return $queryBuilder->getQuery()->getResult();
    }

    private function getBookingsForUser(User $user): iterable
    {
        $queryBuilder = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b');
        $queryBuilder->where('b.user = :user')->setParameter('user', $user);

        return $queryBuilder->getQuery()->getResult();
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = []):  iterable
    {
        $user = $this->security->getUser();
        if (!$user instanceof User) {
            // Handle the case where there is no logged-in user
            return []; // Return an empty array or throw an exception as per your application logic
        }

        $role= $user->getRoles();

        switch ($role) {
            case in_array('ROLE_ADMIN', $role):
                return $this->entityManager->getRepository(Booking::class)->findAll();
            case in_array('ROLE_OWNER', $role):
                return $this->getBookingsForOwner($user);
            default:
                return $this->getBookingsForUser($user);
        }

    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): iterable|Booking|null
    {
        if ($operation instanceof CollectionOperationInterface){
            return $this->getCollection(Booking::class, $operation->getName(), $context);
        }

        return null;
    }
}
