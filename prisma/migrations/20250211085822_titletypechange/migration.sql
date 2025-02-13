/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `todos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "todos_title_key" ON "todos"("title");
