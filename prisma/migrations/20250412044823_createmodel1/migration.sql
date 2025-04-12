/*
  Warnings:

  - You are about to drop the `Todos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_userId_fkey";

-- DropTable
DROP TABLE "Todos";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "continuedays" INTEGER NOT NULL,
    "checkedDates" JSONB NOT NULL,
    "startdate" DATE NOT NULL,
    "enddate" DATE NOT NULL,
    "interval" JSONB NOT NULL,
    "purpose" TEXT,
    "tag" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
