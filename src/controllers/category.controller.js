// import { CategoryModel } from "../models/category.model.js";
// import { ProductModel } from "../models/product.model.js";

// export const getAllCategories = (req, res) => {
//   const categories = CategoryModel.findAll();
//   res.status(200).json({
//     success: true,
//     message: "Lista de categorías",
//     data: categories,
//     errors: [],
//   });
// };

// export const getCategoryById = (req, res) => {
//   const { id } = req.params;
//   const category = CategoryModel.findById(Number(id));
  
//   if (!category) {
//     return res.status(404).json({
//       success: false,
//       message: `Categoría con ID ${id} no encontrada`,
//       data: [],
//       errors: [],
//     });
//   }
  
//   res.status(200).json({
//     success: true,
//     message: "Categoría encontrada correctamente",
//     data: category,
//     errors: [],
//   });
// };

// export const createCategory = (req, res) => {
//   const { name } = req.body;
  
//   if (!name) {
//     return res.status(400).json({
//       success: false,
//       message: "El nombre de la categoría es obligatorio",
//       data: [],
//       errors: [],
//     });
//   }

//   const newCategory = CategoryModel.create({ name });
//   res.status(201).json({
//     success: true,
//     message: "Categoría creada correctamente",
//     data: newCategory,
//     errors: [],
//   });
// };

// export const updateCategory = (req, res) => {
//   const { id } = req.params;
//   const updatedCategory = CategoryModel.update(Number(id), req.body);
  
//   if (!updatedCategory) {
//     return res.status(404).json({
//       success: false,
//       message: `Categoría con ID ${id} no encontrada`,
//       data: [],
//       errors: [],
//     });
//   }
  
//   res.status(200).json({
//     success: true,
//     message: "Categoría actualizada correctamente",
//     data: updatedCategory,
//     errors: [],
//   });
// };

// export const deleteCategory = (req, res) => {
//   const { id } = req.params;
//   const categoryId = Number(id);

//   const hasProducts = ProductModel.existsByCategoryId(categoryId);

//   if (hasProducts) {
//     return res.status(409).json({
//       success: false,
//       message: "No se puede eliminar la categoría porque tiene recursos vinculados",
//       data: [],
//       errors: [],
//     });
//   }

//   const isDeleted = CategoryModel.delete(categoryId);
  
//   if (!isDeleted) {
//     return res.status(404).json({
//       success: false,
//       message: `Categoría con ID ${id} no encontrada`,
//       data: [],
//       errors: [],
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Categoría eliminada correctamente",
//     data: [],
//     errors: [],
//   });
// };

// export const getProductsByCategory = (req, res) => {
//   try {
//     const { id } = req.params;
//     const categoryId = Number(id);

//     const categoryExists = CategoryModel.findById(categoryId);
//     if (!categoryExists) {
//       return res.status(404).json({
//         success: false,
//         message: `La categoría con ID ${id} no existe`,
//         data: [],
//         errors: [],
//       });
//     }

//     const products = ProductModel.findByCategoryId(categoryId);
//     res.status(200).json({
//       success: true,
//       message: `Productos de la categoría: ${categoryExists.name}`,
//       data: products,
//       errors: [],
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error al buscar los productos de la categoría",
//       data: [],
//       errors: [],
//     });
//   }
// };

import { CategoryModel } from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.status(200).json({ success: true, message: "Lista de categorías", data: categories, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(Number(id));
    
    if (!category) {
      return res.status(404).json({ success: false, message: `Categoría con ID ${id} no encontrada`, data: [], errors: [] });
    }
    
    res.status(200).json({ success: true, message: "Categoría encontrada", data: category, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "El nombre es obligatorio", data: [], errors: [] });
    }

    const newCategory = await CategoryModel.create({ name });
    res.status(201).json({ success: true, message: "Categoría creada", data: newCategory, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await CategoryModel.update(Number(id), req.body);
    
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: `Categoría con ID ${id} no encontrada`, data: [], errors: [] });
    }
    
    res.status(200).json({ success: true, message: "Categoría actualizada", data: updatedCategory, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);

    // Verificamos si hay productos asociados (protege contra el error de la llave foránea)
    const hasProducts = await ProductModel.existsByCategoryId(categoryId);
    if (hasProducts) {
      return res.status(409).json({ success: false, message: "No se puede eliminar la categoría porque tiene productos vinculados", data: [], errors: [] });
    }

    const isDeleted = await CategoryModel.delete(categoryId);
    if (!isDeleted) {
      return res.status(404).json({ success: false, message: `Categoría con ID ${id} no encontrada`, data: [], errors: [] });
    }

    res.status(200).json({ success: true, message: "Categoría eliminada", data: [], errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);

    const categoryExists = await CategoryModel.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ success: false, message: `La categoría con ID ${id} no existe`, data: [], errors: [] });
    }

    const products = await ProductModel.findByCategoryId(categoryId);
    res.status(200).json({ success: true, message: `Productos de la categoría: ${categoryExists.name}`, data: products, errors: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno", data: [], errors: [error.message] });
  }
};