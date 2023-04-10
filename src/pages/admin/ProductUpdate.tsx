import React, { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { IProduct } from '../../interfaces/product'

type IProps = {
  products: IProduct[],
  onUpdate: Function,
}
const ProductUpdate: React.FC<IProps> = ({ products, onUpdate }) => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {register, handleSubmit, reset} = useForm()
  useEffect(() => {
    const currentProduct = products.find((product:IProduct) => product._id == id )
    reset(currentProduct)
    console.log(currentProduct);
  }, [products])
  const onHandleSubmit = (data: any) => {
    onUpdate(data)
    navigate("/admin/products")
    window.location.reload()
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <input type='text' {...register('name')} />
          <input type='number' {...register('price')} />
          <button>Update</button>

        </form>
    </div>
  )
}

export default ProductUpdate