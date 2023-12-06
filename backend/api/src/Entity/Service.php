<?php

namespace App\Entity;

use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Shop::class, inversedBy: 'services')]
    private Collection $shopId;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\Column]
    private ?int $duration = null;

    #[ORM\OneToOne(mappedBy: 'serviceId', cascade: ['persist', 'remove'])]
    private ?Booking $booking = null;

    public function __construct()
    {
        $this->shopId = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Shop>
     */
    public function getShopId(): Collection
    {
        return $this->shopId;
    }

    public function addShopId(Shop $shopId): static
    {
        if (!$this->shopId->contains($shopId)) {
            $this->shopId->add($shopId);
        }

        return $this;
    }

    public function removeShopId(Shop $shopId): static
    {
        $this->shopId->removeElement($shopId);

        return $this;
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

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(Booking $booking): static
    {
        // set the owning side of the relation if necessary
        if ($booking->getServiceId() !== $this) {
            $booking->setServiceId($this);
        }

        $this->booking = $booking;

        return $this;
    }
}
