const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const UserModal   = require("../models/user.js"); 


const secret = 'test'; 

exports.signin = async(req, res) => {


    const { username, password } = req.body; 
    console.log(req.body); 

    try{

        const oldUser = await UserModal.findOne({ username }); 
        console.log(`OLD USER ${oldUser}`); 

        if(!oldUser) return res.status(404).json({ message: "User does not exist"}); 

        const checkedPassword = await bcrypt.compare(password, oldUser.password); 
        if(!checkedPassword) return res.status(400).json({ message: "Invalid credentials "}); 

        const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: '1d'});

        console.log(`TOKEN FROM SIGNIN ${token}`);

        //res.send({ token }); 

        res.status(200).json({ result: oldUser, token }); 

    } catch(error){

        res.status(500).json({ message: "Somethign went wrong "}); 
    }
}

exports.signup = async(req, res ) => {

    const { username, email, password } = req.body; 
   

    try{

        const oldUser = await UserModal.findOne({ username }); 

        if(oldUser) return res.status(400).json({message:"User already exists "}); 

        const hashedPassword = await bcrypt.hash(password, 12); 
        
        const result = await UserModal.create({ username, email, password: hashedPassword }); 

        const token = jwt.sign({ email: result.email, id: result._id}, secret, { expiresIn: '1d'}); 

        console.log(`TOKEN FROM REG ${token}`); 

        res.status(201).json({ result, token }); 
    

    } catch(error){

        console.log(error); 

        res.status(500).json({ message: "Something went wrong "}); 

    }
}