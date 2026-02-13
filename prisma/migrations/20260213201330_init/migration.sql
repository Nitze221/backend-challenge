-- CreateTable
CREATE TABLE "Seashell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" TEXT NOT NULL DEFAULT 'common',

    CONSTRAINT "Seashell_pkey" PRIMARY KEY ("id")
);
