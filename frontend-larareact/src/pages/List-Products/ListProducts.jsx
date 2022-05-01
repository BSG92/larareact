import React, {useState, useEffect} from 'react'
import './listproducts.css'
import Header from '../Header/Header'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const ListProducts = () => {

    const  [data, setData] = useState([]);

    useEffect(() => {
        // let result = await fetch('http://localhost:8000/api/list_product');
        // result = await result.json();
        // console.log(resultJSON);

        axios.get("http://localhost:8000/api/list_product")
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        // async function fetchData(){
        //     let result = await fetch("http://localhost:8000/api/list_product");
        //     result = await result.json();
        //     setData(result);
        //     // console.log("The results" , result);
        // }
        // fetchData();

        // The below console.log will not work here because the process of retrieval is asynchronous.
        // So the data array might be empty during the console.log
        // console.log("The Data array" , data);
    }, []); // <--- this empty [] will stop fatching data continuously (without it an infinite loop of data fetching will happen)

  return (
    <div>
        <Header />
        
        <div className="container">
            <h2>Products</h2>
            <br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Image</td>
                        <td>Description</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        // Object.keys(data).map((item, id) => 
                        //     <tr>
                        //         <td>s</td>
                        //         <td>sdf</td>
                        //         <td>fdsf</td>
                        //         <td>cscc</td>
                        //         <td>gfg</td>
                        //     </tr>
                        // ) 

                        // data.map((item, id) =>
                        //     <tr>
                        //         <td>s</td>
                        //         <td>sdf</td>
                        //         <td>fdsf</td>
                        //         <td>cscc</td>
                        //         <td>gfg</td>
                        //     </tr>
                        // )
                    }

                    {
                        data.map(product => 
                            <tr key={product.id}>
                                 <td>{product.id}</td>
                                 <td>{product.name}</td>
                                 <td>{product.price}</td>
                                 <td><img src={"http://localhost:8000/"+product.file_path} alt="loading error"/></td>
                                 <td>{product.description}</td>
                             </tr>
                            )
                    }
                    {/* {console.log("Pure data", data)} */}
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default ListProducts