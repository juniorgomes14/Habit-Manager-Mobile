import * as SQLite from "expo-sqlite";

let dbInstance = null;



export const initDatabase = async () => {

  try {
    if (!dbInstance) {
      dbInstance = await SQLite.openDatabaseAsync("auth.db");

      await dbInstance.execAsync(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)"
      );


      console.log("Database and table created successfully");
    }

    return dbInstance;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export const getDatabase = async () => {
  if (!dbInstance) {
    return await initDatabase();
  }
  return dbInstance;
};



export const userOperations = {
  //entrar na aplicação
  login: async (username, password) => {
    const db = await getDatabase();
    return await db.getFirstAsync(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
  },

  findByUsername: async (username) => {
    const db = await getDatabase();
    return await db.getFirstAsync("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
  },

  register: async (username, password) => {
    const db = await getDatabase();
    return await db.runAsync(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
  },
};

