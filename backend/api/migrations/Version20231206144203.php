<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231206144203 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE booking_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE shop_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE booking (id INT NOT NULL, service_id_id INT NOT NULL, date_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, animal VARCHAR(255) NOT NULL, comment VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E00CEDDED63673B0 ON booking (service_id_id)');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, price DOUBLE PRECISION NOT NULL, duration INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE service_shop (service_id INT NOT NULL, shop_id INT NOT NULL, PRIMARY KEY(service_id, shop_id))');
        $this->addSql('CREATE INDEX IDX_6229F84EED5CA9E6 ON service_shop (service_id)');
        $this->addSql('CREATE INDEX IDX_6229F84E4D16C4DD ON service_shop (shop_id)');
        $this->addSql('CREATE TABLE shop (id INT NOT NULL, user_id_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, open_hours VARCHAR(255) NOT NULL, open_days VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AC6A4CA29D86650F ON shop (user_id_id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDED63673B0 FOREIGN KEY (service_id_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service_shop ADD CONSTRAINT FK_6229F84EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service_shop ADD CONSTRAINT FK_6229F84E4D16C4DD FOREIGN KEY (shop_id) REFERENCES shop (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE shop ADD CONSTRAINT FK_AC6A4CA29D86650F FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE booking_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE service_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE shop_id_seq CASCADE');
        $this->addSql('ALTER TABLE booking DROP CONSTRAINT FK_E00CEDDED63673B0');
        $this->addSql('ALTER TABLE service_shop DROP CONSTRAINT FK_6229F84EED5CA9E6');
        $this->addSql('ALTER TABLE service_shop DROP CONSTRAINT FK_6229F84E4D16C4DD');
        $this->addSql('ALTER TABLE shop DROP CONSTRAINT FK_AC6A4CA29D86650F');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_shop');
        $this->addSql('DROP TABLE shop');
    }
}