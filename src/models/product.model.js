import productsData from "../data/products.data.js";

export const ProductModel = {
  findAll: () => {
    return productsData;
  },

  findById: (id) => {
    return productsData.find((p) => p.id === id);
  },

  create: (newProduct) => {
    const id = productsData.length > 0 ? Math.max(...productsData.map(p => p.id)) + 1 : 1;
    const productWithId = { id, ...newProduct };
    productsData.push(productWithId);
    return productWithId;
  },

  update: (id, updatedFields) => {
    const index = productsData.findIndex((p) => p.id === id);
    if (index === -1) return null;

    productsData[index] = { ...productsData[index], ...updatedFields };
    return productsData[index];
  },

  delete: (id) => {
    const index = productsData.findIndex((product) => product.id === id);
    if (index === -1) return false;
    productsData.splice(index, 1);
    return true;
  },

  existsByCategoryId: (categoryId) => {
    return productsData.some((product) => product.categoryId === categoryId);
  }
};