/*
  Warnings:

  - You are about to drop the column `achive_day` on the `achievements` table. All the data in the column will be lost.
  - You are about to drop the column `achive_multi` on the `achievements` table. All the data in the column will be lost.
  - You are about to drop the column `achive_taskCount` on the `achievements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "achive_day",
DROP COLUMN "achive_multi",
DROP COLUMN "achive_taskCount",
ADD COLUMN     "achieve_day" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "achieve_multi" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "achieve_taskCount" INTEGER NOT NULL DEFAULT 0;
