import User from "../Models/user_model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const createduser = new User({
      fullname,
      email,
      password: hashpassword,
    });

    await createduser.save();
    const token = jwt.sign({ id: createduser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User created successfully",
      email,
      token,
    });
  } catch (error) {
    console.log("error" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // HMACSHA256(
    //   base64UrlEncode(header) + "." + base64UrlEncode(payload),

    //   your - 256 - bit - secret
    // );
    // res.json({ token });
    // If login is successful
    res.status(200).json({
      message: "Login successful",
      email,
      token,
    });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout - invalidate the user's token
export const logout = (req, res) => {
  // For this implementation, simply send a success response.
  // In a real application, you might handle token invalidation here.
  res.status(200).json({ message: "Logged out successfully" });
};

// Check Authentication - verify if the user is authenticated
// export const checkAuth = (req, res) => {
//   // Assuming you use JWT and pass the token via Authorization header
//   const token = req.headers.authorization?.split(" ")[1]; // Extract the token

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }

//     res.status(200).json({ authenticated: true, user });
//   });
// };
