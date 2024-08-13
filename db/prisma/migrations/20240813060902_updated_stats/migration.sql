/*
  Warnings:

  - You are about to drop the column `contestRanking` on the `UserStats` table. All the data in the column will be lost.
  - Added the required column `attendedContests` to the `UserStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestRating` to the `UserStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `globalRanking` to the `UserStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStats" DROP COLUMN "contestRanking",
ADD COLUMN     "attendedContests" INTEGER NOT NULL,
ADD COLUMN     "contestRating" INTEGER NOT NULL,
ADD COLUMN     "globalRanking" INTEGER NOT NULL,
ALTER COLUMN "easyQuestionsSolved" DROP DEFAULT,
ALTER COLUMN "mediumQuestionsSolved" DROP DEFAULT,
ALTER COLUMN "hardQuestionsSolved" DROP DEFAULT;
