/*
  Warnings:

  - You are about to drop the column `commentsCommentId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `commentsCommentId` on the `User` table. All the data in the column will be lost.
  - Made the column `userId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "commentsCommentId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "commentsCommentId";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
