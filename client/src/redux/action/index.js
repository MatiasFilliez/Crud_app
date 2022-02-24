import axios from 'axios'

export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
export const GET_ALL_TAGS = "GET_ALL_TAGS";

export const getAllProduct = () => {
    return async function (dispatch) {
        const { data } = await axios.get('http://localhost:3001/api/product')
        dispatch({ type: GET_ALL_PRODUCT, payload: data })
    }
}

export const getAllTags = () => {
    return async function (dispatch) {
        const { data } = await axios.get('http://localhost:3001/api/tags')
        dispatch({ type: GET_ALL_TAGS, payload: data })
    }
}

export const updateProduct = (prop) => {
    return async function () {
        return await axios.put(`http://localhost:3001/api/product/${prop.productId}`, prop)
    }
}

export const postProduct = (prop) =>{
    return async function (){
        return await axios.post("http://localhost:3001/api/product/", prop)
    }
}

export const postTags = (prop) =>{
    return async function (){
        return await axios.post("http://localhost:3001/api/tags/", prop)
    }
}

export const deleteProduct = (id)=>{
    return function(){
        return axios.delete(`http://localhost:3001/api/product/${id}`)
    }
}