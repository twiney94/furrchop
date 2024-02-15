<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LeaveRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: LeaveRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Patch(
            security: "is_granted('ROLE_ADMIN') or object.getEmployee().getShop().getUser() == user",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or object.getEmployee().getShop().getUser() == user",
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN') or object.getEmployee().getShop().getUser() == user",
        ),
        new Post(
            securityPostDenormalize: "is_granted('ROLE_ADMIN') or (object.getEmployee().getShop().getUser() == user and is_granted('ROLE_OWNER'))"
        )
    ],
)]
class Leave
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIMETZ_IMMUTABLE)]
    private ?\DateTimeImmutable $beginsAt = null;

    #[ORM\Column(type: Types::DATETIMETZ_IMMUTABLE)]
    private ?\DateTimeImmutable $endsAt = null;

    #[ORM\ManyToOne(inversedBy: 'leaves')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employee $employee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBeginsAt(): ?\DateTimeImmutable
    {
        return $this->beginsAt;
    }

    public function setBeginsAt(\DateTimeImmutable $beginsAt): static
    {
        $this->beginsAt = $beginsAt;

        return $this;
    }

    public function getEndsAt(): ?\DateTimeImmutable
    {
        return $this->endsAt;
    }

    public function setEndsAt(\DateTimeImmutable $endsAt): static
    {
        $this->endsAt = $endsAt;

        return $this;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

        return $this;
    }
}
