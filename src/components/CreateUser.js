import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'


function CreateUser(props){
	console.log(props)
  let [firstName,setFName] = useState("")
  let [lastName,setLName] = useState("")
  let [email,setEmail] = useState("")
  let [dob,setDOB] = useState("")
  let [mobile,setMobile] = useState("")
  let [location,setLocation] = useState("")
  let navigate = useNavigate()

  let handleSubmit = ()=>{
    let data = {
      firstName,
      lastName,
      email,
      dob,
      mobile,
      location
    }
    let user = [...props.data.user]
    user.push(data)
    props.data.setUser(user)
    navigate('/')
    
  }
	return (
		<div className=" p-4">
			<form className="p-2 row">
			  <div className="mb-3 col-md-4">
			    <label  className="form-label">First Name</label>
			    <input type="text" className="d-block form-control" placeholder="Enter First Name" onChange={(e)=>setFName(e.target.value)} />
			  </div>
			  <div className="mb-3 col-md-4">
			    <label className="form-label">Last Name</label>
			    <input type="text" className="d-block form-control" placeholder="Enter Last Name" onChange={(e)=>setLName(e.target.value)}/>
			  </div>
			  <div className="mb-3 col-md-4">
		        <label>Email</label>
		        <input type="email" className="d-block form-control" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
		      </div>

		      <div className="mb-3 col-md-4">
		        <label>Mobile</label>
		        <input type="text" className="d-block form-control" placeholder="Enter Mobile" onChange={(e)=>setMobile(e.target.value)}/>
		      </div>

		      <div className="mb-3 col-md-4">
		        <label>DOB</label>
		        <input type="date" className="d-block form-control" placeholder="dd-mm-yy" onChange={(e)=>setDOB(e.target.value)}/>
		      </div>

		      <div className="mb-3 col-md-4">
		        <label>Location</label>
		        <input type="text" className="d-block form-control" placeholder="Enter Location" onChange={(e)=>setLocation(e.target.value)}/>
		      </div>
			  <button type="submit" className="btn btn-primary ml-3 p-2"  onClick={()=>handleSubmit()}>Submit</button>
			</form>
		</div>
	)
}

export default CreateUser;