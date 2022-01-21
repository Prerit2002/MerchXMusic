import React from 'react';

function Productpg({product}) {
  return (
    <div >
    <img className="productimg"
src={`https://ipfs.infura.io/ipfs/${product.hash}`}
alt="profile"
/>
<h1 style={{textAlign: 'center'}}>{product.name}</h1>
<div style={{display: 'flex', justifyContent: 'space-around',marginRight:"10px"}}>
<h5>{window.web3.utils.fromWei(product.price.toString(), "Ether")} MATIC</h5>
<h5>{product.quantity.toString()} {" "} Available</h5>
</div>

    


</div>
  )
}

export default Productpg;
