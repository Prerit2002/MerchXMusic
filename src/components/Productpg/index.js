import {useState , useEffect} from "react";
import "./productpg.css";
// import product from "./image 23.svg";
// import logo from  "./logo.svg"

function ProductPg({favourite , buyProduct, buyMM , coins , products}) {
    const fav = localStorage.getItem("favourites");
  const ids = window.location.pathname.split("/");
  const id= ids[2]
  const [product , setProduct] = useState(null);
  const [quantity , setQuantity] = useState(null);
  useEffect(() => {
    if(id !== undefined){
      const product = products?.find(product => product.Id.toString() === id)
      setProduct(product)
    }
  },[products])

  if (fav.length > 0){
      console.log(fav)
  }
    return (
        <div className="container-fluid singleProduct mb-5">
            <div className="row justify-content-center">
                <div className="col-5 productImg ps-5">
                    <img style={{width: '80%', height: '90%'}}  src={`https://ipfs.infura.io/ipfs/${product?.hash}`} alt="product"></img>
                </div>
                <div className="col-5 pt-4">
                    <div className="productType">{product?.name} </div>
                    <div className="product">By {product?.sellername} {fav?.includes(product?.sellername) ?  <p className={" "}> &#9829;  </p> : null} </div>
                    <div className="d-flex">
                        <div className="mt-3   productCost d-flex ">
                        {/* {window.web3.utils.fromWei(product?.price?.toString(), "Ether")}{" "}MATIC */}
                        { fav.includes(product?.sellername) ? <> <h1 style={{marginRight:"1rem",textDecoration:"line-through"}} className="productCost">{product?.price?.toString() / 1000000000000000000} </h1>  { 9*(product?.price?.toString() / 10000000000000000000) } MATIC </>  : <> {product?.price?.toString() / 1000000000000000000} MATIC   </>  }
                        {/* {product?.price?.toString() / 1000000000000000000} MATIC */}
                        </div>
                        <div className="producttokens mt-4">
                            <span className="tokenCredits ms-2">10 MM</span>
                            {/* <img className="tokenImg" src={logo}></img> */}
                        </div>
                    </div>
                    <div>
                      <form className="d-flex">
                        <h4 className="mt-3 pr-2" style={{color: "white"}}>Select Quantity</h4>
                        <input className="counter " type="number" onChange={(e) => {
                            e.preventDefault();
                            console.log(e.target.value)
                            setQuantity(e.target.value)
                        }} />
                      </form>
                    </div>
                    <div className="mt-4 ms-1">
                        <button onClick={(e) => {
                            e.preventDefault(); 
                            if(fav.includes(product?.sellername)){
                                buyProduct(product.Id,quantity,0.9*product.price*quantity)

                            }else{
                                buyProduct(product.Id,quantity,product.price*quantity)
                            }
                            
                        }} className="buyButton ps-2 pe-2 pt-1 pb-1">Buy Now</button>
                        { coins >= 10 ? 
                        <>
                        <p style={{ color: "white" }}>
                        OR
                        </p>
                       
                         <button onClick={(e) => {
                             console.log(quantity)
                            e.preventDefault(); 
                            buyMM(product.Id,quantity)
                        }} className="buyButton ps-2 pe-2 pt-1 pb-1">Buy With MM</button>
                        </>
                        
                    :null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductPg;