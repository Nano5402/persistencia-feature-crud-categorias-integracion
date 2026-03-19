import { ProductModel } from "../models/product.model.js";

export const getAllProducts = (req, res) => {
  const products = ProductModel.findAll();
  res.status(200).json({
    success: true,
    message: "Lista de productos",
    data: products,
    errors: [],
  });
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = ProductModel.findById(Number(id));
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto encontrado correctamente",
      data: product,
      errors: [],
    });
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: "Error al procesar la búsqueda",
      data: [],
      errors: [],
    });
  }
};

export const createProduct = (req, res) => {
  const { name, price, categoryId } = req.body;
  
  // Validación que ahora incluye el categoryId
  if (!name || !price || !categoryId) {
    return res.status(400).json({
      success: false,
      message: "Nombre, precio y categoryId son obligatorios",
      data: [],
      errors: [],
    });
  }

  const newProduct = ProductModel.create({ name, price, categoryId });
  res.status(201).json({
    success: true,
    message: "Producto creado correctamente",
    data: newProduct,
    errors: [],
  });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedProduct = ProductModel.update(Number(id), req.body);
  if (!updatedProduct) { 
    return res.status(404).json({
      success: false,
      message: `Producto con ID ${id} no encontrado`,
      data: [],
      errors: [],
    });
  }
  res.status(200).json({
    success: true,
    message: "Producto actualizado correctamente",
    data: updatedProduct,
    errors: [],
  });
};

export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = ProductModel.delete(Number(id));
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: `No se pudo eliminar: Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: [],
      errors: [],
    });    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en el servidor al eliminar",
      data: [],
      errors: [error.message]
    });
  }
};