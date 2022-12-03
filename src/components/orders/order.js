import './order.css'
import {useState} from 'react'
import axios from 'axios';
import { useContext } from "react";
import {UserContext} from './../../App'
function Order(props){
    
    const BaseUrl = "https://foodiez.onrender.com";
    const context = useContext(UserContext);
    let [filterData,setFilterData] = useState([]);
    let [orderData,setOrderData] = useState([]);
    let [totalAmount,setTotal] = useState(0);

    // get last order token
    let getLastOrder = () => {
        let promise = new Promise((resolve,reject) =>{
            axios.get(
                BaseUrl+'/food/lastOrder',
                {headers: {
                    "authorization" : "bearer "+localStorage.getItem('token')
                  }
                }
              )
              .then((response) => {
                  if(response.data.statusCode === 200){
                    var resp = response.data.users,obj;
                    if(resp.length > 0){
                        let tempArr = resp[0].order_token.split('-')
                        let num = parseInt(tempArr[1]) + 1
                        let newStr = tempArr[0]+'-'+ num
                        obj = {
                            flag:true,
                            tokenStr:newStr
                        }
                    }
                    else
                    {
                        obj = {
                            flag:true,
                            tokenStr:'token-1001'
                        }
                    }
                    resolve(obj)
                  }
                  else
                  {
                    context.setLogin(false)
                  }
                },
                (error) => {
                  console.log(error)
                }
              );
        })
        return promise;
    }


    let filterProduct = (obj) =>{
        var temp = props.data.proData.filter(rec => obj.ct_id === rec.product_ct_id)
        if(temp.length > 0){
            setFilterData(temp);
        }
    }

    let orderProduct = (val) =>{
        var temp = [...orderData]
        var index;
        if(temp.length > 0){
            var temp3 = temp.filter(rec => rec._id === val._id);
            if(temp3.length > 0){
                temp3[0].product_qty++;
                temp3[0].totalPrice = temp[0].product_qty * temp[0].product_price;
                index = temp.findIndex(rec => rec._id === val._id)
                temp.splice(index,1);
                temp = temp.concat(temp3);
            }
            else
            {
                val['product_qty'] = 1;
                val['totalPrice'] = val['product_qty'] * val['product_price'];
                temp.push(val)
            }
        }
        else
        {
            val['product_qty'] = 1;
            val['totalPrice'] = val['product_qty'] * val['product_price'];
            temp.push(val);
        }
        var count = temp.reduce(function (acc, obj) { return acc + obj.totalPrice; }, 0);
        setTotal(count);
        setOrderData(temp);

    }


    let subQty = (val) =>{
        if(val.product_qty > 1){
            let temp = [...orderData]
            temp.forEach(elem =>{
                if(elem._id === val._id){
                    elem.product_qty--;
                    elem.totalPrice = val.product_qty * val.product_price;
                }
            })
            var count = temp.reduce(function (acc, obj) { return acc + obj.totalPrice; }, 0);
            setTotal(count);
            setOrderData(temp) 
        }
    }

    let addQty = (val) =>{
        var temp = [...orderData]
        temp.forEach(elem =>{
            if(elem._id === val._id){
                elem.product_qty++;
                elem.totalPrice = val.product_qty * val.product_price;
            }
        })
        var count = temp.reduce(function (acc, obj) { return acc + obj.totalPrice; }, 0);
        setTotal(count);
        setOrderData(temp)
    }

    /*confirm order */
    let orderConfirm = () =>{
        getLastOrder().then(res =>{
            var reqObj = {
                order_token:res.tokenStr,
                order_status:'Placed',
                order_total:totalAmount,
                productArr:JSON.stringify(orderData)
            }
            axios.post(
                BaseUrl+'/food/createOrder',
                reqObj,
                {headers: {
                    "authorization" : "bearer "+localStorage.getItem('token')
                  }
                }
              )
              .then((response) => {
                  if(response.data.statusCode === 200){
                    setOrderData([]);
                    setFilterData([]);
                  }
                  else
                  {
                    context.setLogin(false)
                  }
                },
                (error) => {
                  console.log(error)
                }
              );
        });
    }

    function OrderProducts(){
        if(orderData.length > 0){
            return (
                <>
                    <div className="p-2 overflow">
                        <table className="table">
                            <thead>
                            <tr className='bg-primary text-white'>
                                <th scope="col">#</th>
                                <th>Product Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Description</th>
                                <th>Category Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr> 
                            </thead>
                            <tbody>
                            {
                                orderData.map((val,i) =>
                                    <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td><img src={val.product_image} alt={'image'+i} width='30' height="30"/></td>
                                        <td>{val.product_name}</td>
                                        <td>{val.product_description}</td>
                                        <td>{val.category_name}</td>
                                        <td><button className='bg-primary text-white mr-2 fw-b border-none ' onClick={() => subQty(val)}><i className="fas fa-minus"></i></button><span className='fw-b'>{val.product_qty}</span><button className='bg-primary text-white ml-2 fw-b border-none' onClick={() => addQty(val)}><i className="fas fa-plus"></i></button></td>
                                        <td>{val.totalPrice}</td>
                                    </tr>
                                ) 
                            }
                            
                            </tbody>
                        </table>
                    </div>
                    
                    <div className='stickybtm bg-dark p-2'>
                        <div>
                            <button className='pl-2 fw-b' onClick={() => orderConfirm()}>
                                Confirm Order
                            </button>

                            <span className='flt-r fw-b total'>Total: Rs.{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </>
            )
        }
        else
        {
            return '';
        }
    }
    
    function CatProduct(){
        if(filterData.length === 0){
            return '';
        }
        else
        {
            return (
                <>
                    <div className='pt-5'>Products:</div>
                    
                    <div className='d-flex pt-1'> 
                        
                        {
                            
                            filterData.map((val,i) => <div className='img_wrapper' key={i} onClick={()=>orderProduct(val)}><img className='img-round' width='100' height='100' src={val.product_image} alt={i}/><div className='pt-1'>{val.product_name}</div><div className='pt-1'>Rs.{val.product_price.toFixed(2)}</div></div> )
                        }
                    </div>
                    <hr></hr>
                </>
            )
        }
    }

    return (
        <>
            <div className="category_wrapper inblock">
                {
                    props.data.catData.map((val,i) =>
                        <button className={`bg-primary p-2 ${i === 0 ? "bt-l":""} ${i === props.data.catData.length - 1 ? "bt-r":""}`} key={i} onClick={() => filterProduct(val)}>{val.category_name}</button>
                    )
                }
            </div>
            <div className="product_wrapper">
                {
                    <CatProduct/>
                }
            </div>
            <div className=''>
                {
                    <OrderProducts/>
                }
            </div>
        </>
    )
}

export default Order;