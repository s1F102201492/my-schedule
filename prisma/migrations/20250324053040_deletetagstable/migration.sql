/*
  Warnings:

  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_tagId_fkey";

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "tag" TEXT;

-- DropTable
DROP TABLE "tags";
