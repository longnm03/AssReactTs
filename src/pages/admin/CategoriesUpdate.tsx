import React, { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { IProduct } from '../../interfaces/product'

type IProps = {
  category: any,
  onUpdateCategory: Function,
}
const CategoriesUpdate: React.FC<IProps> = ({ category, onUpdateCategory }) => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {register, handleSubmit, reset} = useForm()
  useEffect(() => {
    const currentCategory = category.find((category: any) => category._id == id )
    reset(currentCategory)
    console.log(currentCategory);
  }, [category])
  const onHandleSubmit = (data: any) => {
    onUpdateCategory(data)
    navigate("/admin/categories")
    window.location.reload()
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <input type='text' {...register('name')} />
          <button>Update</button>
        </form>
    </div>
  )
}

export default CategoriesUpdate