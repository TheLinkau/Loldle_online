<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\ChampionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChampionRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['champion:read']])]
class Champion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['champion:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['champion:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['champion:read'])]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    #[Groups(['champion:read'])]
    private ?string $gender = null;

    #[ORM\Column()]
    #[Groups(['champion:read'])]
    private ?int $releaseYear = null;

    #[ORM\Column(length: 255)]
    #[Groups(['champion:read'])]
    private ?string $resource = null;

    #[ORM\ManyToMany(targetEntity: Position::class, inversedBy: 'champions')]
    #[Groups(['champion:read'])]
    private Collection $positions;

    #[ORM\ManyToMany(targetEntity: Species::class, inversedBy: 'champions')]
    #[Groups(['champion:read'])]
    private Collection $species;

    #[ORM\ManyToMany(targetEntity: RangeType::class, inversedBy: 'champions')]
    #[Groups(['champion:read'])]
    private Collection $rangeTypes;

    #[ORM\ManyToMany(targetEntity: Region::class, inversedBy: 'champions')]
    #[Groups(['champion:read'])]
    private Collection $regions;

    public function __construct()
    {
        $this->positions = new ArrayCollection();
        $this->species = new ArrayCollection();
        $this->rangeTypes = new ArrayCollection();
        $this->regions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getReleaseYear(): ?int
    {
        return $this->releaseYear;
    }

    public function setReleaseYear(int $releaseYear): self
    {
        $this->releaseYear = $releaseYear;

        return $this;
    }

    public function getResource(): ?string
    {
        return $this->resource;
    }

    public function setResource(string $resource): self
    {
        $this->resource = $resource;

        return $this;
    }

    /**
     * @return Collection<int, Position>
     */
    public function getPositions(): Collection
    {
        return $this->positions;
    }

    public function addPosition(Position $position): self
    {
        if (!$this->positions->contains($position)) {
            $this->positions->add($position);
        }

        return $this;
    }

    public function removePosition(Position $position): self
    {
        $this->positions->removeElement($position);

        return $this;
    }

    /**
     * @return Collection<int, Species>
     */
    public function getSpecies(): Collection
    {
        return $this->species;
    }

    public function addSpecies(Species $species): self
    {
        if (!$this->species->contains($species)) {
            $this->species->add($species);
        }

        return $this;
    }

    public function removeSpecies(Species $species): self
    {
        $this->species->removeElement($species);

        return $this;
    }

    /**
     * @return Collection<int, RangeType>
     */
    public function getRangeTypes(): Collection
    {
        return $this->rangeTypes;
    }

    public function addRangeType(RangeType $rangeType): self
    {
        if (!$this->rangeTypes->contains($rangeType)) {
            $this->rangeTypes->add($rangeType);
        }

        return $this;
    }

    public function removeRangeType(RangeType $rangeType): self
    {
        $this->rangeTypes->removeElement($rangeType);

        return $this;
    }

    /**
     * @return Collection<int, Region>
     */
    public function getRegions(): Collection
    {
        return $this->regions;
    }

    public function addRegion(Region $region): self
    {
        if (!$this->regions->contains($region)) {
            $this->regions->add($region);
        }

        return $this;
    }

    public function removeRegion(Region $region): self
    {
        $this->regions->removeElement($region);

        return $this;
    }

    public function __toString(): string
    {
        return $this->getName();
    }
}
