import React from "react";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className={"col col-md-3 "+ styles.respfooter}>
            <h3>
              {/* <img alt="icon" src={logo} />  */}
              Merch x Music
            </h3>
          </div>
          {/* Space */}
          <div className="col col-md-3"> </div>
   
        
        </div>
        <hr color="#2D396B" />
        <div className={ " row"} style={{display: "flex",justifyContent: "space-between"}}>
          <p className={"col-sm-3 "}>
            &copy;{new Date().getFullYear()} Merch x Music, Inc. All Rights
            Reserved
          </p>
          <p className={"col-sm-3 ml-auto "}>
           Made with &#9829; 
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;