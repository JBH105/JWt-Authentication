const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
const port = process.env.PORT || 5050;

//....Models.....//
const SignUp = require("./model/SignupData");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
mongoose
  .connect(
    "mongodb+srv://jaydeep:3KM1Lwq3Z5Yyn68M@cluster0.p7sbc.mongodb.net/AuthData?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.log(err);
  });

//......SignUP.......//

app.post("/signup", (req, res) => {
  const signup = new SignUp({
    name: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  const token = jwt.sign({ password: signup.password }, "abcd123", {
    expiresIn: "2h",
  });
  //   console.log(token,"token")
  signup.save().then((res1) => {
    console.log(res1);
    res.json({ res1, token });
  });
});

//.....Login User......//

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await SignUp.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "abc123", {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      res.status(200).json({token:token});
    }
    res.send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(port);
});
