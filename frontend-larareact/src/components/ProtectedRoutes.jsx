import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {

    let navigate = useNavigate();

    useEffect (() => {
        if(!localStorage.getItem('user-info')){
            navigate('/', {replace:true});
        }
    })

    let Component = props.component;
  return (
      <Component />
  )
}

export default ProtectedRoutes