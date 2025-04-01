-- CreateTable
CREATE TABLE "public"."Todos" (
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

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
