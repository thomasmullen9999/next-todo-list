-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "desc" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
