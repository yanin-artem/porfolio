import axios from "axios";

const fetchCartProducts = async (token) => {
  return await axios("http://localhost:8080/product-in-cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const addProductToCart = async (product, cart_id, token) => {
  return await axios.post(
    "http://localhost:8080/product-in-cart",
    {
      product: product.id,
      cart: cart_id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const deleteProductFromCart = async ({ id }, token) => {
  return await axios.delete("http://localhost:8080/product-in-cart/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const changeProductsQuantity = async (cartProduct, currentQuantity, token) => {
  return await axios.patch(
    "http://localhost:8080/product-in-cart/" + cartProduct.id,
    {
      quantity: currentQuantity,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const cart = {
  fetchCartProducts,
  addProductToCart,
  deleteProductFromCart,
  changeProductsQuantity,
};
