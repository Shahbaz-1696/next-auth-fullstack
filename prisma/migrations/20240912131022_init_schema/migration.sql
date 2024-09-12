-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "isAdmin" BOOLEAN DEFAULT false,
    "forgotPasswordToken" TEXT NOT NULL,
    "forgotPasswordTokenExpiry" TIMESTAMP(3) NOT NULL,
    "verifyToken" TEXT NOT NULL,
    "verifyTokenExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
