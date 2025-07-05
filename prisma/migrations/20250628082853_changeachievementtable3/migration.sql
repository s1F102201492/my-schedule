/*
  Warnings:

  - Changed the type of `achieve_day` on the `achievements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `achieve_multi` on the `achievements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `achieve_taskCount` on the `achievements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "achieve_day",
ADD COLUMN     "achieve_day" JSONB NOT NULL,
DROP COLUMN "achieve_multi",
ADD COLUMN     "achieve_multi" JSONB NOT NULL,
DROP COLUMN "achieve_taskCount",
ADD COLUMN     "achieve_taskCount" JSONB NOT NULL;
