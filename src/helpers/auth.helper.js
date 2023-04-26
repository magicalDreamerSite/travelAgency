import config from '../config/config.js';
import jwt from "jsonwebtoken";

export const validToken = async (req, res, next) => {

    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if(!token) return res.status(403).json({message: "No token provided"});
        if (token.split(" ")[0] === "Bearer") {
            const decoded = jwt.verify(token.split(" ")[1], config.SECRET_JWT);
            next();      
        }else{
            return res.status(403).json({message: "Ivalid Token"});
        }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Unauthorized Token"});
        }
}
  