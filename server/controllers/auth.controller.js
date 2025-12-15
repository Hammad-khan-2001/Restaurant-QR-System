import User from '../models/userModel.js';
// import bcrypt from 'bcrypt';
import bcrypt from "bcryptjs";
import { generateAccessToken , generateRefreshToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //check if user is registered
    const userData = await User.findOne({ email });
    //  data mila =>   {name : "ritesh" , 'email':'ritesh@gmail.com'} // data nhi mila => null
    if (userData) {
      return res.status(400).json({
        message: 'you are already registered , Please login',
      });
    }

    //if user is not registered , hash the password
    const passwordHash = await bcrypt.hash(password, 12);
    const data = { name, email, phone, passwordHash };
    const newUser = await User.create(data);
    res.status(201).json({
      messsage: 'success',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
    });
  }
};

//form register => email + password + name + phone

export const login = async (req, res) => {
  try {
    //steps
    //email or password
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
       return res.status(400).json({
        message: `There is no account with ${email} , Please create an account and try again`,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    //  console.log(isPasswordMatch)
     if (!isPasswordMatch) {
       return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    res.status(200).json({
      message: "Login successfull",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};









// import User from '../models/userModel.js';
// // import bcrypt from 'bcrypt';
// import bcrypt from "bcryptjs";
// import { generateAccessToken , generateRefreshToken } from '../utils/jwt.js';

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "You are already registered, please login",
//       });
//     }

//     const passwordHash = await bcrypt.hash(password, 12);

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       passwordHash,
//     });

//     const accessToken = generateAccessToken({
//       id: user._id,
//       role: user.role,
//     });

//     const safeUser = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//     };

//     res.status(201).json({
//       message: "Registration successful",
//       data: safeUser,
//       accessToken,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     const accessToken = generateAccessToken({
//       id: user._id,
//       role: user.role,
//     });

//     const refreshToken = generateRefreshToken({
//       id: user._id,
//       role: user.role,
//     });

//     const safeUser = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//     };

//     res.status(200).json({
//       message: "Login successful",
//       data: safeUser,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
