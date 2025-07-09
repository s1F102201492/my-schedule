/*
  Warnings:

  - The `achive_day` column on the `achivements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `achive_taskCount` column on the `achivements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `achive_multi` column on the `achivements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "achivements" DROP COLUMN "achive_day",
ADD COLUMN     "achive_day" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "achive_taskCount",
ADD COLUMN     "achive_taskCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "achive_multi",
ADD COLUMN     "achive_multi" INTEGER NOT NULL DEFAULT 0;
