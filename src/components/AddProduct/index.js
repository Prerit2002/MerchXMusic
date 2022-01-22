import React from 'react';
import { Formik, Field, Form } from "formik";
import './addproduct.css'
function AddProduct({createProduct ,  Capturefile }) {
    return (
        <div>
            <h1 style={{ color: "white", textAlign: "left", marginLeft: "20rem" }}>Add Product </h1>
            <Formik
                initialValues={{ productName: "", email: "", price: "" }}
                onSubmit={async (values) => {
                    console.log(values);
                    try {
                        const price = window.web3.utils.toWei(values.price.toString(), "Ether");
                        createProduct(values.name, values.sellername,values.quantity, price );

                    } catch (e) {
                        console.log(e)
                    }

                    // await new Promise((resolve) => setTimeout(resolve, 500));
                    // alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form >
                    <div className="formms">
                        <h4 className="text" style={{ color: "white" }}>Enter Product Name</h4>
                        <Field style={{ color: "white" }} placeholder="Enter Product Name" className="field" name="name" type="text" />
                        <h4 className="text" style={{ color: "white" }}>Enter Artist Name</h4>
                        <Field style={{ color: "white" }} placeholder="Enter Seller name" className="field" name="sellername" type="text" />
                        <h4 style={{ color: "white" }}>Enter Price</h4>
                        <Field style={{ color: "white" }} placeholder="Enter Price in MATIC" className="field" name="price" type="number" />
                        <h4 style={{ color: "white" }}>Enter Quantity</h4>
                        <Field style={{ color: "white" }} placeholder="Enter Quantity" className="field" name="quantity" type="number" />
                        {/* <label className="checkbox d-flex " style={{gap:"10px"}}>
              <Field style={{marginTop:"15px"}} type="checkbox" name="checked" value="One" />
              <h2 style={{color: "white"}}>Click if you are a Seller</h2>
            </label> */}
                        <h2 style={{ color: "white" }}>Product Image</h2>
                        <input className=" file " accept='image/*' id="file" name="file" type="file" onChange={Capturefile} />;

                    </div>

                    <button style={{ width: "30%"}} type="submit" className="btn productSubmit btn-primary mb-5">Submit</button>
                </Form>
            </Formik>

        </div>
    )
}

export default AddProduct;