<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230323110046 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE champion (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, gender VARCHAR(255) NOT NULL, release_year DATE NOT NULL, resource VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE champion_position (champion_id INT NOT NULL, position_id INT NOT NULL, INDEX IDX_EEC8479DFA7FD7EB (champion_id), INDEX IDX_EEC8479DDD842E46 (position_id), PRIMARY KEY(champion_id, position_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE champion_species (champion_id INT NOT NULL, species_id INT NOT NULL, INDEX IDX_2673CABFFA7FD7EB (champion_id), INDEX IDX_2673CABFB2A1D860 (species_id), PRIMARY KEY(champion_id, species_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE champion_range_type (champion_id INT NOT NULL, range_type_id INT NOT NULL, INDEX IDX_7C459D09FA7FD7EB (champion_id), INDEX IDX_7C459D0995607B71 (range_type_id), PRIMARY KEY(champion_id, range_type_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE champion_region (champion_id INT NOT NULL, region_id INT NOT NULL, INDEX IDX_A0DA9B61FA7FD7EB (champion_id), INDEX IDX_A0DA9B6198260155 (region_id), PRIMARY KEY(champion_id, region_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE position (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE range_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE region (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE species (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE champion_position ADD CONSTRAINT FK_EEC8479DFA7FD7EB FOREIGN KEY (champion_id) REFERENCES champion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_position ADD CONSTRAINT FK_EEC8479DDD842E46 FOREIGN KEY (position_id) REFERENCES position (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_species ADD CONSTRAINT FK_2673CABFFA7FD7EB FOREIGN KEY (champion_id) REFERENCES champion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_species ADD CONSTRAINT FK_2673CABFB2A1D860 FOREIGN KEY (species_id) REFERENCES species (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_range_type ADD CONSTRAINT FK_7C459D09FA7FD7EB FOREIGN KEY (champion_id) REFERENCES champion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_range_type ADD CONSTRAINT FK_7C459D0995607B71 FOREIGN KEY (range_type_id) REFERENCES range_type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_region ADD CONSTRAINT FK_A0DA9B61FA7FD7EB FOREIGN KEY (champion_id) REFERENCES champion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE champion_region ADD CONSTRAINT FK_A0DA9B6198260155 FOREIGN KEY (region_id) REFERENCES region (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE champion_position DROP FOREIGN KEY FK_EEC8479DFA7FD7EB');
        $this->addSql('ALTER TABLE champion_position DROP FOREIGN KEY FK_EEC8479DDD842E46');
        $this->addSql('ALTER TABLE champion_species DROP FOREIGN KEY FK_2673CABFFA7FD7EB');
        $this->addSql('ALTER TABLE champion_species DROP FOREIGN KEY FK_2673CABFB2A1D860');
        $this->addSql('ALTER TABLE champion_range_type DROP FOREIGN KEY FK_7C459D09FA7FD7EB');
        $this->addSql('ALTER TABLE champion_range_type DROP FOREIGN KEY FK_7C459D0995607B71');
        $this->addSql('ALTER TABLE champion_region DROP FOREIGN KEY FK_A0DA9B61FA7FD7EB');
        $this->addSql('ALTER TABLE champion_region DROP FOREIGN KEY FK_A0DA9B6198260155');
        $this->addSql('DROP TABLE champion');
        $this->addSql('DROP TABLE champion_position');
        $this->addSql('DROP TABLE champion_species');
        $this->addSql('DROP TABLE champion_range_type');
        $this->addSql('DROP TABLE champion_region');
        $this->addSql('DROP TABLE position');
        $this->addSql('DROP TABLE range_type');
        $this->addSql('DROP TABLE region');
        $this->addSql('DROP TABLE species');
    }
}
