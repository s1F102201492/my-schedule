-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "continuedays" INTEGER NOT NULL,
    "checkedDates" JSONB NOT NULL,
    "startdate" DATE NOT NULL,
    "enddate" DATE NOT NULL,
    "interval" JSONB NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
