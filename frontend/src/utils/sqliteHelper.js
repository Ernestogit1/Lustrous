import { openDatabaseAsync } from 'expo-sqlite';

let db;

export const initDB = async () => {
  db = await openDatabaseAsync('tokenDB');

  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS tokenTable (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT);'
  );
};

export const storeToken = async (token) => {
  if (!db) db = await openDatabaseAsync('tokenDB');
  await db.runAsync('INSERT INTO tokenTable (token) VALUES (?);', token);
};

export const getToken = async () => {
  if (!db) db = await openDatabaseAsync('tokenDB');

  const result = await db.getFirstAsync(
    'SELECT token FROM tokenTable ORDER BY id DESC LIMIT 1;'
  );

  return result ? result.token : null;
};

export const removeToken = async () => {
  if (!db) db = await openDatabaseAsync('tokenDB');
  await db.runAsync('DELETE FROM tokenTable;');
};
