import {useState , useEffect} from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import {Link} from 'react-router-dom'
// import logo from  "./logo.svg"

function Navbar({coins}) {
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="mxm" href="#">MxM</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h1 className="heading">{coins} MM</h1>
                    {/* <button className="d-flex" style={{width:"200px",display: "flex"}}>{coins} MM </button> */}
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                   
                        {/* <div className="navbar-nav">
                            <div className="tokens">
                                <img className="tokenImg" src={logo}></img>
                                <span className="tokenCredits">50</span>
                            </div>
                        </div> */}
                        <form className="d-flex ">
                            <Link to="/addproduct">
                            <button className="artistName" onClick={() => {
                                 window.location.href = "/addproduct";
                            }}>Add Product</button>

                            </Link>
                        
                            <Link to="/signup">
                            <button className="artistName" >Sign Up</button>
                            </Link>
                           
                           
                            
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn search" type="submit">Search</button> */}
                        </form>
                    </div>

                </div>
            </nav>
        </div>
    )
}
export default Navbar;