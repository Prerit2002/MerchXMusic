pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Marketplace is ERC721URIStorage {  
    uint public productcount = 0;
    uint public usercount = 0;
    uint public receiptcount = 0;
    uint public tokenuri = 0;
    mapping(uint => Product) public products;
    mapping(uint => User)public user;
    mapping(uint => Receipt)public receipts;
    mapping(uint => Token)public tokens;

    struct Token{
        uint ids;
        string hash;
    }



    uint public tokencounter;
    constructor() public ERC721("Marketplace", "MPT") {
        tokencounter = 0;
    }

    function createCollectibles(string memory tokenURI) public returns (uint256){
        uint256 newItemId = tokencounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokencounter++;
        return newItemId;
    }

    struct User {
        uint id;
        string name;
        string email;
        string hash;
        string location;
        bool artist;
        address  user;
        uint coins;
    }

    struct Product{
        uint Id;
        string name;
        string sellername;
        uint quantity;
        uint price;
        address payable owner;
        string hash;
    }

    struct Receipt{
        uint idx;
        string sellername;
        address payable owner;
        uint quantity;
        string hash;
    }

    function createUser(string memory _name , string memory _email , string memory _hash , bool _artist,string memory _location) public{
        usercount++;
        user[usercount] = User(usercount,_name,_email,_hash , _location  ,_artist,msg.sender,0);
    }
    function createProduct(string memory _name , string memory _sellername , uint _quantity,uint _price,string memory _hash) public{
        productcount++;
        products[productcount] = Product(productcount,_name,_sellername,_quantity,_price,payable(msg.sender),_hash);
    }
    function createToken(string memory _hash) public {
        tokenuri++;
        tokens[tokenuri] = Token(tokenuri,_hash);
    }

    function buy(uint _id, uint _quantity ) payable public {
       
        Product memory _product = products[_id];
        require(_product.quantity > _quantity , "Please Select less quantity");
        address payable _owner = _product.owner;
      
             _owner.transfer(msg.value);

       
         _product.quantity = _product.quantity - _quantity;
            products[_id] = _product;
            receiptcount++;
            receipts[receiptcount] = Receipt(receiptcount,_product.sellername,payable(msg.sender),_quantity,_product.hash);
            uint _i = 1;
            for (_i = 1; _i <= usercount;_i++){
                if(user[_i].user == msg.sender){
                    user[_i].coins = user[_i].coins + 10;
                }
            }
            
        
    }

    function buyMM(uint _id, uint _quantity) payable public {
       
        Product memory _product = products[_id];
        require(_product.quantity > _quantity , "Please Select less quantity"); 
            uint _i = 1;
            for (_i = 1; _i <= usercount;_i++){
                if(user[_i].user == msg.sender){
                    user[_i].coins = user[_i].coins - 10;
                     _product.quantity = _product.quantity - _quantity;
                     products[_id] = _product;
                     receiptcount++;
                    receipts[receiptcount] = Receipt(receiptcount,_product.sellername,payable(msg.sender),_quantity,_product.hash);
                   
                }
            }
            
        
    }




    // function buy(address payable seller , uint price , bool favourite) payable public {
    //     if (favourite){
    //         seller.transfer( (90*price)%100  );
    //     }else{
    //         seller.transfer(price);
    //     }
    // }



    
}