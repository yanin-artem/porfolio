import axios from "axios";

const fetchProducts = async () => {
  return await axios("http://localhost:8080/products", {
    method: "GET",
  });
};

const toggleAvailable = async (product, token) => {
  return await axios.patch(
    "http://localhost:8080/products/" + product.id,
    {
      available: !product.available,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const updateProduct = async (data, id, token) => {
  return await axios.patch("http://localhost:8080/products/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const fetchProduct = async (id) => {
  return await axios.get("http://localhost:8080/products/" + id);
};

const deleteProduct = async (id) => {
  return await axios.delete("http://localhost:8080/products/" + id);
};

const createProduct = async (data) => {
  return await axios.post("http://localhost:8080/products", data);
};

export const products = {
  fetchProducts,
  toggleAvailable,
  updateProduct,
  fetchProduct,
  deleteProduct,
  createProduct,
};
