import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {getUser } from "../Store/ActionCreators/UserActionCreators" 

export default function Login() {
    var [data,setdata]=useState({
        username:"",
        password:""
    })
    var users=useSelector((state)=>state.UserStateData)
    var dispatch=useDispatch()
    var navigate=useNavigate()
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setdata((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
      var user=users.find((item)=>item.username===data.username && item.password===data.password)
      if(user){
        localStorage.setItem("login",true)
        localStorage.setItem("name",user.name)
        localStorage.setItem("username",user.username)
        localStorage.setItem("userid",user.id)
        localStorage.setItem("role",user.role)
        if(user.role==="Admin")
        navigate("/admin-home")
        else
        navigate("/profile")
        }

      else
        alert("Invalid Username or Password !!!")
      
    }
    useEffect(()=>{
        dispatch(getUser())
    },[])
    return (
        <>
            <div className="hero-wrap hero-bread" style={{ backgroundImage: "url('assets/images/bg_6.jpg')" }}>
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9  text-center">
                            <div className="contianer-fluid w-100 my-5">
                                <div className='w-50 m-auto'>
                                    <h5 className='bg-secondary text-center text-light p-2'>Login Section</h5>
                                    <form onSubmit={postData}>
                                        <div className="mb-3">
                                            <input type="text" name='username' id='username'onChange={getData} placeholder='Enter Username' className='form-control' />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" name='password' id='password'onChange={getData} placeholder='Enter Password' className='form-control' />
                                        </div>
                                        <div className="mb-3">
                                            <button className='btn btn-secondary w-100 btn-lg'>Submit</button>
                                        </div>
                                    </form>
                                    <div className='d-flex justify-content-between'>
                                        <Link className='text-dark' to="#">Forget Password</Link>
                                        <Link className='text-dark' to="/signup">New User?Create a Free Account</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
