pragma solidity ^0.8.4;

contract Marketplace {  
    uint public productcount = 0;
    uint public usercount = 0;
    uint public receiptcount = 0;
    mapping(uint => Product) public products;
    mapping(uint => User)public user;
    mapping(uint => Receipt)public receipts;

    struct User {
        uint id;
        string name;
        string email;
        string hash;
        string location;
        bool artist;
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
        user[usercount] = User(usercount,_name,_email,_hash , _location  ,_artist);
    }
    function createProduct(string memory _name , string memory _sellername , uint _quantity,uint _price,string memory _hash) public{
        productcount++;
        products[productcount] = Product(productcount,_name,_sellername,_quantity,_price,payable(msg.sender),_hash);
    }

    function buy(uint _id, uint _quantity) payable public {
       
        Product memory _product = products[_id];
        require(_product.quantity > _quantity , "Please Select less quantity");
        address payable _owner = _product.owner;
        if ( _product.quantity > 0){
            _owner.transfer(_product.price);
            _product.quantity = _product.quantity - _quantity;
            receiptcount++;
            receipts[receiptcount] = Receipt(receiptcount, _product.sellername,payable(msg.sender),_quantity,_product.hash);

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