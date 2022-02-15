import { GET_ALL_PRODUCT, GET_ALL_TAGS } from "../action";

const initialState = {
    allProduct: [],
    allTags: []
}

const cases = {};

cases[GET_ALL_PRODUCT] = (initialState, payload) => ({
    ...initialState, allProduct: payload
})

cases[GET_ALL_TAGS] = (initialState, payload) => ({
    ...initialState, allTags: payload
})

export default function rootReducer(state = initialState, { type, payload }) {
    return cases[type] ? cases[type](state, payload) : state;
}