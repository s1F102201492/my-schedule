/*
  Warnings:

  - You are about to drop the `achievements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_userId_fkey";

-- DropTable
DROP TABLE "achievements";
