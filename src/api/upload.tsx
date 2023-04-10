import instance from "./instance";

const upload = (data: any) => {
    return instance.post('images/upload' ,data)
}
export {upload}