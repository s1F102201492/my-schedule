/*
  Warnings:

  - The primary key for the `achivements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `achivements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "achivements" DROP CONSTRAINT "achivements_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "achivements_pkey" PRIMARY KEY ("userId");
