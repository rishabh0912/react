const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "InotebookSecretKey"; // In production, use environment variables to store secrets

router.post(
  "/createuser",
  [
    body("name", "Name must be at least 3 characters long").isLength({
      min: 3,
    }),
    body("email", "Email must be valid").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      // .then(user => res.json(user)).catch(err => {
      //     console.log(err);
      //     res.status(500).json({error: "Internal Server Error", message: err.message});
      // }

      const data = {
        user: {
            id: user.id,
            email: user.email,
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      console.log("JWT Token:", authToken);
      success = true;
      res.json({ success, user, token: authToken });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: err.message });
    }
  },
);


router.post("/login",[
    body("email", "Email must be valid").isEmail(),
    body("password", "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Invalid credentials" });
        }


        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            console.log("Password comparison failed for user:", passwordCompare);
            success = false;
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id,
                email: user.email,
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        console.log("JWT Token:", authToken);
        success = true;
        res.json({ success, authToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

router.get("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
})


module.exports = router;
