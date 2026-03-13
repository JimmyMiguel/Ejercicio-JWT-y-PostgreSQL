import jwt, {JwtPayload} from 'jsonwebtoken'
 import { Response,Request,NextFunction } from 'express'
import { User } from './bd/user'
 
export const middlewere =  async (req:Request,res:Response,next:NextFunction)=>{

  const token = req.get("Authorization")

  if (!token) {
    return res.status(400).json({
      messege: "No se proporciono el tokken"
    })
  }
  const tokenParseado = token.split(" ")[1]

  try {
    //verificamos el token parseado con el token que nosotros creamos 
    const check = jwt.verify(tokenParseado, process.env.JWT_TOKEN!) as JwtPayload
    // buscamos el id del usuario que coincida con el token 
    res.locals = check
  
       next()
  } catch (error) {
    return res.status(401).json({ message: "Sesión expirada o token inválido" });

  }

}