import { openDatabaseAsync } from 'expo-sqlite';

let db;

export const initDB = async () => {
  db = await openDatabaseAsync('tokenDB');

  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS tokenTable (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT);'
  );
  // await db.execAsync(`DROP TABLE IF EXISTS cartTable;`);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cartTable (
      id TEXT PRIMARY KEY,
      user TEXT,
      product TEXT,
      name TEXT,
      price REAL,
      stock INTEGER,
      quantity INTEGER,
      image TEXT,
      createdAt TEXT
    );
  `);
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

// add to cart
export const saveCartToSQLite = async (cartItems) => {
  if (!db) db = await openDatabaseAsync('tokenDB');

  console.log('[SQLite] Saving cart to local DB...');
  await db.runAsync(`DELETE FROM cartTable;`);

 for (const item of cartItems) {
  const user = item.user;
  const product = item.product._id || item.product;
  const quantity = item.quantity;

  console.log(`[SQLite] Saving item -> user: ${user}, product: ${product}, quantity: ${quantity}`);

  await db.runAsync(
    `INSERT INTO cartTable (id, user, product, quantity, createdAt) VALUES (?, ?, ?, ?, ?)`,
    [
      item._id,
      user,
      product,
      quantity,
      item.createdAt || new Date().toISOString()
    ]
  );
}
};

export const getCartFromSQLite = async () => {
  if (!db) db = await openDatabaseAsync('tokenDB');
  const result = await db.getAllAsync(`SELECT * FROM cartTable;`);
  // console.log('[SQLite] Loaded cart from local DB:', result);
  return result;
};

export const clearCartSQLite = async () => {
  if (!db) db = await openDatabaseAsync('tokenDB');
  await db.runAsync(`DELETE FROM cartTable;`);
  console.log('[SQLite] Cleared local cart 🧹');
};


export const upsertCartItemSQLite = async (cartItem) => {
  if (!db) db = await openDatabaseAsync('tokenDB');

  const user = cartItem.user;
  const productId = cartItem.product._id || cartItem.product;
  const quantity = cartItem.quantity;
  const createdAt = cartItem.createdAt || new Date().toISOString();

  const product = cartItem.product || {};
  const name = product.name || '';
  const price = product.price || 0;
  const stock = product.stock || 1;
  const image = product.images?.[0]?.url || '';

  await db.runAsync(
    `INSERT OR REPLACE INTO cartTable 
     (id, user, product, name, price, stock, quantity, image, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [cartItem._id, user, productId, name, price, stock, quantity, image, createdAt]
  );

  console.log(`[SQLite] UPSERT: ${name}, qty: ${quantity}`);
};




export const deleteCartItemSQLite = async (cartItemId) => {
  if (!db) db = await openDatabaseAsync('tokenDB');
  await db.runAsync(`DELETE FROM cartTable WHERE id = ?`, [cartItemId]);
  console.log(`[SQLite] Deleted item from local DB -> id: ${cartItemId}`);
};