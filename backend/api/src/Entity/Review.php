<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ReviewRepository;
use App\Controller\ReviewController;
use App\Controller\UnreviewedController;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/reviews',
            controller: ReviewController::class,
            openapiContext: [
                'summary' => 'Create a review',
                'description' => 'Create a review',
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'booking' => [
                                        'type' => 'string',
                                        'description' => 'The IRI of the booking',
                                    ],
                                    'comment' => [
                                        'type' => 'text',
                                        'description' => 'The comment of the review',
                                    ],
                                    'rating' => [
                                        'type' => 'integer',
                                        'description' => 'The rating of the review',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'responses' => [
                    '201' => [
                        'description' => 'Review has been created',
                        'content' => [
                            'application/json' => [
                                'example' => ['message' => 'Review has been created'],
                            ],
                        ],
                    ],
                    '400' => [
                        'description' => 'Bad Request',
                        'content' => [
                            'application/json' => [
                                'example' => ['message' => 'Bad Request'],
                            ],
                        ],
                    ],
                ],
            ],
        ),
        // new Get(
        //     uriTemplate: '/reviews/{id}',
        //     openapiContext: [
        //         'summary' => 'Get a review',
        //         'description' => 'Get a review',
        //         'responses' => [
        //             '200' => [
        //                 'description' => 'Review has been retrieved',
        //                 'content' => [
        //                     'application/json' => [
        //                         'example' => ['message' => 'Review has been retrieved'],
        //                     ],
        //                 ],
        //             ],
        //             '404' => [
        //                 'description' => 'Not Found',
        //                 'content' => [
        //                     'application/json' => [
        //                         'example' => ['message' => 'Not Found'],
        //                     ],
        //                 ],
        //             ],
        //         ],
        //     ],
        // ),
        new GetCollection(
            uriTemplate: '/reviews',
            openapiContext: [
                'summary' => 'Get all reviews',
                'description' => 'Get all reviews',
                'responses' => [
                    '200' => [
                        'description' => 'Reviews have been retrieved',
                        'content' => [
                            'application/json' => [
                                'example' => ['message' => 'Reviews have been retrieved'],
                            ],
                        ],
                    ],
                ],
            ],
        ),
        new GetCollection(
            uriTemplate: '/unreviewed-bookings',
            controller: UnreviewedController::class,
            openapiContext: [
                'summary' => 'Get unreviewed bookings',
                'description' => 'Retrieve all bookings that have not been reviewed yet.'
            ]
        )
    ]
)
]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Booking::class, inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Booking $booking;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $comment = null;

    #[ORM\Column]
    private ?int $rating = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
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

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(?Booking $booking): self
    {
        $this->booking = $booking;
        return $this;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
