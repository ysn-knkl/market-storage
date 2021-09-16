import { useState } from 'react';
import FormComponent from './components/Form';
import ProductList from './components/ProductList';
import {addProduct, editHandler } from "./utils/function";
import {initialState} from "./utils/constant";
import { ToastContainer } from "react-toastify";


function App() {
  const [product, setProduct] = useState(initialState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(product?.id){
      editHandler(product);
    }else{
      addProduct(product);
    }
    setProduct(initialState);
  }

  const updateHandler = (item) => {
    setProduct({ ...item})
  }

  return (
    <div className="App">
      <FormComponent className="form" product={product} setProduct={setProduct} handleFormSubmit={handleFormSubmit}/>
      <ProductList className="product" updateHandler={updateHandler}/>
      <ToastContainer />
    </div>
  )
}

export default App;
