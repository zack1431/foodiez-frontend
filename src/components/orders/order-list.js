import {useEffect,useState} from 'react'
import axios from 'axios';
import './order.css'
import { useContext } from "react";
import {UserContext} from './../../App'
function OrderList(){
    // order list
    const BaseUrl = "https://foodiez.onrender.com";
  const context = useContext(UserContext);
    let [orderData,setOrderData] = useState([]);
    let [opData,setopData] = useState([]);
    let [showProduct,setShowProduct] = useState(false);
   

    useEffect(()=>{
        
            axios.get(
            BaseUrl+'/food/orderlist',
            {headers: {
                "authorization" : "bearer "+localStorage.getItem('token')
                }
            }
            )
            .then((response) => {
                if(response.data.statusCode === 200){
                var resp = response.data.users;
                    setOrderData(resp)
                }
            },
            (error) => {
                console.log(error)
            }
            );
    },[setOrderData])

    let getOrderedProduct = (val) =>{
        var reqObj = {
            order_token:val.order_token
        }
        axios.post(
            BaseUrl+'/food/productOrder',reqObj,
            {headers: {
                "authorization" : "bearer "+localStorage.getItem('token')
                }
            }
            )
            .then((response) => {
                if(response.data.statusCode === 200){
                var resp = response.data.users;
                    setopData(resp)
                    setShowProduct(true)
                }
            },
            (error) => {
                console.log(error)
            }
            );
    }

    // close popup

    let closePopup = () =>{
        setShowProduct(false);
    }

    // popup
    function Popup(){
        return (
            <>
                <div className='product-popup'>
                    <div className='closeIcon' onClick={() => closePopup()}><i className='fas fa-times'></i></div>
                    <h3>Ordered Product</h3>
                    <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"> Name</th>
                    <th scope="col"> Quantity</th>
                    <th> Price</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                    opData.length > 0 ? opData.map((val,i) =>
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{val.product_name}</td>
                            <td>{val.product_qty}</td>
                            <td>{val.product_price}</td>
                            <td>{val.totalPrice}</td>
                        </tr>
                    ) : ''
                }
                
                </tbody>
            </table>
                </div>
            </>
        )
    }

    // change in status
    const options = ['Placed', 'Preparing', 'Delivered', 'Rejected'];
    const onOptionChangeHandler = (event,val) => {
        var reqObj = {
            order_token:val.order_token,
            order_status:event.target.value
        }
        axios.post(
            BaseUrl+'/food/updateStatus',reqObj,
            {headers: {
                "authorization" : "bearer "+localStorage.getItem('token')
                }
            }
            )
            .then((response) => {
                if(response.data.statusCode === 200){
                    var resp = response.data.users;
                    setOrderData(resp)
                    var preparing = resp.filter(rec => rec.order_status === 'Preparing');
                    context.setPreparedOrder(preparing);
                }
            },
            (error) => {
                console.log(error)
            }
        );
    }

	return(
        <>
		<div className="p-2 overflow">
			<table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th>Order Token</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Order Total Price</th>
                    <th>Ordered Date</th>
                    <th>View Products</th>
                </tr>
                </thead>
                <tbody>
                {
                    orderData.length > 0 ? orderData.map((val,i) =>
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{val.order_token}</td>
                            <td>
                                <select onChange={(e) => onOptionChangeHandler(e,val)} value={val.order_status}>
                                    {options.map((option, index) => {
                                        return <option key={index} >
                                            {option}
                                        </option>
                                    })}
                                </select>
                            </td>
                            <td>{val.order_total}</td>
                            <td>{val.created_date}</td>
                            <td><div className='cursor' onClick={() => getOrderedProduct(val)}><i className='fas fa-eye'></i></div></td>
                        </tr>
                    ) : ''
                }
                
                </tbody>
            </table>
		</div>

          {
            showProduct ? <Popup/> : ''
          }
        
        </>
	)
}

export default OrderList;