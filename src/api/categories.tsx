import instance from "./instance";

const getAllCategories = () => {
    return instance.get(`/categories`)   
}
const getOneCategories = (id: string) => {
    return instance.get(`/categories/${id}`)   
}
const updateCategories = (categories: any) => {
    return instance.put(`/categories/${categories._id}`, categories )   
}
const deleteCategories = (id: string ) => {
    return instance.delete(`/categories/` + id)   
}
const addCategories = (categories: any) => {
    return instance.post(`/categories`, categories)   
}

export {getAllCategories, getOneCategories, addCategories, deleteCategories, updateCategories }