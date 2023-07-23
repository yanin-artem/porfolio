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
    user: {
      id: undefined,
      accessTocken: "",
    },
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
    USER(state) {
      return state.user;
    },
  },
  mutations: {
    //PRODUCTS
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    //CART
    SET_CART: (state, cartProduct) => {
      state.cart.push(cartProduct);
      state.itemsQuantity++;
    },
    REMOVE_FROM_CART: (state, index) => {
      state.itemsQuantity -= state.cart[index].quantity;
      cart.deleteProductFromCart(state.cart[index], state.user.accessTocken);
      products.toggleAvailable(
        state.cart[index].product,
        state.user.accessTocken
      );
      cart.changeProductsQuantity(
        state.cart[index],
        1,
        state.user.accessTocken
      );
      state.cart.splice(index, 1);
    },
    SUBTRACT_FROM_CART: (state, index) => {
      state.itemsQuantity--;
      state.cart[index].quantity--;
      cart.changeProductsQuantity(
        state.cart[index],
        state.cart[index].quantity,
        state.user.accessTocken
      );
      if (state.cart[index].quantity < 2) {
        cart.deleteProductFromCart(state.cart[index], state.user.accessTocken);
        products.toggleAvailable(
          state.cart[index].product,
          state.user.accessTocken
        );
        state.cart.splice(index, 1);
      }
    },
    ADDITION_TO_CART: (state, cartProduct) => {
      const item = state.cart.find((item) => item.id === cartProduct.id);
      item.quantity++;
    },
    //COST
    SET_COST: (state, product) => {
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
    SET_USER: (state, user) => {
      state.user.accessTocken = user.token.access_token;
      state.user.id = user.id;
    },
  },
  actions: {
    //PRODUCTS
    async GET_PRODUCTS_FROM_API({ commit }, error, errorMessage) {
      const fetchedProducts = await products.fetchProducts();
      commit("SET_PRODUCTS_TO_STATE", fetchedProducts.data);
    },
    //CART
    async GET_CART_FROM_API({ commit }) {
      const fetchedCart = await cart.fetchCartProducts(
        this.state.user.accessTocken
      );
      fetchedCart.data.forEach((item) => {
        const index = this.state.cart.findIndex(
          (cart_item) => cart_item.id === item.id
        );
        console.log(index);
        if (index === -1) {
          commit("SET_CART", item);
          commit("SET_COST", item.product);
        }
      });
    },
    async ADD_TO_CART({ commit }, product) {
      const addedProduct = await cart.addProductToCart(
        product,
        this.state.user.id,
        this.state.user.accessTocken
      );
      const cartItem = this.state.cart.find(
        (item) => item.product.id === product.id
      );

      commit("SET_CART", cartItem);
    },
    async ADD_QUANTITY({ commit }, cartProduct) {
      if (this.state.user.id) {
        cart.changeProductsQuantity(
          cartProduct,
          cartProduct.quantity + 1,
          this.state.user.accessTocken
        );
        commit("ADDITION_TO_CART", cartProduct);
      }
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
    SET_USER({ commit }, data) {
      commit("SET_USER", data);
    },
  },
  modules: {},
});
