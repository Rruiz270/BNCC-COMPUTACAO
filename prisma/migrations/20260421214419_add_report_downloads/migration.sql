-- CreateTable
CREATE TABLE "report_downloads" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_downloads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "report_downloads_email_key" ON "report_downloads"("email");

-- CreateIndex
CREATE UNIQUE INDEX "report_downloads_telefone_key" ON "report_downloads"("telefone");
