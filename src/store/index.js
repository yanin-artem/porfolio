import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products:[],
    cart:[],
    itemsQuantity:0,
    allCoast:0
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
    COAST(state){
      return state.allCoast
    }
  },
  mutations: {
    SET_PRODUCTS_TO_STATE:(state,products)=>{
      state.products = products
    },
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
      state.allCoast-=state.cart[index].price*state.cart[index].quantity;
      state.itemsQuantity-=state.cart[index].quantity;
      state.cart.splice(index,1);
    },
    SUBTRACT_FROM_CART:(state,index)=>{
      state.allCoast-=state.cart[index].price;
      state.itemsQuantity--;
      state.cart[index].quantity--;
      if(state.cart[index].quantity<1){
        state.cart.splice(index,1);
      }
    },
    SET_COAST:(state,product)=>{
      state.allCoast+=product.price;
    }
  },
  actions: {
    GET_PRODUCTS_FROM_API({commit}){
      return axios('http://localhost:3000/products',{
        method:'GET'
      })
      .then((products)=>{
        commit('SET_PRODUCTS_TO_STATE',products.data)
        return products
      })
    },
    ADD_TO_CART({commit},product){
      commit('SET_CART',product);
    },
    DELETE_FROM_CART({commit},index){
      commit('REMOVE_FROM_CART',index);
    },
    SUBTRACT_FROM_CART({commit},index){
      commit('SUBTRACT_FROM_CART',index);
    },
    SET_COAST({commit},product){
      commit('SET_COAST',product);
    }
  },
  modules: {
  }
})
