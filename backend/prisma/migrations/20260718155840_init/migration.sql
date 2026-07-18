-- CreateEnum
CREATE TYPE "MemberGroup" AS ENUM ('PI', 'POSTDOC', 'PHD', 'MS');

-- CreateEnum
CREATE TYPE "PublicationCategory" AS ENUM ('INTERNATIONAL', 'DOMESTIC', 'PATENT');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('NEWS', 'GALLERY', 'DATES');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "memberGroup" "MemberGroup",
    "interests" TEXT,
    "email" TEXT NOT NULL,
    "homepage" TEXT,
    "photoUrl" TEXT,
    "graduated" BOOLEAN NOT NULL DEFAULT false,
    "degree" TEXT,
    "currentAffiliation" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "category" "PublicationCategory" NOT NULL,
    "tag" TEXT,
    "venue" TEXT,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "doi" TEXT,
    "pdfUrl" TEXT,
    "patentNumber" TEXT,
    "patentDate" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "category" "EventCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "imageUrl" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "kind" TEXT,
    "note" TEXT,
    "colorA" TEXT,
    "colorB" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
