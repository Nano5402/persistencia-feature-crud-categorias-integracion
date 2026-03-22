// import productsData from "../data/products.data.js";

// export const ProductModel = {
//   findAll: () => {
//     return productsData;
//   },

//   findById: (id) => {
//     return productsData.find((p) => p.id === id);
//   },

//   create: (newProduct) => {
//     const id = productsData.length > 0 ? Math.max(...productsData.map(p => p.id)) + 1 : 1;
//     const productWithId = { id, ...newProduct };
//     productsData.push(productWithId);
//     return productWithId;
//   },

//   update: (id, updatedFields) => {
//     const index = productsData.findIndex((p) => p.id === id);
//     if (index === -1) return null;

//     productsData[index] = { ...productsData[index], ...updatedFields };
//     return productsData[index];
//   },

//   delete: (id) => {
//     const index = productsData.findIndex((product) => product.id === id);
//     if (index === -1) return false;
//     productsData.splice(index, 1);
//     return true;
//   },

//   // Validación de integridad (Fase 4)
//   existsByCategoryId: (categoryId) => {
//     return productsData.some((product) => product.categoryId === categoryId);
//   },

//   // Obtener productos de una categoría
//   findByCategoryId: (categoryId) => {
//     return productsData.filter((product) => product.categoryId === categoryId);
//   }
// };

import pool from "../config/db.js";

export const ProductModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM Products");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM Products WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (newProduct) => {
    // Asignamos stock por defecto a 5 si no se envía, tal como indica tu DB
    const { name, price, categoryId, stock = 5 } = newProduct; 
    const [result] = await pool.query(
      "INSERT INTO Products (name, price, stock, categoryId) VALUES (?, ?, ?, ?)", 
      [name, price, stock, categoryId]
    );
    return { id: result.insertId, name, price, stock, categoryId };
  },

  update: async (id, updatedFields) => {
    const [result] = await pool.query("UPDATE Products SET ? WHERE id = ?", [updatedFields, id]);
    if (result.affectedRows === 0) return null;
    return { id, ...updatedFields };
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM Products WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  existsByCategoryId: async (categoryId) => {
    // Optimizamos la consulta para que solo busque un registro y sea más rápida
    const [rows] = await pool.query("SELECT 1 FROM Products WHERE categoryId = ? LIMIT 1", [categoryId]);
    return rows.length > 0;
  },

  findByCategoryId: async (categoryId) => {
    const [rows] = await pool.query("SELECT * FROM Products WHERE categoryId = ?", [categoryId]);
    return rows;
  }
};