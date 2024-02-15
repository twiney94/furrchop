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
use App\Controller\ShopScheduleController;
use App\Repository\ShopRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ShopRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Patch(
            security: "is_granted('ROLE_ADMIN') or object.getUser() == user",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or object.getUser() == user",
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN') or object.getUser() == user",
        ),
        new Post(
            security: "is_granted('ROLE_OWNER')",
        )
    ],

    // normalizationContext: ['groups' => ['employee:read']],
)]
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/shops/{id}/schedules',
            controller: ShopScheduleController::class,
            name: 'get shop schedules'
        )
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['services.name' => 'ipartial', 'name' => 'ipartial', 'description' => 'ipartial', 'openHours' => 'ipartial', 'openDays' => 'ipartial', 'address' => 'iexact'])]
class Shop
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'shops')]
    private ?User $user = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['shop:read', 'employee:read', 'service:read'])] // Add 'employee:read' group or use an existing one
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['shop:read'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['shop:schedules'])]
    private ?array $openHours = [];

    #[ORM\Column(length: 255)]
    #[Groups(['shop:schedules'])]
    private ?array $openDays = [];

    #[ORM\Column(length: 255)]
    #[Groups(['shop:read'])]
    private ?string $address = null;

    #[ORM\OneToMany(mappedBy: 'shop', targetEntity: Service::class)]
    #[Groups(['shop:read'])]
    private Collection $services;

    #[ORM\OneToMany(mappedBy: 'shop', targetEntity: Booking::class)]
    #[Groups(['shop:read'])]
    private Collection $bookings;

    #[ORM\OneToMany(mappedBy: 'shop', targetEntity: Employee::class, orphanRemoval: true)]
    #[Groups(['shop:read'])]
    private Collection $employees;


    public function __construct()
    {
        $this->services = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->employees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setShop($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        $this->services->removeElement($service);
        $service->setShop(null);

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setShop($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        $this->bookings->removeElement($booking);
        $booking->setShop(null);

        return $this;
    }


    public function getOpenHours(): ?array
    {
        return $this->openHours;
    }

    public function setOpenHours(?array $openHours): void
    {
        $this->openHours = $openHours;
    }

    public function getOpenDays(): ?array
    {
        return $this->openDays;
    }

    public function setOpenDays(?array $openDays): void
    {
        $this->openDays = $openDays;
    }

    /**
     * @return Collection<int, Employee>
     */
    #[Groups(['shop:schedules'])]
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setShop($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getShop() === $this) {
                $employee->setShop(null);
            }
        }

        return $this;
    }
}
