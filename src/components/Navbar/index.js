import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
// import logo from  "./logo.svg"

function Navbar({users , account}) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="mxm" href="#">MxM</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <div className="tokens">
                                {/* <img className="tokenImg" src={logo}></img> */}
                                <span className="tokenCredits">50</span>
                            </div>
                        </div>
                        <form className="d-flex ">
                            <button className="artistName" onClick={() => {
                                 window.location.href = "/signup";
                            }}>Sign Up</button>
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