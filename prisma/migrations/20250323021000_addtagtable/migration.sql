/*
  Warnings:

  - You are about to drop the column `interval` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `todos` table. All the data in the column will be lost.
  - Added the required column `interva` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "todos_title_key";

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "interval",
DROP COLUMN "tag",
ADD COLUMN     "interva" JSONB NOT NULL,
ADD COLUMN     "tagId" INTEGER;

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
