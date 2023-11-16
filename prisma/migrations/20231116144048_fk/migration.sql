/*
  Warnings:

  - The primary key for the `CreatedBy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `castID` on the `CreatedBy` table. All the data in the column will be lost.
  - The primary key for the `Crew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `castID` on the `Crew` table. All the data in the column will be lost.
  - Added the required column `crewID` to the `CreatedBy` table without a default value. This is not possible if the table is not empty.
  - The required column `crewID` was added to the `Crew` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Admin_adminID_key";

-- DropIndex
DROP INDEX "User_userID_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreatedBy" (
    "crewID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("crewID", "ISAN"),
    CONSTRAINT "CreatedBy_crewID_fkey" FOREIGN KEY ("crewID") REFERENCES "Crew" ("crewID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreatedBy_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreatedBy" ("ISAN") SELECT "ISAN" FROM "CreatedBy";
DROP TABLE "CreatedBy";
ALTER TABLE "new_CreatedBy" RENAME TO "CreatedBy";
CREATE UNIQUE INDEX "CreatedBy_crewID_ISAN_key" ON "CreatedBy"("crewID", "ISAN");
CREATE TABLE "new_Reviews" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,
    "Review" TEXT NOT NULL,
    "Rating" REAL NOT NULL,

    PRIMARY KEY ("userID", "ISAN"),
    CONSTRAINT "Reviews_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("ISAN", "Rating", "Review", "userID") SELECT "ISAN", "Rating", "Review", "userID" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
CREATE TABLE "new_Crew" (
    "crewID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Director" BOOLEAN NOT NULL,
    "Actor" BOOLEAN NOT NULL
);
INSERT INTO "new_Crew" ("Actor", "Director", "Name") SELECT "Actor", "Director", "Name" FROM "Crew";
DROP TABLE "Crew";
ALTER TABLE "new_Crew" RENAME TO "Crew";
CREATE TABLE "new_Recommendation" (
    "adminID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("adminID", "ISAN"),
    CONSTRAINT "Recommendation_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Admin" ("adminID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recommendation_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recommendation" ("ISAN", "adminID") SELECT "ISAN", "adminID" FROM "Recommendation";
DROP TABLE "Recommendation";
ALTER TABLE "new_Recommendation" RENAME TO "Recommendation";
CREATE TABLE "new_Movie" (
    "ISAN" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "userRating" REAL NOT NULL,
    "adminRating" REAL NOT NULL,
    "lang" TEXT NOT NULL,
    "searchCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Movie" ("ISAN", "adminRating", "description", "lang", "poster", "release_date", "title", "trailer", "userRating") SELECT "ISAN", "adminRating", "description", "lang", "poster", "release_date", "title", "trailer", "userRating" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Watchlist" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("userID", "ISAN"),
    CONSTRAINT "Watchlist_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Watchlist_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Watchlist" ("ISAN", "userID") SELECT "ISAN", "userID" FROM "Watchlist";
DROP TABLE "Watchlist";
ALTER TABLE "new_Watchlist" RENAME TO "Watchlist";
CREATE TABLE "new_History" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("userID", "ISAN"),
    CONSTRAINT "History_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("ISAN", "userID") SELECT "ISAN", "userID" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
