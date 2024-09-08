-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `product` (
    `idProduct` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `minPrice` DOUBLE NOT NULL,
    `maxPrice` DOUBLE NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `supplierIdSupplier` INTEGER NULL,

    PRIMARY KEY (`idProduct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite` (
    `idFavorite` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,

    PRIMARY KEY (`idFavorite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `idSupplier` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idSupplier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_supplierIdSupplier_fkey` FOREIGN KEY (`supplierIdSupplier`) REFERENCES `supplier`(`idSupplier`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `product`(`idProduct`) ON DELETE RESTRICT ON UPDATE CASCADE;
