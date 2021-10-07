import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
	const history = useHistory()
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupdata = {
    username,
    email,
    password,
  };

//   console.log(signupdata);
  const handleSignup = (e) => {
	  if(!username || !email | !password)
	  {
		  return toast.warning("Fill the details")
	  }
	  else{
    axios
      .post("http://localhost:5050/signup", signupdata)
      .then((result) => {
        // console.log(result);
      });
	  toast.success("Success SignUp")
	  history.push('/')
  };}
  return (
    <div>
      <Card style={{ width: "18rem", margin: "0px auto" }}>
        <Card.Body>
          <Card.Title>Signup Page</Card.Title>
          <span>Username</span>
		  <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
		  <span>Email</span>
		  <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>Password</span>
		  <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br /> <br />
          <Button variant="primary" onClick={() =>handleSignup()}>
            SignUp
          </Button>
        </Card.Body>
        <Card.Footer >
          <small className="text-muted" onClick={()=>history.push('/')} >Login !!</small>
        </Card.Footer>
      </Card>
      {/* <form onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUserName(e.target.value);  	
            }}
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>SignUp</button>
      </form> */}
    </div>
  );
};

export default SignUp;
