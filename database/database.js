import * as SQLite from "expo-sqlite";

let dbInstance = null;



export const initDatabase = async () => {

  try {
    if (!dbInstance) {
      dbInstance = await SQLite.openDatabaseAsync("app.db");

      await dbInstance.execAsync(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)"
      );

      await dbInstance.execAsync(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT NOT NULL, 
          subtitle TEXT, 
          icon TEXT, 
          color TEXT
        )`
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

export const taskOperations = {
  createTask: async (title, subtitle, icon, color) => {
    const db = await getDatabase();
    return await db.runAsync(
      "INSERT INTO tasks (title, subtitle, icon, color) VALUES (?, ?, ?, ?)",
      [title, subtitle, icon, color]
    );
  },

  getTasks: async () => {
    const db = await getDatabase();
    return await db.getAllAsync("SELECT * FROM tasks");
  },

  updateTask: async (id, title, subtitle, icon, color) => {
    const db = await getDatabase();
    return await db.runAsync(
      "UPDATE tasks SET title = ?, subtitle = ?, icon = ?, color = ? WHERE id = ?",
      [title, subtitle, icon, color, id]
    );
  },

  deleteTask: async (id) => {
    const db = await getDatabase();
    return await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
  },
};