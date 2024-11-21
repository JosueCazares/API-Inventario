/*
  Warnings:

  - Changed the type of `producto_Id` on the `inventario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `inventario` DROP COLUMN `producto_Id`,
    ADD COLUMN `producto_Id` JSON NOT NULL;
