<?php

namespace App\Controller\Admin;

use App\Entity\RangeType;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class RangeTypeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return RangeType::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'Nom'),
        ];
    }
}
