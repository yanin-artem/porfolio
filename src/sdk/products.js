import axios from "axios";

const fetchProducts = async () => {
  return await axios("http://localhost:8080/products", {
    method: "GET",
  });
};

export const products = {
  fetchProducts,
};
