import axios from "axios";

const fetchCartProducts = async () => {
  return await axios("http://localhost:8080/product-in-cart", {
    method: "GET",
  });
};

const addProductToCart = async (product) => {
  return await axios.post("http://localhost:8080/product-in-cart", {
    product: product.id,
    cart: null,
  });
};

export const cart = {
  fetchCartProducts,
  addProductToCart,
};
