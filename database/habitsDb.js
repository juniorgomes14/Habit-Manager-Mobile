import * as SQLite from "expo-sqlite";

let dbhabit = null;



export const initDatabase = async () => {

  try {
    if (!dbhabit) {
      dbhabit = await SQLite.openDatabaseAsync("habit.db");
      await dbhabit.execAsync(
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

    return dbhabit;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export const getDatabase = async () => {
  if (!dbhabit) {
    return await initDatabase();
  }
  return dbhabit;
};



export const habitOperations = {
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