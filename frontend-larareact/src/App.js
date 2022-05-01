import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AddProduct from './pages/Add-Product/AddProduct'
import UpdateProduct from './pages/Update-Product/UpdateProduct'
import DeleteProduct from './pages/Delete-Product/DeleteProduct'

import ProtectedRoutes from './components/ProtectedRoutes';
import ListProducts from './pages/List-Products/ListProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ListProducts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/add-product' element={<AddProduct />} /> */}
        <Route path='/add-product' element={<ProtectedRoutes component={AddProduct} />} />
        <Route path='/update-product' element={<ProtectedRoutes component={UpdateProduct} />} />
        <Route path='/delete-product' element={<ProtectedRoutes component={DeleteProduct} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
