/*
  Warnings:

  - You are about to alter the column `lastAccess` on the `History` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "userID" TEXT NOT NULL,
    "ISAN" TEXT NOT NULL,
    "lastAccess" INTEGER NOT NULL,

    PRIMARY KEY ("userID", "ISAN"),
    CONSTRAINT "History_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_ISAN_fkey" FOREIGN KEY ("ISAN") REFERENCES "Movie" ("ISAN") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("ISAN", "lastAccess", "userID") SELECT "ISAN", "lastAccess", "userID" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
