import { IProduct } from "../interfaces/product";
import instance from "./instance";

const getAllProducts = () => {
    return instance.get(`/products`)   
}
const getOneProduct = (id: string) => {
    return instance.get(`/products/${id}`)   
}
const updateProducts = (product: IProduct) => {
    return instance.put(`/products/${product._id}`, product )   
}
const deleteProducts = (id: string ) => {
    return instance.delete(`/products/` + id)   
}
const addProducts = (product: IProduct) => {
    return instance.post(`/products`, product)   
}

export {getAllProducts, addProducts, updateProducts, deleteProducts, getOneProduct}