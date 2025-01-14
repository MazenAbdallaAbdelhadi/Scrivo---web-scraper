/*
  Warnings:

  - You are about to drop the column `creditCost` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExecutionPhase" DROP COLUMN "creditCost",
ADD COLUMN     "creditsConsumed" INTEGER;
