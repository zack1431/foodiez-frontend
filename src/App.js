// import logo from './logo.svg';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import DashBoard from './components/DashBoard';
import CategoryList from './components/categories/category_list';
import ProductList from './components/products/product_list';
import Order from './components/orders/order';
import OrderList from './components/orders/order-list';
import Login from './components/login/login';
import {useState,createContext,useEffect,useCallback} from 'react';
import axios from 'axios';


export const UserContext = createContext()

function App() {
  let [token,setToken] = useState('');
  let [isLoggedIn,setLogin] = useState(false)
  let [catData,setCatData] = useState([]);
  let [proData,setProducts] = useState([]);
  let [opOrder,setPreparedOrder] = useState([]);
  let [admin,setAdmin] = useState();

  const BaseUrl = "https://foodiez.onrender.com";
//  category list
  const getData = useCallback(() =>{
    axios.get(
      BaseUrl+'/food/categories',
      {headers: {
          "authorization" : "bearer "+localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
        if(response.data.statusCode === 200){
          var resp = response.data.resp;
          setCatData(resp)
        }
        else
        {
          setLogin(false)
        }
      },
      (error) => {
        console.log(error)
      }
    );
  },[]) 


  // product list
  const getProducts = useCallback(() =>{
    axios.get(
      BaseUrl+'/food/products',
      {headers: {
          "authorization" : "bearer "+localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
        if(response.data.statusCode === 200){
          var resp = response.data.dataResp;
          setProducts(resp)
        }
        else
        {
          setLogin(false)
        }
      },
      (error) => {
        console.log(error)
      }
    );
  },[]) 
  /*refresh side effect */
  useEffect(() =>{
    var temp = localStorage.getItem('token');
    if(token !== '' || (temp !== null && temp !== '')){
      setToken(localStorage.getItem('token'));
      setLogin(true)
      getData();
      getProducts();
    }
    else
    {
      setLogin(false);
    }
  },[token,getData,getProducts])

  function GetLogin(){
    return <>
      <UserContext.Provider value={{token,setToken,setAdmin}}>
        <Login/>
      </UserContext.Provider>
    </>
  }
  function Logged(){
    return <>
      <div id="wrapper">
      <BrowserRouter>
        <SideBar />
        <div id="content">
          <UserContext.Provider value={{token,setToken,admin,setLogin,opOrder,setPreparedOrder}}>
            <NavBar/>
            <Routes>
              <Route path="/" element={<DashBoard/>}/>
              <Route path="*" element={<Navigate to='/'/>}/>
              <Route path="/categories" element={<CategoryList data={catData}/>}/>
              <Route path="/products" element={<ProductList data={proData}/>}/>
              <Route path="/order" element={<Order data={{proData,catData}}/>}/>
              <Route path="/orderlist" element={<OrderList/>}/>
            </Routes>
          </UserContext.Provider>
        </div>
      
      </BrowserRouter>
    </div>
    </>
  }

  return  <>
    {
    isLoggedIn ? <Logged/> : <GetLogin/>
    }
  </>
  
}
/* <Route path="/adduser" element={<CreateUser data={{user,setUser}}/>}/>
            <Route path='/edit-user/:id' element = {<EditUser data={{user,setUser}}/>}/>
            <Route path="/add-mentor" element={<AddMentor />}/>
            <Route path='/edit-mentor/:id' element = {<EditMentor data={{user,setUser}}/>}/>
            <Route path="/list-mentor" element={<ListMentor/>}/>
            
            <Route path="/add-student" element={<AddStudent />}/>
            <Route path='/edit-student/:id' element = {<EditStudent data={{student,setStudent}}/>}/>
            <Route path="/list-student" element={<ListStudent/>}/>
            <Route path="/assign" element={<AssignMulti />}/> */
export default App;
