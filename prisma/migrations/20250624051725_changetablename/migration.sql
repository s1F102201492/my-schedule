/*
  Warnings:

  - You are about to drop the `achivements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "achivements" DROP CONSTRAINT "achivements_userId_fkey";

-- DropTable
DROP TABLE "achivements";

-- CreateTable
CREATE TABLE "achievements" (
    "achive_day" INTEGER NOT NULL DEFAULT 0,
    "achive_taskCount" INTEGER NOT NULL DEFAULT 0,
    "achive_multi" INTEGER NOT NULL DEFAULT 0,
    "userId" UUID NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "achievements_userId_key" ON "achievements"("userId");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
