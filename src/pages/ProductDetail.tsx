import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../api/product'
import { IProduct } from '../interfaces/product'


const ProductDetailPage  =   () => {
    const  { id }  =  useParams()
    console.log(id);
    const [product, setProduct] = useState<IProduct>()
    useEffect( ()=> {
         getOneProduct(String(id)).then(({data}) => setProduct(data))
         console.log(product);
    }, [])
  return (
    <div><h1>Product Page</h1>
    <h1>{product?.name}</h1>
    <h1>{product?.price}</h1>
    </div>
  )
}

export default ProductDetailPage