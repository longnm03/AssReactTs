import React, { useEffect, useState } from 'react'
import { IProduct } from '../interfaces/product'
import { Link } from 'react-router-dom'
import "../asset/products.css"
type IProps = {
    products: IProduct[]
}

const ProductPage = (props: IProps) => {
    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
        setData(props.products)
        console.log(props.products);
        
    }, [props])
  return (
    <div className="product-page-container">
      <h1>ProductPage</h1>
      {data.map((product) => {
        return (
          <div className="product-item" key={product._id}>
          <a href={`/products/${product._id}`} className="product-link">
              <div className="product-item">
                <img src={product.images} alt={product.name} />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price}</p>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  )
}

export default ProductPage