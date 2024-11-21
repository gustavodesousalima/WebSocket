import db from "./database.js";

export async function findDocument(title) {
  const result = await db.query(`SELECT * FROM docs WHERE title = $1`, [title]);
  return result.rows[0];
}

export async function createDocument(title, content) {
  const result = await db.query(`INSERT INTO docs (title, content) VALUES ($1, $2) RETURNING *`, [title, content]);
  return result.rows[0];
}

export async function updateDocument(title, content) {
  const result = await db.query(`UPDATE docs SET content = $1 WHERE title = $2 RETURNING *`, [content, title]);
  return result.rows[0];
}