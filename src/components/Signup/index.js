import React from 'react';
import { Formik, Field, Form } from "formik";
import './signup.css'
function Signup({Capturefile , createUser}) {
  return (
      <div>
          <h1 style={{color: "white",textAlign: "left",marginLeft:"20rem"}}>Signup </h1>
          <Formik
        initialValues={{ name: "", email: "" ,location:"", checked:[] }}
        onSubmit={async (values) => {
            console.log(values);
            const check = values.checked.lenght > 0 ? true : false
            try{
                createUser(values.name, values.email,check , values.location);

            }catch(e){
                console.log(e)
            }
           
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form >
            <div className="formms">
                <h4 className="text" style={{color: "white"}}>Enter Name</h4>
            <Field placeholder="Enter name" className="field" name="name" type="text" />
            <h4 style={{color: "white"}}>Enter Email</h4>
          <Field placeholder="Enter Email" className="field" name="email" type="email" />
          <h4 style={{color: "white"}}>Enter Location</h4>
          <Field placeholder="Enter Location" className="field" name="location" type="text" />
          <label className="checkbox d-flex " style={{gap:"10px"}}>
              <Field style={{marginTop:"15px"}} type="checkbox" name="checked" value="One" />
              <h2 style={{color: "white"}}>Click if you are a Seller</h2>
            </label>
            <h2 style={{color: "white"}}>Product Image</h2>
            <input className=" file " accept='image/*' id="file" name="file" type="file" onChange={Capturefile} />;

            </div>
         
          <button style={{width:"30%"}} type="submit" className="btn btn-primary mb-5">Submit</button>
        </Form>
      </Formik>

      </div>
  )
}

export default Signup;
