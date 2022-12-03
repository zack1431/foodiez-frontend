import {Link} from "react-router-dom";

function SideBar(){
	return (
		<div>
        	<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Foodiez <sup>v1.0</sup></div>
            </a>

            
            <hr className="sidebar-divider my-0" />

           
            <li className="nav-item active">
                <Link to="/" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            {/*<li className="nav-item active">
                <Link to="/adduser">
                    <a className="nav-link" href="index.html">
                    <i className="fas fa-user"></i>
                    <span>Add User</span></a>
                </Link>
            </li>*/}

            
            <hr className="sidebar-divider" />


            {/*Categories*/}
            <li className="nav-item active">
                <a className="nav-link collapsed" href="!#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <span>Categories</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        
                        <Link to="/categories" className="collapse-item">
                            Category List
                        </Link>
                    </div>
                </div>
            </li>

            {/*products*/}
            <li className="nav-item active">
                <a className="nav-link collapsed" href="!#" data-toggle="collapse" data-target="#collapse3"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-pizza-slice"></i>
                    <span>Products</span>
                </a>
                <div id="collapse3" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        
                        <Link to="/products" className="collapse-item">
                            Product List
                        </Link>
                    </div>
                </div>
            </li>

            {/*orders*/}
            <li className="nav-item active">
                <a className="nav-link collapsed" href="!#" data-toggle="collapse" data-target="#collapse4"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-utensils"></i>
                    <span>Orders</span>
                </a>
                <div id="collapse4" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        
                        <Link to="/order" className="collapse-item">
                            Add Order
                        </Link>
                        <Link to="/orderlist" className="collapse-item">
                            Order List
                        </Link>
                    </div>
                </div>
            </li>
            <hr className="sidebar-divider d-none d-md-block"/>

        	</ul>
		</div>
	)
}

export default SideBar;