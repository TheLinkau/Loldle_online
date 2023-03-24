<?php

namespace App\Controller\Admin;

use App\Entity\Champion;
use App\Entity\Position;
use App\Entity\RangeType;
use App\Entity\Region;
use App\Entity\Species;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;

class ChampionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Champion::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'Nom'),
            ImageField::new('image', 'Image')
                ->setUploadDir('assets/images/'),
            ChoiceField::new('gender', 'Genre')
                ->setChoices([
                    'Mâle' => 'Mâle',
                    'Femelle' => 'Femelle',
                    'Autre' => 'Autre',
                ]),
            AssociationField::new('positions', 'Position(s)')
                ->setFormTypeOptions([
                    'by_reference' => false,
                    'class' => Position::class,
                    'multiple' => true,
                    'expanded' => false,
                ]),
            AssociationField::new('species', 'Espèce(s)')
                ->setFormTypeOptions([
                    'by_reference' => false,
                    'class' => Species::class,
                    'multiple' => true,
                    'expanded' => false,
                ]),
            ChoiceField::new('resource', 'Ressource')
                ->setChoices([
                    'Mana' => 'Mana',
                    'Sans mana' => 'Sans mana',
                    'Points de vie' => 'Points de vie',
                    'Furie' => 'Furie',
                    'Rage' => 'Rage',
                ]),
            AssociationField::new('rangeTypes', "Portée d'attaque")
                ->setFormTypeOptions([
                    'by_reference' => false,
                    'class' => RangeType::class,
                    'multiple' => true,
                    'expanded' => false,
                ]),
            AssociationField::new('regions', 'Région(s)')
                ->setFormTypeOptions([
                    'by_reference' => false,
                    'class' => Region::class,
                    'multiple' => true,
                    'expanded' => false,
                ]),
            IntegerField::new('releaseYear', 'Année de sortie')
                ->setFormTypeOption('attr', ['min' => 2009, 'max' => 2023, 'value' => 2009]),
        ];
    }
}
