/*
  Warnings:

  - A unique constraint covering the columns `[userId,issueId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issueId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookmarkStatus" AS ENUM ('SAVED', 'WORKING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "issueId" TEXT NOT NULL,
ADD COLUMN     "repoUrl" TEXT,
ADD COLUMN     "status" "BookmarkStatus" NOT NULL DEFAULT 'SAVED';

-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_issueId_key" ON "Bookmark"("userId", "issueId");
