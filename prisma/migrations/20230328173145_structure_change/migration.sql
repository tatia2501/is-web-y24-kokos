/*
  Warnings:

  - You are about to drop the column `auther` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `catalog_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Catalog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Specials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_selected` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_catalog_id_fkey";

-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Specials" DROP CONSTRAINT "Specials_book_id_fkey";

-- AlterTable
ALTER TABLE "Basket" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "auther",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "is_selected" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "book_id",
DROP COLUMN "catalog_id";

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "book_id";

-- DropTable
DROP TABLE "Catalog";

-- DropTable
DROP TABLE "Specials";

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "SpecialOffer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "SpecialOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedBooks" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "OrderedBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToCategory" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_MailToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCategory_AB_unique" ON "_BookToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCategory_B_index" ON "_BookToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MailToUser_AB_unique" ON "_MailToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MailToUser_B_index" ON "_MailToUser"("B");

-- AddForeignKey
ALTER TABLE "OrderedBooks" ADD CONSTRAINT "OrderedBooks_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedBooks" ADD CONSTRAINT "OrderedBooks_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MailToUser" ADD CONSTRAINT "_MailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Mail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MailToUser" ADD CONSTRAINT "_MailToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
