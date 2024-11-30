/*
  Warnings:

  - You are about to drop the column `productoId` on the `produccion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produccion` DROP FOREIGN KEY `Produccion_productoId_fkey`;

-- AlterTable
ALTER TABLE `produccion` DROP COLUMN `productoId`;
