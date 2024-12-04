/*
  Warnings:

  - You are about to drop the column `estado` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPago` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the column `sucursal` on the `venta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `venta` DROP COLUMN `estado`,
    DROP COLUMN `metodoPago`,
    DROP COLUMN `sucursal`;
