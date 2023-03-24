<?php

namespace App\Controller\Admin;

use App\Entity\Champion;
use App\Entity\Position;
use App\Entity\Region;
use App\Entity\RangeType;
use App\Entity\Species;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;

class DashboardController extends AbstractDashboardController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(ChampionCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('API LOL')
            ->setLocales(['fr']);
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToCrud('Champions', 'fas fa-list', Champion::class);
        yield MenuItem::linkToCrud('Régions', 'fas fa-list', Region::class);
        yield MenuItem::linkToCrud('Espèces', 'fas fa-list', Species::class);
        yield MenuItem::linkToCrud('Positions', 'fas fa-list', Position::class);
        yield MenuItem::linkToCrud("Portée d'attaque", 'fas fa-list', RangeType::class);
    }
}
