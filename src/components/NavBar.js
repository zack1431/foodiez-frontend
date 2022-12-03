
import {useNavigate} from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import {UserContext} from './../App'
import './../App.css'
import axios from 'axios';
function NabBar(){
    let [opOrder,setPreparedOrder] = useState([]);
    const BaseUrl = "https://foodiez.onrender.com";
    const context = useContext(UserContext);
    context.admin = context.admin !== undefined ? context.admin.split('@')[0] : 'Admin'
    let navigate = useNavigate()
    let handleLogout = async (e) =>{
        e.preventDefault();
        localStorage.setItem('token','');
        context.setToken('');
        navigate('/login')
    }


    useEffect(() =>{
        const getOrderToken = () => {
            axios.get(
                BaseUrl+'/food/Preparing',
                {headers: {
                    "authorization" : "bearer "+localStorage.getItem('token')
                  }
                }
              )
              .then((response) => {
                  if(response.data.statusCode === 200){
                    var resp = response.data.users;
                    setPreparedOrder(resp)
                  }
                },
                (error) => {
                  console.log(error)
                }
              );
        };
        getOrderToken()
    },[])
    
    function OrderTokenHtml(){
        if(context.opOrder.length > 0){
            return <>
               {
                
                    context.opOrder.map((val,i) =>
                     <span key={i}>
                         {val.order_token},
                     </span>
                    )
               }
            </>
        }
        else if(opOrder.length > 0){
            return <>
                {
                    opOrder.map((val,i) =>
                    <span key={i}>
                        {val.order_token},
                    </span>
                   )
                }
            </>
        }
        else if(context.opOrder.length === 0 || opOrder.length === 0)
        {
            return <>
                <span>No order in preparing queue</span>
            </>
        }
    }
    
	return (
		<div>
			 
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                     
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    

                     
                    <ul className="navbar-nav ml-auto">
                         <div className='fw-b p-20 token'>
                            <span>Preparing order for token no:</span>
                            {
                                <OrderTokenHtml/>
                            }
                         </div>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="!#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                             
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    Alerts Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 12, 2019</div>
                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="!#">Show All Alerts</a>
                            </div>
                        </li>

                         
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="!#" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                 
                                <span className="badge badge-danger badge-counter">7</span>
                            </a>
                             
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">
                                    Message Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                            alt="1"/>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                            problem I've been having.</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                            alt="2"/>
                                        <div className="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">I have the photos that you ordered last month, how
                                            would you like them sent to you?</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                            alt="3"/>
                                        <div className="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Last month's report looks great, I am very happy with
                                            the progress so far, keep up the good work!</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="!#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                            alt="4"/>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                            told me that people say this to all dogs, even if they aren't good...</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="!#">Read More Messages</a>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                          
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="!#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                    {
                                        context.admin
                                    }
                                </span>
                                <img className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg" alt="profile"/>
                            </a>
                              
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                {/* <a className="dropdown-item" href="!#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <a className="dropdown-item" href="!#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </a>
                                <a className="dropdown-item" href="!#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a> */}
                                <a className="dropdown-item" href="!#" data-toggle="modal" data-target="#logoutModal" onClick={(e)=>handleLogout(e)}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
		</div>
	)
}

export default NabBar;