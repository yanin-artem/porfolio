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

export const products = {
  fetchProducts,
  toggleAvailable,
};
