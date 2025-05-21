-- DropForeignKey
ALTER TABLE "public"."Todos" DROP CONSTRAINT "Todos_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Todos" ADD CONSTRAINT "Todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
