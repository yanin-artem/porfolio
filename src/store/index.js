import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products:[],
    cart:[],
    itemsQuantity:0,
    allCost:0,
    error:false,
    errorMessage:''
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
    },
    ERROR(state){
      return state.error
    },
    ERROR_MESSAGE(state){
      return state.errorMessage
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
    },
    //ERROR
    ERROR:(state,error)=>{
      state.error=error;
    },
    ERROR_MESSAGE:(state,errorMessage)=>{
      state.errorMessage=errorMessage;
    }
  },
  actions: {
    //PRODUCTS
    GET_PRODUCTS_FROM_API({commit},error,errorMessage){
      return axios('http://localhost:3000/products',{
        method:'GET'
      })
      .then((products)=>{
        commit('SET_PRODUCTS_TO_STATE',products.data)
        console.log(products);
        return products
      })
      .catch((e)=>{
        console.log(e);
        if(e.response.status===404){
          error=true;
          errorMessage='Cтраница не найдена';
          commit('ERROR',error);
          commit('ERROR_MESSAGE',errorMessage)
        }
        else if(e.response.status===500){
          error=true;
          errorMessage='Что-то пошло не так, но мы не знаем, что именно';
          commit('ERROR',error);
          commit('ERROR_MESSAGE',errorMessage)
        }
        else if(e.response.status===503){
          error=true;
          errorMessage='Сервер помер по техническим причинам. Повторите попытку когда нибудь...';
          commit('ERROR',error);
          commit('ERROR_MESSAGE',errorMessage)
        }
        return e
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
