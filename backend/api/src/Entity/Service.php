<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\ServiceController;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Patch(
            security: "is_granted('SERVICE_EDIT', object)",
        ),
        new Delete(
            security: "is_granted('SERVICE_DELETE', object)",
        ),
        new Put(
            security: "is_granted('SERVICE_EDIT', object)",
        ),
        new Post(
            securityPostDenormalize: "is_granted('SERVICE_CREATE', object)",
            controller: ServiceController::class
        )
    ],
    normalizationContext: ['groups' => ['service:read']],

)]
#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['shop.id' => 'exact'])]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['service:read'])]
    #[ORM\ManyToOne(targetEntity: Shop::class, inversedBy: 'services')]
    private ?Shop $shop;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['service:read', 'booking:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['service:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['service:read', 'booking:read'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['service:read', 'booking:read'])]
    private ?int $duration = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Booking::class)]
    private Collection $bookings;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getShop(): ?Shop
    {
        return $this->shop;
    }

    public function setShop(?Shop $shop): void
    {
        $this->shop = $shop;
    }

    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setService($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        $this->bookings->removeElement($booking);

        return $this;
    }
}
