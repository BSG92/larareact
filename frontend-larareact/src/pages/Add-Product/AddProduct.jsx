import React, { useState } from 'react'
import Header from '../Header/Header'
import './add_product.css'

const AddProduct = () => {

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [file, setFile] = useState();

  async function addProduct() {
    // console.log(name,description,price,file);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file_name', file);

    let result = await fetch("http://localhost:8000/api/add_product",
    {
      method: 'POST',
      body: formData
    });

    alert("Product Added");
  }

  return (
    <div>
      <Header />
      <br />
      <div className="container">
        <h2>Add Product</h2>
      </div>
      <div className="container">
        <div className="col-sm-6 offset-sm-3 form-elements">
          <input type="text" className='form-control'placeholder='Name' 
            onChange={(e) => setName(e.target.value)} />
          <input type="text" className='form-control'placeholder='Description' 
            onChange={(e) => setDescription(e.target.value)} />
          <input type="text" className='form-control'placeholder='Price' 
            onChange={(e) => setPrice(e.target.value)} />
          <input type="file" className='form-control'
            onChange={(e) => setFile(e.target.files[0])} />

          <button className='btn btn-primary' onClick={addProduct}>Add Product</button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct