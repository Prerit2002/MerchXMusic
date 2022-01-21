import React from "react";
import Productpg from "./Productpg";
import "./products.css";
function Products({ products }) {
  return (
    <div className="products p-5">
      {products.map((product) => {
        return (
          <div onClick={() => {
            window.location.href = `/product/${product.Id.toString()}`;
          }}>
            <img
              className="productimg"
              src={`https://ipfs.infura.io/ipfs/${product.hash}`}
              alt="profile"
            />
            <h1 style={{ textAlign: "center" }}>{product.name}</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginRight: "10px",
              }}
            >
              <h5>
                {window.web3.utils.fromWei(product.price.toString(), "Ether")}{" "}
                MATIC
              </h5>
              <h5>{product.quantity.toString()} Available</h5>
            </div>
          </div>
          // <div >
          //     <Productpg product={product}/>
          // </div>
        );
      })}
    </div>
  );
}

export default Products;
