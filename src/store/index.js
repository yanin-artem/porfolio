import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products:[],
    cart:[],
    itemsQuantity:0,
    allCost:0
  },
  getters: {
    PRODUCTS(state){
      return state.products
    },
    CART(state){
      return state.cart
    },
    QUANTITY(state){
      return state.itemsQuantity
    },
    COST(state){
      return state.allCost
    }
  },
  mutations: {
    //PRODUCTS
    SET_PRODUCTS_TO_STATE:(state,products)=>{
      state.products = products
    },
    //CART
    SET_CART:(state,product)=>{
      if(product.quantity===0){
        state.cart.push(product);
        product.quantity++;
      }
      else
        product.quantity++;
      state.itemsQuantity++;
    },
    REMOVE_FROM_CART:(state,index)=>{
      state.itemsQuantity-=state.cart[index].quantity;
      state.cart.splice(index,1);
    },
    SUBTRACT_FROM_CART:(state,index)=>{
      state.itemsQuantity--;
      state.cart[index].quantity--;
      if(state.cart[index].quantity<1){
        state.cart.splice(index,1);
      }
    },
    //COST
    SET_COST:(state,product)=>{
      state.allCost+=product.price;
    },
    SUBTRACT_COST:(state,index)=>{
      state.allCost-=state.cart[index].price;
    },
    DELETE_COST:(state,index)=>{
      state.allCost-=state.cart[index].price*state.cart[index].quantity;
    }
  },
  actions: {
    //PRODUCTS
    GET_PRODUCTS_FROM_API({commit}){
      return axios('http://localhost:3000/products',{
        method:'GET'
      })
      .then((products)=>{
        commit('SET_PRODUCTS_TO_STATE',products.data)
        return products
      })
    },
    //CART
    ADD_TO_CART({commit},product){
      commit('SET_CART',product);
    },
    DELETE_FROM_CART({commit},index){
      commit('REMOVE_FROM_CART',index);
    },
    SUBTRACT_FROM_CART({commit},index){
      commit('SUBTRACT_FROM_CART',index);
    },
    //COST
    SET_COST({commit},product){
      commit('SET_COST',product);
    },
    SUBTRACT_COST({commit},index){
      commit('SUBTRACT_COST',index);
    },
    DELETE_COST({commit},index){
      commit('DELETE_COST',index);
    }
  },
  modules: {
  }
})
