-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("userID", "ISAN")
);
INSERT INTO "new_History" ("ISAN", "userID") SELECT "ISAN", "userID" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
CREATE UNIQUE INDEX "History_userID_ISAN_key" ON "History"("userID", "ISAN");
CREATE TABLE "new_Watchlist" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("userID", "ISAN")
);
INSERT INTO "new_Watchlist" ("ISAN", "userID") SELECT "ISAN", "userID" FROM "Watchlist";
DROP TABLE "Watchlist";
ALTER TABLE "new_Watchlist" RENAME TO "Watchlist";
CREATE UNIQUE INDEX "Watchlist_userID_ISAN_key" ON "Watchlist"("userID", "ISAN");
CREATE TABLE "new_Recommendation" (
    "adminID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("adminID", "ISAN")
);
INSERT INTO "new_Recommendation" ("ISAN", "adminID") SELECT "ISAN", "adminID" FROM "Recommendation";
DROP TABLE "Recommendation";
ALTER TABLE "new_Recommendation" RENAME TO "Recommendation";
CREATE UNIQUE INDEX "Recommendation_adminID_ISAN_key" ON "Recommendation"("adminID", "ISAN");
CREATE TABLE "new_CreatedBy" (
    "castID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,

    PRIMARY KEY ("castID", "ISAN")
);
INSERT INTO "new_CreatedBy" ("ISAN", "castID") SELECT "ISAN", "castID" FROM "CreatedBy";
DROP TABLE "CreatedBy";
ALTER TABLE "new_CreatedBy" RENAME TO "CreatedBy";
CREATE UNIQUE INDEX "CreatedBy_castID_ISAN_key" ON "CreatedBy"("castID", "ISAN");
CREATE TABLE "new_Reviews" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,
    "Review" TEXT NOT NULL,
    "Rating" REAL NOT NULL,

    PRIMARY KEY ("userID", "ISAN")
);
INSERT INTO "new_Reviews" ("ISAN", "Rating", "Review", "userID") SELECT "ISAN", "Rating", "Review", "userID" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
CREATE UNIQUE INDEX "Reviews_userID_ISAN_key" ON "Reviews"("userID", "ISAN");
CREATE TABLE "new_Movie" (
    "ISAN" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "userRating" REAL NOT NULL,
    "adminRating" REAL NOT NULL,
    "lang" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("ISAN", "adminRating", "description", "lang", "poster", "release_date", "title", "trailer", "userRating") SELECT "ISAN", "adminRating", "description", "lang", "poster", "release_date", "title", "trailer", "userRating" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_ISAN_key" ON "Movie"("ISAN");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
