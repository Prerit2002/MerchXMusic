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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/ipfs/api/v0",
}); // leaving out the arguments will default to these values

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [account, setAccount] = useState("");
  const [marketplaceContract, setMarketplace] = useState();
  const [buffer, setBuffer] = useState(null);
  const [hash, setHash] = useState("");

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
      }

      // this.setState({loading:false})
      // console.log(products)
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

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
  const createProduct = (name, sellername, quantity, price, hash) => {
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

  // const addFile = async (e) => {
  //   e.preventDefault();
  //   console.log('submitting the form...');
  //   ipfs.add(buffer , (error,result) => {
  //     console.log('ipfs',result[0].hash)
  //   })
  // }

  return (
    <div className="App">
      <Navbar users={users} account={account} />
      <Router>
        <Switch>
          <Route exact path="/">
          <Landing users={users} />
          </Route>
          <Route exact path="/artist/:id">
            <Products users={users} products={products} />
            </Route>
            <Route exact path="/product/:id">
            <ProductPg buyProduct={buyProduct} products={products} />
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

    </div>
  );
}

export default App;
