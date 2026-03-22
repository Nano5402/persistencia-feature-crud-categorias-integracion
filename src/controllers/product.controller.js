// import { ProductModel } from "../models/product.model.js";

// export const getAllProducts = (req, res) => {
//   const products = ProductModel.findAll();
//   res.status(200).json({
//     success: true,
//     message: "Lista de productos",
//     data: products,
//     errors: [],
//   });
// };

// export const getProductById = (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = ProductModel.findById(Number(id));
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: `Producto con ID ${id} no encontrado`,
//         data: [],
//         errors: [],
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Producto encontrado correctamente",
//       data: product,
//       errors: [],
//     });
//   } catch (error) { 
//     res.status(500).json({
//       success: false,
//       message: "Error al procesar la búsqueda",
//       data: [],
//       errors: [],
//     });
//   }
// };

// export const createProduct = (req, res) => {
//   const { name, price, categoryId } = req.body;
  
//   if (!name || !price || !categoryId) {
//     return res.status(400).json({
//       success: false,
//       message: "Nombre, precio y categoryId son obligatorios",
//       data: [],
//       errors: [],
//     });
//   }

//   const newProduct = ProductModel.create({ name, price, categoryId });
//   res.status(201).json({
//     success: true,
//     message: "Producto creado correctamente",
//     data: newProduct,
//     errors: [],
//   });
// };

// export const updateProduct = (req, res) => {
//   const { id } = req.params;
//   const updatedProduct = ProductModel.update(Number(id), req.body);
//   if (!updatedProduct) { 
//     return res.status(404).json({
//       success: false,
//       message: `Producto con ID ${id} no encontrado`,
//       data: [],
//       errors: [],
//     });
//   }
//   res.status(200).json({
//     success: true,
//     message: "Producto actualizado correctamente",
//     data: updatedProduct,
//     errors: [],
//   });
// };

// export const deleteProduct = (req, res) => {
//   try {
//     const { id } = req.params;
//     const isDeleted = ProductModel.delete(Number(id));
//     if (!isDeleted) {
//       return res.status(404).json({
//         success: false,
//         message: `No se pudo eliminar: Producto con ID ${id} no encontrado`,
//         data: [],
//         errors: [],
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Producto eliminado correctamente",
//       data: [],
//       errors: [],
//     });    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error en el servidor al eliminar",
//       data: [],
//       errors: [error.message]
//     });
//   }
// };

import { ProductModel } from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).json({ success: true, message: "Lista de productos", data: products, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(Number(id));
    if (!product) {
      return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado`, data: [], errors: [] });
    }
    res.status(200).json({ success: true, message: "Producto encontrado", data: product, errors: [] });
  } catch (error) { 
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ success: false, message: "Nombre, precio y categoryId son obligatorios", data: [], errors: [] });
    }

    // El modelo se encargará de poner el stock en 5 si no viene en el req.body
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ success: true, message: "Producto creado", data: newProduct, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await ProductModel.update(Number(id), req.body);
    if (!updatedProduct) { 
      return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado`, data: [], errors: [] });
    }
    res.status(200).json({ success: true, message: "Producto actualizado", data: updatedProduct, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await ProductModel.delete(Number(id));
    if (!isDeleted) {
      return res.status(404).json({ success: false, message: `Producto con ID ${id} no encontrado`, data: [], errors: [] });
    }
    res.status(200).json({ success: true, message: "Producto eliminado", data: [], errors: [] });    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor al eliminar", data: [], errors: [error.message] });
  }
};