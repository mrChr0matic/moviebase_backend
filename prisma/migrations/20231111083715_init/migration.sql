-- CreateTable
CREATE TABLE "Movie" (
    "ISAN" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "userRating" REAL NOT NULL,
    "adminRating" REAL NOT NULL,
    "lang" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminID" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reviews" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,
    "Review" TEXT NOT NULL,
    "Rating" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "adminID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Crew" (
    "castID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Director" BOOLEAN NOT NULL,
    "Actor" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "CreatedBy" (
    "castID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_ISAN_key" ON "Movie"("ISAN");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminID_key" ON "Admin"("adminID");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userID_ISAN_key" ON "Reviews"("userID", "ISAN");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userID_ISAN_key" ON "Watchlist"("userID", "ISAN");

-- CreateIndex
CREATE UNIQUE INDEX "History_userID_ISAN_key" ON "History"("userID", "ISAN");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_adminID_ISAN_key" ON "Recommendation"("adminID", "ISAN");

-- CreateIndex
CREATE UNIQUE INDEX "Crew_castID_key" ON "Crew"("castID");

-- CreateIndex
CREATE UNIQUE INDEX "CreatedBy_castID_ISAN_key" ON "CreatedBy"("castID", "ISAN");
