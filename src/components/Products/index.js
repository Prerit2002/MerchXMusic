import {useState , useEffect} from "react";
import Productpg from "../Productpg";
import "./products.css";
function Products({ users , products }) {
  const ids = window.location.pathname.split("/");
  const id= ids[2]
  const [name , setName] = useState(null);
  console.log(users)
  useEffect(() => {
    if(id !== undefined && users?.length > 0){
      console.log(users)
      console.log(id)
      const user = users?.find(user => user.id.toString() === id)
      console.log(user)
      setName(user?.name)
     
    }

  }, [users])
  console.log(name)
  
  

  return (
    <div className="products p-5">
      {products?.map((product) => {
        return (
          <>
         
           { users?.length > 0 &&  name?.toLowerCase() === product.sellername.toLowerCase() ? (
            <div onClick={() => {
              window.location.href = `/product/${product.Id.toString()}`;
            }}>
              <img
                className="productimg"
                src={`https://ipfs.infura.io/ipfs/${product.hash}`}
                alt="profile"
              />
              <h1 style={{ textAlign: "center",color: "white" }}>{product.name}</h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginRight: "10px",
                }}
              >
                <h5 style={{color: "white"}}>
                  {window.web3.utils.fromWei(product.price.toString(), "Ether")}{" "}
                  MATIC
                </h5>
                <h5 style={{color: "white"}}>{product.quantity.toString()} Available</h5>
              </div>
            </div>

          ) : null  }
          
          </>
         
          
          // <div >
          //     <Productpg product={product}/>
          // </div>
        );
      })}
    </div>
  );
}

export default Products;
