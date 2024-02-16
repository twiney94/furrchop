<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Patch(
            security: "is_granted('ROLE_ADMIN') or object.getShop().getUser() == user",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or object.getShop().getUser() == user",
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN') or object.getShop().getUser() == user",
        ),
        new Post(
            securityPostDenormalize: "is_granted('ROLE_ADMIN') or (object.getShop().getUser() == user and is_granted('ROLE_OWNER'))"
        )
    ]
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Shop $shop = null;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Booking::class)]
    private Collection $bookings;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Leave::class, orphanRemoval: true)]
    private Collection $leaves;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Schedule::class, orphanRemoval: true)]
    private Collection $schedules;

    #[ORM\Column(length: 255)]
    #[Groups(['shop:schedules'])]
    private ?string $name = null;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
        $this->leaves = new ArrayCollection();
        $this->schedules = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getShop(): ?Shop
    {
        return $this->shop;
    }

    public function setShop(?Shop $shop): static
    {
        $this->shop = $shop;

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    #[Groups(['shop:schedules'])]
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setEmployee($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getEmployee() === $this) {
                $booking->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Leave>
     */
    #[Groups(['shop:schedules'])]
    public function getLeaves(): Collection
    {
        return $this->leaves;
    }

    public function addLeaf(Leave $leaf): static
    {
        if (!$this->leaves->contains($leaf)) {
            $this->leaves->add($leaf);
            $leaf->setEmployee($this);
        }

        return $this;
    }

    public function removeLeaf(Leave $leaf): static
    {
        if ($this->leaves->removeElement($leaf)) {
            // set the owning side to null (unless already changed)
            if ($leaf->getEmployee() === $this) {
                $leaf->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Schedule>
     */
    #[Groups(['shop:schedules'])]
    public function getSchedules(): Collection
    {
        return $this->schedules;
    }

    public function addSchedule(Schedule $schedule): static
    {
        if (!$this->schedules->contains($schedule)) {
            $this->schedules->add($schedule);
            $schedule->setEmployee($this);
        }

        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getEmployee() === $this) {
                $schedule->setEmployee(null);
            }
        }

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
