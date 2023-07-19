import { createStore } from "vuex";
import { products } from "@/sdk/products";
import { cart } from "@/sdk/cart";

export default createStore({
  state: {
    products: [],
    cart: [],
    itemsQuantity: 0,
    allCost: 0,
    error: false,
    errorMessage: "",
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    },
    QUANTITY(state) {
      return state.itemsQuantity;
    },
    COST(state) {
      return state.allCost;
    },
    ERROR(state) {
      return state.error;
    },
    ERROR_MESSAGE(state) {
      return state.errorMessage;
    },
  },
  mutations: {
    //PRODUCTS
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    //CART
    SET_CART: (state, cartProduct) => {
      if (cartProduct.quantity === 1) {
        state.cart.push(cartProduct);
      } else cartProduct.product.quantity++;
      state.itemsQuantity++;
    },
    REMOVE_FROM_CART: (state, index) => {
      state.itemsQuantity -= state.cart[index].quantity;
      state.cart.splice(index, 1);
    },
    SUBTRACT_FROM_CART: (state, index) => {
      state.itemsQuantity--;
      state.cart[index].quantity--;
      if (state.cart[index].quantity < 1) {
        state.cart.splice(index, 1);
      }
    },
    //COST
    SET_COST: (state, product) => {
      console.log("product SETCOST", product);
      state.allCost += product.price;
    },
    SUBTRACT_COST: (state, index) => {
      state.allCost -= state.cart[index].product.price;
    },
    DELETE_COST: (state, index) => {
      state.allCost -=
        state.cart[index].product.price * state.cart[index].quantity;
    },
    //ERROR
    ERROR: (state, error) => {
      state.error = error;
    },
    ERROR_MESSAGE: (state, errorMessage) => {
      state.errorMessage = errorMessage;
    },
  },
  actions: {
    //PRODUCTS
    async GET_PRODUCTS_FROM_API({ commit }, error, errorMessage) {
      const fetchedProducts = await products.fetchProducts();
      commit("SET_PRODUCTS_TO_STATE", fetchedProducts.data);
      console.log(fetchedProducts);
    },
    //CART
    async GET_CART_FROM_API({ commit }) {
      const fetchedCart = await cart.fetchCartProducts();
      fetchedCart.data.forEach((item) => {
        commit("SET_CART", item);
        commit("SET_COST", item.product);
      });

      console.log(fetchedCart.data);
    },
    async ADD_TO_CART({ commit }, product) {
      const addedProduct = await cart.addProductToCart(product);
      // commit("SET_CART", product);
    },
    DELETE_FROM_CART({ commit }, index) {
      commit("REMOVE_FROM_CART", index);
    },
    SUBTRACT_FROM_CART({ commit }, index) {
      commit("SUBTRACT_FROM_CART", index);
    },
    //COST
    SET_COST({ commit }, product) {
      commit("SET_COST", product);
    },
    SUBTRACT_COST({ commit }, index) {
      commit("SUBTRACT_COST", index);
    },
    DELETE_COST({ commit }, index) {
      commit("DELETE_COST", index);
    },
  },
  modules: {},
});
