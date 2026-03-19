import { CategoryModel } from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";

export const getAllCategories = (req, res) => {
  const categories = CategoryModel.findAll();
  res.status(200).json({
    success: true,
    message: "Lista de categorías",
    data: categories,
    errors: [],
  });
};

export const getCategoryById = (req, res) => {
  const { id } = req.params;
  const category = CategoryModel.findById(Number(id));
  
  if (!category) {
    return res.status(404).json({
      success: false,
      message: `Categoría con ID ${id} no encontrada`,
      data: [],
      errors: [],
    });
  }
  
  res.status(200).json({
    success: true,
    message: "Categoría encontrada correctamente",
    data: category,
    errors: [],
  });
};

export const createCategory = (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "El nombre de la categoría es obligatorio",
      data: [],
      errors: [],
    });
  }

  const newCategory = CategoryModel.create({ name });
  res.status(201).json({
    success: true,
    message: "Categoría creada correctamente",
    data: newCategory,
    errors: [],
  });
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const updatedCategory = CategoryModel.update(Number(id), req.body);
  
  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: `Categoría con ID ${id} no encontrada`,
      data: [],
      errors: [],
    });
  }
  
  res.status(200).json({
    success: true,
    message: "Categoría actualizada correctamente",
    data: updatedCategory,
    errors: [],
  });
};

// Reto de Integridad: Prevención de borrado de categorías con productos
export const deleteCategory = (req, res) => {
  const { id } = req.params;
  const categoryId = Number(id);

  // Validación: ¿Hay productos usando esta categoría?
  const hasProducts = ProductModel.existsByCategoryId(categoryId);

  if (hasProducts) {
    return res.status(409).json({
      success: false,
      message: "No se puede eliminar la categoría porque tiene recursos vinculados",
      data: [],
      errors: [],
    });
  }

  const isDeleted = CategoryModel.delete(categoryId);
  
  if (!isDeleted) {
    return res.status(404).json({
      success: false,
      message: `Categoría con ID ${id} no encontrada`,
      data: [],
      errors: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "Categoría eliminada correctamente",
    data: [],
    errors: [],
  });
};