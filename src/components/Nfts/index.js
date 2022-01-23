import {useState,useEffect} from 'react';
import axios from 'axios'
function Nft({tokens , mineNft}) {
    const [data , setData] = useState([])
    useEffect(() => {
        tokens.map((token) => {
            axios.get(`https://ipfs.infura.io/ipfs/${token.hash}`).then((response) => {
                setData([...data,response.data])
            })
        })
    },[tokens])
    console.log(data)


  return (
      <div>
          <h1 style={{ color: "white" }}>Mint NFTS</h1>
          {data?.map((dataa,idx) => {
              return(
                  <div>
                      <img
                style={{width: '20%', height: '20%'}}
                className="productimg"
                src={`${dataa?.image}`}
                alt="profile"
              />
              <button className="btn btn-primary" onClick={(e) => {
                  e.preventDefault();
                    mineNft(`https://ipfs.infura.io/ipfs/${tokens[idx].hash}`)

              }}>Mint NFT</button>

                  </div>
                
              )
          })}

      </div>
  )
}

export default Nft;
