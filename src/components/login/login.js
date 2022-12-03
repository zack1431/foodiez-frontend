import React,{useState} from 'react';
// import {useNavigate} from 'react-router-dom'
import { useContext } from "react";
import {UserContext} from './../../App'
import './login.css'
import axios from 'axios';

function Login(){
    const context = useContext(UserContext);
    const BaseUrl = "https://foodiez.onrender.com";
    const mystyle = {
        position: "absolute",
        top: '15px',
        right: '45%',
        opacity:1
      };
    let [email,setEmail] = useState("")
    let [isValid,setValid] = useState(false)
    // let navigate = useNavigate();
    function IfValid(){
        return <>
                <div className="toast bg-danger" style={mystyle}>
                    <div className="toast-header">
                    <strong className="mr-auto">Alert</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="toast-body text-white">
                        Please enter valid email.
                    </div>
                </div>
        </>
    }
    
    let handleSubmit = async ()=>{
        
        if(email === ''){
            setValid(true)
            setTimeout(()=>{
                setValid(false)
            },2000)
            return;
        }
        if(email !== 'zakrshkh16@gmail.com'){
            setValid(true)
            setTimeout(()=>{
                setValid(false)
            },2000)
            return;
        }
       getUser().then(res =>{
        if(res !== '' && res !== undefined){
            localStorage.setItem('token', res.data);
            let token = res.data
            context.setToken(token)
            context.setAdmin(res.decodedToken.email)
        }
       })
    }

    async function getUser(){
        if(email !== ''){
          let response = await axios.post(BaseUrl+'/login',{email:email})
          return response.data
        }
      } 
      
    return(
        <>
            
            <div className='center-section'>
                {
                    isValid ? <IfValid/> : ''
                }    
                <div className="boxShadow p-4">
                    <form className="p-2 row">
                        <div className="mb-3 col">
                            <label>Email</label>
                            <div className='d-flex'>
                                <input type="email" autoFocus={true} className="d-block form-control emailInput" placeholder="" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                                
                        </div>
                    </form>

                    <div className="p-3 row d-flex">
                        <div className='align-item-center'>
                            <button type="submit" className="btn btn-success align-item-center  p-2"  onClick={()=>handleSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='footer mt-3'>
                    <span className='text-white text-center ml-5'>Copyright 2022-2023</span>
                </div>
            </div>
        </>
    )
}
export default Login;