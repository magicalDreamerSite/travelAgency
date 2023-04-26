//import { User} from '../models/users.js'
import { pool } from "../config/database-pg.js";
import config from '../config/config.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const matchPassword = async function (pwd1, pwd2)  {
    return await bcrypt.compare(pwd1, pwd2);
};

//APIS
export const APILogIn = async (req,res) =>{
    const {email, password} = req.body
    const hash = await encryptPassword(password)
    const result = await pool.query("SELECT * from users where email= $1", [email]);
    if (result.rowCount == 0 ) return res.status(404).json({message:  "User " + email + " not found"});
    
    const matchPass = await matchPassword(password.toString(), result.rows[0].password);
    if (!matchPass) return res.status(401).json({message:  "Invalid password for user " + email });

    const token = jwt.sign({id: result.rows[0].id}, config.SECRET_JWT,{
        expiresIn: '24h' //24hs in sec
        })


    res.json({id: result.rows[0].id, email, token});

}


export const APILSignUp = async (req,res) =>{
    const {email, name, lastName, role, commission, password} = req.body;

    //const userFound = User.find({email});
    //console.log(userFound);
    let message ='';
    let errors = [];
    if (name == null || name.length == 0){
        errors.push({ error: "Name value is required." });
        }   
    if (lastName == null || lastName.length == 0){
        errors.push({ error: "LastName value is required." });
        }  
    if (email == null || email.length == 0){
        errors.push({ error: "Email value is required." });
        }  
    if (role == null || role.length == 0){
        errors.push({ error: "Role value is required." });
      }
    if (commission == null || commission.length == 0){
        errors.push({ error: "Commission value is required." });
    }
    if (isNaN(commission)){
        errors.push({ error: "Commission value must be a valid Number." });
    }    
    if (commission < 0 || commission > 100){
        errors.push({ error: "Commission value is invalid." });
    }    

    if (password == null || password.length < 8) {
        errors.push({ error: "Passwords must be at least 8 characters." });
      }      
    //const userFound = await User.findOne({email});
    const emailUser = await pool.query("SELECT email FROM users where email= $1", [email]);
    if (emailUser.rowCount == 1) {
        errors.push({ error: "Email " + email + " already exists." });
    }
    
      if (errors.length > 0) {
        return res.status(400).json({errors});
    }


    const passwordEncrypt = await encryptPassword(password);
    try {
        const saveUser = await pool.query("INSERT INTO users (email, name, lastName, role, password, commission, active) values($1, $2, $3, $4, $5, $6, $7)", [email, name, lastName, role, passwordEncrypt, commission, true] );
        const emailUserCheck = await pool.query("SELECT id , email FROM users where email= $1", [email]);
        //const saveUser = await newUser.save();
        const token = ''
        //const token = jwt.sign({id: emailUserCheck.rows[0].id}, config.SECRET_JWT,{
            //expiresIn: '24h' // 86400 24hs in sec
        //})
        message = 'User ' + email + 'has been created'; 
        res.status(200).json({id: emailUserCheck.rows[0].id, email, token, message});
        
    } catch (error) {
        res.status(500).json(error);        
    }
    
}


  