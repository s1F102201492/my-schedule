/*
  Warnings:

  - You are about to drop the column `interva` on the `todos` table. All the data in the column will be lost.
  - Added the required column `interval` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "interva",
ADD COLUMN     "interval" JSONB NOT NULL;
