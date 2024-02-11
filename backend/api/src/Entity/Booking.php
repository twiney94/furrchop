<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\BookingController;
use App\Enum\Booking\StatusEnum;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\BookingRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Patch(
            uriTemplate: '/bookings/{id}/cancel',
            controller: BookingController::class,
            openapiContext: [
                'summary' => 'Cancel a booking',
                'description' => 'Cancel a booking',
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'status' => [
                                        'type' => 'string',
                                        'description' => 'The status of the booking',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'responses' => [
                    '200' => [
                        'description' => 'Booking has been canceled',
                        'content' => [
                            'application/json' => [
                                'example' => ['message' => 'Booking has been canceled'],
                            ],
                        ],
                    ],
                    '400' => [
                        'description' => 'Bad Request',
                        'content' => [
                            'application/json' => [
                                'example' => ['message' => 'ID is missing in Params'],
                            ],
                        ],
                    ],
                    '404' => [
                        'description' => 'Not Found',
                        'content' => [
                            'application/json' => [
                                'example' => ['message' => 'Booking with ID {ID} not found'],
                            ],
                        ],
                    ],
                ],
            ],
            openapi: true,
            security: 'object.getUser() == user or is_granted("ROLE_ADMIN")',
            name: 'cancel booking',
        ),
        new Get(
            security: 'object.getUser() == user or is_granted("ROLE_ADMIN")',
        ),
        new GetCollection(
            security: 'object.getUser() == user or is_granted("ROLE_ADMIN")',
        ),
        new Patch(
            security: 'object.getUser() == user or is_granted("ROLE_ADMIN")',
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN') or object == user",
        ),
        new Post()
    ],
)]
#[ApiFilter(SearchFilter::class, properties: ['status' => 'iexact', 'animal' => 'iexact'])]
#[ApiFilter(DateFilter::class, properties: ['dateTime'])]
#[ApiFilter(OrderFilter::class, properties: ['dateTime' => 'ASC'])]
#[ORM\Entity(repositoryClass: BookingRepository::class)]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIMETZ_MUTABLE)]
    private ?\DateTimeInterface $beginDateTime = null;

    #[ORM\Column(type: Types::DATETIMETZ_MUTABLE)]
    private ?\DateTimeInterface $endDateTime = null;

    #[ORM\ManyToOne(targetEntity: Service::class)]
    private Service $service;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comment = null;

    #[ORM\Column(length: 255)]
    private ?string $status = StatusEnum::VALIDATED;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[Assert\NotNull]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Shop::class)]
    #[Assert\NotNull]
    private Shop $shop;

    public function getId(): ?int
    {
        return $this->id;
    }
    

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): void
    {
        $this->status = $status;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): void
    {
        $this->user = $user;
    }

    public function getShop(): ?Shop
    {
        return $this->shop;
    }

    public function setShop(?Shop $shop): void
    {
        $this->shop = $shop;
    }

    public function getBeginDateTime(): ?\DateTimeInterface
    {
        return $this->beginDateTime;
    }

    public function setBeginDateTime(?\DateTimeInterface $beginDateTime): void
    {
        $this->beginDateTime = $beginDateTime;
    }

    public function getEndDateTime(): ?\DateTimeInterface
    {
        return $this->endDateTime;
    }

    public function setEndDateTime(?\DateTimeInterface $endDateTime): void
    {
        $this->endDateTime = $endDateTime;
    }
}
