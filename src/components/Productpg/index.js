import {useState , useEffect} from "react";
import "./productpg.css";
// import product from "./image 23.svg";
// import logo from  "./logo.svg"

function ProductPg({buyProduct , products}) {
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
  console.log(product)
    return (
        <div className="container-fluid singleProduct mb-5">
            <div className="row justify-content-center">
                <div className="col-5 productImg ps-5">
                    <img style={{width: '80%', height: '90%'}}  src={`https://ipfs.infura.io/ipfs/${product?.hash}`} alt="product"></img>
                </div>
                <div className="col-5 pt-4">
                    <div className="productType">{product?.name} </div>
                    <div className="product">By {product?.sellername}</div>
                    <div className="d-flex">
                        <div className="mt-3   productCost d-flex ">
                        {/* {window.web3.utils.fromWei(product?.price?.toString(), "Ether")}{" "}MATIC */}
                        {product?.price?.toString() / 1000000000000000000} MATIC
                        </div>
                        <div className="producttokens mt-4">
                            <span className="tokenCredits ms-2">50</span>
                            {/* <img className="tokenImg" src={logo}></img> */}
                        </div>
                    </div>
                    <div>
                      <form>
                        <input type="number" onChange={(e) => {
                            e.preventDefault();
                            setQuantity(e.target.value)
                        }} />
                      </form>
                    </div>
                    <div className="mt-4 ms-1">
                        <button onClick={(e) => {
                            e.preventDefault(); 
                            buyProduct(product.Id,quantity,product.price*quantity)
                        }} className="buyButton ps-2 pe-2 pt-1 pb-1">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductPg;