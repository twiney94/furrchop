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
        new Post(

        )
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

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateTime = null;

    #[ORM\ManyToOne(targetEntity: Service::class)]
    private ?Service $service = null;

    #[ORM\Column(length: 255)]
    private ?string $animal = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comment = null;

    #[ORM\Column(length: 255)]
    private ?string $status = StatusEnum::VALIDATED;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateTime(): ?\DateTimeInterface
    {
        return $this->dateTime;
    }

    public function setDateTime(\DateTimeInterface $dateTime): static
    {
        $this->dateTime = $dateTime;

        return $this;
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

    public function getAnimal(): ?string
    {
        return $this->animal;
    }

    public function setAnimal(string $animal): static
    {
        $this->animal = $animal;

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
}
