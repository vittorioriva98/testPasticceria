import {get, set, update} from "./service.js";

export const getProducts = (callback) => {
    get("products", (result) => {
        const list = []
        if(result) {
            Object.keys(result).forEach((key) => {
                list.push(result[key])
            })
        }
        callback(list)
    })
}

export const addProduct = (id, data, callback) => {
    set("products/" + id, data, callback)
}

export const updateProduct = (id, data, callback) => {
    update("products/" + id, data, callback)
}

export const deleteProduct = (id, callback) => {
    set("products/" + id, null, callback)
}