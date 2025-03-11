import sqlite3 from "sqlite3";

export const handleDb = () => {
  return new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database(
      "./test.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err.message);
        } else {
          // Create Table if it doesn't exist
          const sql = `CREATE TABLE IF NOT EXISTS chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          role TEXT,
          message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`;
          db.run(sql, (err) => {
            if (err) {
              reject(err.message);
            } else {
              resolve(db);
            }
          });
        }
      }
    );
  });
};
