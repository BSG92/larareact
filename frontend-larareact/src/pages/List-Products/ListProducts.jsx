import React, {useState, useEffect} from 'react'
import './listproducts.css'
import Header from '../Header/Header'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const ListProducts = () => {

    const  [data, setData] = useState([]);
    const [user, setUser] = useState();

    function isUserLoggedIn(){
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('user-info'));
        }catch(e){
            console.error(e);
        }

        if (user) {
            setUser(1);
        }else{
            setUser(0);
        }
    }

    useEffect(() => {
        isUserLoggedIn();
        getData();

        // let result = await fetch('http://localhost:8000/api/list_product');
        // result = await result.json();
        // console.log(resultJSON);

    //    axios.get("http://localhost:8000/api/list_product")
    //         .then(res => {
    //             setData(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

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

    async function getData(){
        await axios.get("http://localhost:8000/api/list_product")
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    function deleteProduct(id) {
       axios.delete("http://localhost:8000/api/delete_product/"+id)
            .then(res => {
                getData();
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                        <td></td>
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
                                 {user ?
                                    <td><span type='button' className='btn btn-danger btn-sm'
                                    onClick={() => deleteProduct(product.id)}>Delete</span></td>
                                    :
                                    <td></td>
                                 }
                                    {/* <span type='button' className='btn btn-danger btn-sm'
                                    onClick={() => deleteProduct(product.id)}>Delete</span></td> */}
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