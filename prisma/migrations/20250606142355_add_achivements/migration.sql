-- CreateTable
CREATE TABLE "achivements" (
    "id" TEXT NOT NULL,
    "achive_day" JSONB NOT NULL,
    "achive_taskCount" JSONB NOT NULL,
    "achive_multi" JSONB NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "achivements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "achivements_userId_key" ON "achivements"("userId");

-- AddForeignKey
ALTER TABLE "achivements" ADD CONSTRAINT "achivements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
