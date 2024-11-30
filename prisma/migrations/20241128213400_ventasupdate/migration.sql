/*
  Warnings:

  - You are about to drop the column `producto_Id` on the `produccion` table. All the data in the column will be lost.
  - Added the required column `receta_Id` to the `Produccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodoPago` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sucursal` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produccion` DROP FOREIGN KEY `Produccion_producto_Id_fkey`;

-- AlterTable
ALTER TABLE `produccion` DROP COLUMN `producto_Id`,
    ADD COLUMN `productoId` INTEGER NULL,
    ADD COLUMN `receta_Id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `estado` ENUM('PENDIENTE', 'PAGADO', 'CANCELADO') NOT NULL,
    ADD COLUMN `metodoPago` ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA') NOT NULL,
    ADD COLUMN `sucursal` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Produccion` ADD CONSTRAINT `Produccion_receta_Id_fkey` FOREIGN KEY (`receta_Id`) REFERENCES `Receta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produccion` ADD CONSTRAINT `Produccion_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
