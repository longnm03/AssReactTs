import { useEffect, useState } from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import { addProducts, deleteProducts, getAllProducts, updateProducts } from './api/product'
import HomePage from './pages/HomePage'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/ProductDetail'
import ProductManagement from './pages/admin/ProductManagement'
import Dashboarch from './pages/admin/Dashboarch'
import AdminPage from './components/adminLayout'
import { IProduct } from './interfaces/product'
import ProductUpdate from './pages/admin/ProductUpdate'
import ProductAdd from './pages/admin/ProductAdd'
import AddProductPage from './pages/admin/ProductAdd'
import { signin, signup } from './api/auth'
import { IAuth } from './interfaces/auth'
import SignInPage from './pages/Signin'
import SignUpPage from './pages/Signup'
import Uploads from './pages/admin/Upload'
import rootLayoutPage from './components/rootLayout'
import UserLayoutPage from './components/rootLayout'
import CategoriesManagement from './pages/admin/CategoriesManagement'
import { addCategories, deleteCategories, getAllCategories, updateCategories } from './api/categories'
import CategoriesUpdate from './pages/admin/CategoriesUpdate'
import AddCategoriesPage from './pages/admin/CategoriesAdd'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategories] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const {data} = await getAllProducts()
        setProducts(data.data)
      } catch (error) {
      }
    })()
  }, [])
  useEffect(() => {
    (async () => {
      try {
        const {data} = await getAllCategories()
        setCategories(data)
        
      } catch (error) {
      }
    })()
  }, [])
  const onHandleRemove = (id: string) => {    
    deleteProducts(id).then(() =>
    setProducts(products.filter((item:IProduct) => item._id !== id)))
  }
  const onHandleUpdate = (product:IProduct) => {
    updateProducts(product)
  } 
  const onHandleAdd = (product: IProduct) => {
    addProducts(product).then(() => getAllProducts().then(({ data }) => setProducts(data)))
  }
  const onHandleSubmitSignUp = (data: IAuth) => {
    signup(data)
  }
  const onHandleRemoveCategories = (id: string) => {
    deleteCategories(id).then(() =>
    setCategories(category.filter((item: any) => item._id !== id)))
  }
  const onHandleUpdateCategory = (data: any) => {
    updateCategories(data)
  }
  const onHandleAddCategories = (category: any) => {
    addCategories(category).then(() => getAllCategories().then(({ data }) => setCategories(data)))

  }
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<UserLayoutPage />} >
            <Route path='signup' element={<SignUpPage onSubmit={onHandleSubmitSignUp}/>} />
            <Route path='signin' element={<SignInPage />} />
            <Route index element={<HomePage />} />
            <Route path='/contact' element={"Contact"} />
              <Route path='/products'>
              <Route  index element={<ProductPage products={products} />} />
              <Route  path=':id' element={<ProductDetailPage />} />
              </Route>
          </Route>
          <Route path='/admin' element={<AdminPage/>}>
            <Route path='upload'   element={<Uploads/>}/>
            <Route index element={<Dashboarch />} />
            <Route path='products'>
              <Route index element={<ProductManagement products={products} onRemove={onHandleRemove} />} />
                <Route path=':id/update' element={<ProductUpdate onUpdate={onHandleUpdate} products={products} />} />
                <Route path='add' element={<AddProductPage  onAdd={onHandleAdd}/>} />
            </Route>
            <Route path='categories'>
                <Route index element={<CategoriesManagement category={category} onRemoveCategory={onHandleRemoveCategories}/>} />
                <Route path=':id/update' element={<CategoriesUpdate onUpdateCategory={onHandleUpdateCategory} category={category} />} />
                <Route path='add' element={<AddCategoriesPage  onAddCategory={onHandleAddCategories}/>} />
            </Route>
          </Route>
      </Routes>
    </div>
  )
}
export default App
