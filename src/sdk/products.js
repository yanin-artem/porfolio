import axios from "axios";

const fetchProducts = async () => {
  return await axios("http://localhost:8080/products", {
    method: "GET",
  });
};

const toggleAvailable = async (product) => {
  return await axios.patch("http://localhost:8080/products/" + product.id, {
    available: !product.available,
  });
};

export const products = {
  fetchProducts,
  toggleAvailable,
};
