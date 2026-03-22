// import categoriesData from "../data/categories.data.js";

// export const CategoryModel = {
//   findAll: () => {
//     return categoriesData;
//   },

//   findById: (id) => {
//     return categoriesData.find((c) => c.id === id);
//   },

//   create: (newCategory) => {
//     const id = categoriesData.length > 0 ? Math.max(...categoriesData.map(c => c.id)) + 1 : 1;
//     const categoryWithId = { id, ...newCategory };
//     categoriesData.push(categoryWithId);
//     return categoryWithId;
//   },

//   update: (id, updatedFields) => {
//     const index = categoriesData.findIndex((c) => c.id === id);
//     if (index === -1) return null;

//     categoriesData[index] = { ...categoriesData[index], ...updatedFields };
//     return categoriesData[index];
//   },

//   delete: (id) => {
//     const index = categoriesData.findIndex((category) => category.id === id);
//     if (index === -1) return false;
//     categoriesData.splice(index, 1);
//     return true;
//   }
// };

import pool from "../config/db.js";

export const CategoryModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM Categories");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM Categories WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (newCategory) => {
    const { name } = newCategory;
    const [result] = await pool.query("INSERT INTO Categories (name) VALUES (?)", [name]);
    return { id: result.insertId, name };
  },

  update: async (id, updatedFields) => {
    // mysql2 permite pasar un objeto para hacer un UPDATE dinámico
    const [result] = await pool.query("UPDATE Categories SET ? WHERE id = ?", [updatedFields, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...updatedFields };
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM Categories WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
};