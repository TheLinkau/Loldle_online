-- CreateTable
CREATE TABLE `player` (
    `id` VARCHAR(100) NOT NULL,
    `mdp` VARCHAR(100) NOT NULL,
    `pseudo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
