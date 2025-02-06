import User from "../Models/User.js";
import Nutritionist from "../Models/Nutritionist.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    const {name,email,password}=req.body;
    try {
      let user= await User.findOne({email});
      if(user)
        return res.status(400).json({msg: 'User already exists'});
      user=new User({name,email,password});
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: { id: user.id }
      };
      jwt.sign(payload, 'snacksense', { expiresIn: 3600 }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const registerNutri = async (req, res) => {
  const {name,email,password}=req.body;
  try {
    let nutritionist= await Nutritionist.findOne({email});
    if(nutritionist)
      return res.status(400).json({msg: 'User already exists'});
    nutritionist=new Nutritionist({name,email,password});
    const salt = await bcrypt.genSalt(10);
    nutritionist.password = await bcrypt.hash(password, salt);
    await nutritionist.save();
    const payload = {
      nutritionist: { id: nutritionist.id }
    };
    jwt.sign(payload, 'snacksense', { expiresIn: 3600 }, 
      (err, token) => {
          if (err) throw err;
          res.json({ token });
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

export const loginUser = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user = await User.findOne({email: email});
    const isValidUser = user && (await bcrypt.compare(password, user.password));
    if (!isValidUser) 
      return res.status(500).send('invalid credentials');
    const token = jwt.sign({ userId: user._id }, 'snacksense');
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: true,
    });
    res.status(200).json({ msg: 'User logged in', token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const loginNutri = async (req, res) => {
  const {email,password}=req.body;
  try {
    const nutritionist = await Nutritionist.findOne({email: email});
    const isValidUser = nutritionist && (await bcrypt.compare(password, nutritionist.password));
    if (!isValidUser) 
      return res.status(500).send('invalid credentials');
    const token = jwt.sign({ userId: nutritionist._id }, 'snacksense');
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: true,
    });
    res.status(200).json({ msg: 'User logged in', token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};