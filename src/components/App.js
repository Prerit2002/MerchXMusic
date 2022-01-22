import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Products from './Products'
import Landing from './Landing'
import Navbar from './Navbar'
import Signup from './Signup'
import Footer from './Footer'
import ProductPg from "./Productpg";
import axios from 'axios'
import AddProduct from "./AddProduct"
import Nft from "./Nfts"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/ipfs/api/v0",
}); // leaving out the arguments will default to these values
// const { create } = require("ipfs-http-client");
// import * as IPFS from 'ipfs-core'

// const ipfs = IPFS.create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   path: "api/v0",
// });


function App() {

  // axios.get("https://top-user-spotify-api.herokuapp.com/login").then((result) => {
  //   axios.get("https://top-user-spotify-api.herokuapp.com/artists").then((result) => {
  //     console.log(result)
  //   })
  // })
  const [token, setToken] = useState();
  const [data , setData] = useState([]);
  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    console.log(code);
    // const code = window.location.href.split("?")[1].split("code=")[1];
    // console.log(code)
    if (code) {
      axios.get(`https://top-user-spotify-api.herokuapp.com/artists/${code}`)
      .then((response) => {
        // console.log(response.data.token)
        if (response.data !== []){
          setData(response.data)
          localStorage.setItem("favourites", JSON.stringify(response.data))
        }
        console.log(response);
        if (response.data.error !== "bad_code") {
          setToken(response.data.token);
        }
      });
    }
  });
  console.log(localStorage.getItem("favourites"))

  // console.log(data)
  // axios.get("http://localhost:4000/artists").then((result) => {
  //   console.log("spotify" ,result)
  // })
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [account, setAccount] = useState("");
  const [marketplaceContract, setMarketplace] = useState();
  const [buffer, setBuffer] = useState(null);
  const [hash, setHash] = useState("");
  const [receipts , setReceipt] = useState([])
  const [coins , setCoins] = useState()
  const [tokens , setTokens] = useState([]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  // axios.get("https://top-user-spotify-api.herokuapp.com/login").then(() => {
  //   axios.get("https://top-user-spotify-api.herokuapp.com/artists").then((result) => {
  //     console.log(result)
  //   })
  // })
  

  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      console.log(marketplace);
      setMarketplace(marketplace);

      // this.setState({marketplace})
      const productCount = await marketplace.methods.productcount().call();
      //  // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        setProducts((products) => [...products, product]);
        // setProducts( [...products, product])
      }
      const userCount = await marketplace.methods.usercount().call();
      // Load users
      for (i = 1; i <= userCount; i++) {
        const user = await marketplace.methods.user(i).call();

        setUsers((users) => [...users, user]);
        console.log(parseInt(user.coins))
        if(user.user === accounts[0]){
          setCoins(parseInt(user.coins))
        }
      }
      
      const receiptcount = await marketplace.methods.receiptcount().call();
      // Load users
      for (i = 1; i <= receiptcount; i++) {
        const receipt = await marketplace.methods.receipts(i).call();
        
        setReceipt((receipts) => [...receipts, receipt]);

        // setUsers((users) => [...users, receipt]);
      }

      const tokencount = await marketplace.methods.tokenuri().call();

      console.log("tokencount", tokencount)
      for (i = 1; i <= tokencount; i++) {
        const token = await marketplace.methods.tokens(i).call();
        console.log(token)
        setTokens((tokens) => [...tokens, token]);
      }


      // this.setState({loading:false})
      // console.log(products)
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }
  console.log("coins",coins)

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, []);

  const createUser = (name, email, artist , location) => {
    console.log(account);
    console.log("hash",hash)
    try {
      marketplaceContract.methods
        .createUser(name, email, hash, artist , location)
        .send({ from: account })
        .once("confirmation", (receipt) => {
          console.log(receipt);
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };
  const createProduct = (name, sellername, quantity, price) => {
    console.log(account);
    try {
      marketplaceContract.methods
        .createProduct(name, sellername, quantity, price, hash)
        .send({ from: account })
        .once("confirmation", (receipt) => {
          console.log(receipt);
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };
  const buyProduct = (productId , quantity,price) => {
    console.log(products[0]);
    try {
      marketplaceContract.methods
        .buy(productId,quantity)
        .send({ from: account,value:price})
        .once("receipt", (receipt) => {
          console.log(receipt);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const createToken = (e) => {
    e.preventDefault();
    try{
      marketplaceContract.methods.createToken(hash).send({from:account}).once("receipt", (receipt) => {
        console.log(receipt);
      })
    }catch (e) {
      console.log(e)
    }
  }

  const Capturefile =  (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      await setBuffer(Buffer.from(reader.result));
      await ipfs.add(Buffer.from(reader.result), (error, result) => {
        //  this.setState({hash: result[0].hash})
        if (error) {
          console.error(error);
          return;
        }
        setHash(result[0].hash);
        console.log(result[0].hash);
       
      });
    };
  };
  console.log("produts" , products)

  const mineNft = (uri) => {
    console.log(uri)
    marketplaceContract.methods.createCollectibles(uri).send({from:account}).once("receipt", (receipt) => {
      console.log(receipt);
    })
  }

  const addNft = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      await setBuffer(Buffer.from(reader.result));
      await ipfs.add(Buffer.from(reader.result), async (error, result) => {
        //  this.setState({hash: result[0].hash})
        if (error) {
          console.error(error);
          return;
        }
        setHash(result[0].hash);
        console.log(result[0].hash);
        const uploadedImageUrl = `https://ipfs.infura.io/ipfs/${result[0].hash}`;
      const metadata = {
        name: "example name",
        description: "example description",
        image: uploadedImageUrl,
      };
      const encodedJsonObject = Buffer.from(JSON.stringify(metadata));
      
      console.log(typeof(encodedJsonObject))
      const metadataRes = await ipfs.add(encodedJsonObject);
      console.log(metadataRes[0].hash)
      setHash(metadataRes[0].hash)
       
      });
      

    };

    
    // const url = await ipfs.add(file);
    // const uploadedImageUrl = `https://ipfs.infura.io/ipfs/${url?.path}`;

    //2 ADD Metadata to IPFS
   
    // const metaDataUrl = `https://ipfs.infura.io/ipfs/${metadataRes?.path}`;
    //   console.log(metaDataUrl);

     
    

  }

  const buyMM = (productId , quantity) => {
    try {
      marketplaceContract.methods
        .buyMM(productId,quantity)
        .send({ from: account})
        .once("receipt", (receipt) => {
          console.log(receipt);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // const addFile = async (e) => {
  //   e.preventDefault();
  //   console.log('submitting the form...');
  //   ipfs.add(buffer , (error,result) => {
  //     console.log('ipfs',result[0].hash)
  //   })
  // }
  console.log("")
  // console.log(https://ipfs.infura.io/ipfs/tokens[0])
  axios.get("https://ipfs.infura.io/ipfs/QmWmKKj3k7du4VoJXzAcWP6e1XqZVuFJXZiPKBT3fpbTXn").then((result) => [
    console.log(result)
  ])
  const clientID="67ef74a0a15d41d290e44732f6048ee6"
  const redirectURI="http://localhost:3000/"

  return (
    <div className="App">
      {/* <a href={`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&scope=user-read-private%20user-read-email%20user-top-read&redirect_uri=${redirectURI}`}>Login With Spotify</a> */}
      <Router>
      <Navbar coins={coins} />
        <Switch>
      
      
          <Route exact path="/">
          <Landing users={users} />
          </Route>
          <Route exact path="/artist/:id">
            <Products users={users} products={products} />
            </Route>
            <Route exact path="/product/:id">
            <ProductPg favourite={data} buyProduct={buyProduct} buyMM={buyMM} coins={coins} products={products} />
            </Route>
            <Route exact path="/addproduct">
            <AddProduct createProduct={createProduct} Capturefile={Capturefile}  />
            </Route>
            <Route exact path="/nft">
            <Nft tokens={tokens} mineNft={mineNft}/>
            </Route>
            <Route exact path="/signup">
            <Signup createUser={createUser} Capturefile={Capturefile} />
            </Route>
        </Switch>
      </Router>
      <Footer />
      
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hello");
          createUser("ed sheeran", "prerit715@gmail.com", hash, true);
        }}
      >
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="file" onChange={Capturefile} />
        <button>Create User</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hello");
          const a = 0.05;
          const price = window.web3.utils.toWei(a.toString(), "Ether");
          createProduct("Tshirt", "Prerit Rawtani", 5, price, hash);
        }}
      >
        <input type="text" placeholder="name" />
        <input type="text" placeholder="sellername" />
        <input type="text" placeholder="quantity" />
        <input type="text" placeholder="price" />
        <input type="file" onChange={Capturefile} />
        <button>Create Product</button>
      </form>
      <div>
        {users?.map((user, idx) => {
          return (
            <div>
              <h1>
                {user.name} {idx}
              </h1>
              <img
                src={`https://ipfs.infura.io/ipfs/${user.hash}`}
                alt="profile"
              />
            </div>
          );
        })}
      </div>
      {products?.map((product, idx) => {
        return (
          <div>
            <h1>{product.name}</h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                buyProduct(product.Id,2,product.price*2);
              }}
            >
              Buy
            </button>
          </div>
        );
      })}
      <Products products={products} /> */}
      {/* <form>
        <input type="file" onChange={addNft} />
        <button onClick={(e) => {
          e.preventDefault()
          createToken(e);


        }}>create</button>
      </form>
      {tokens.map((token) => {
        return(
          <div>


            <h1></h1>
          </div>
        )
      })} */}

    </div>
  );
}

export default App;
