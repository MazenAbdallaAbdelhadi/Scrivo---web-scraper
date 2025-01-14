/*
  Warnings:

  - You are about to drop the column `definitions` on the `WorkflowExecution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkflowExecution" DROP COLUMN "definitions",
ADD COLUMN     "definition" TEXT NOT NULL DEFAULT '{}';
