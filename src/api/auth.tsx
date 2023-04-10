import instance from "./instance";

const signup = (data: any) => {
    return instance.post(`/signup`, data)   
}
const signin = (data: any) => {
    return instance.post(`/signin`, data)   
}
export {signup, signin}