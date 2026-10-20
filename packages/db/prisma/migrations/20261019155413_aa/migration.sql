-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "isOnly" BOOLEAN NOT NULL DEFAULT true,
    "principalStartDate" DATE,
    "principalEndDate" DATE,
    "retakeStartDate" DATE,
    "retakeEndDate" DATE,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_isOnly_key" ON "SystemSetting"("isOnly");
