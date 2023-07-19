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

const deleteProductFromCart = async ({ id }) => {
  return await axios.delete("http://localhost:8080/product-in-cart/" + id);
};

const changeProductsQuantity = async (cartProduct, currentQuantity) => {
  return await axios.patch(
    "http://localhost:8080/product-in-cart/" + cartProduct.id,
    {
      quantity: currentQuantity,
    }
  );
};

export const cart = {
  fetchCartProducts,
  addProductToCart,
  deleteProductFromCart,
  changeProductsQuantity,
};
