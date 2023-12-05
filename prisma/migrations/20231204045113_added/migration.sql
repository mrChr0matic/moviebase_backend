/*
  Warnings:

  - Added the required column `lastAccess` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,
    "lastAccess" DATETIME NOT NULL,

    PRIMARY KEY ("userID", "ISAN"),
    CONSTRAINT "History_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("ISAN", "userID") SELECT "ISAN", "userID" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
