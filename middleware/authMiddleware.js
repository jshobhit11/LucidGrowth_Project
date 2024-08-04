import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, please log in again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.body.userId = token_decode.id; // Extract the user ID from the token and add it to the request body
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

// import jwt from 'jsonwebtoken';

// const checkAuth = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your secret key
//     req.user = decoded; // Attaching user data to the request object
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// export default checkAuth;
