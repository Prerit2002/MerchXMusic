import { useState, useEffect } from "react";
import logo from "../logo.png";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Products from './Products'
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
        console.log(product);
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
  console.log("a" , products[1]);

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, []);

  const createUser = (name, email, hash, artist) => {
    console.log(account);
    try {
      marketplaceContract.methods
        .createUser(name, email, hash, artist)
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
  const buyProduct = (productId) => {
    console.log(account);
    try {
      marketplaceContract.methods
        .buy(productId)
        .send({ from: account })
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hello");
          createUser("Raj", "prerit715@gmail.com", hash, false);
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
          const a = 1;
          const price = window.web3.utils.toWei(a.toString(), "Ether");
          createProduct("tshirt", "raj", 1, price, hash);
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
                buyProduct(idx);
              }}
            >
              Buy
            </button>
          </div>
        );
      })}
      <Products products={products} />
    </div>
  );
}

export default App;
