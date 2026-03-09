import Express, { response, request } from "express";
import { Auth } from "./bd/auth";
import { User } from "./bd/user";
import { error } from "node:console";
import bcrypt from "bcrypt"



const app = Express()
app.use(Express.json());
const port = process.env.PORT || 3000

app.post("/auth", async (req, res) => {
  try {
    //traigo los datos de la peticion y los guardo en un objeto
    const { email, password, fullName, birthDate } = req.body
    // verifico que todos los datos esten
    if (!email || !password || !fullName || !birthDate) {
      return res.status(400).json({ error: "Faltan datos obligatorios" })
    }

    //si cumple con la condifcion entonces, creamos el usuario
    const usuario = await User.create({ fullName, birthDate })
    if (usuario) {
      res.send("Usuario Creado")
    }

    //encriptamos la contrasena por seguridad
    const contrasena = await bcrypt.hash(password,10)

     const NewAuth = Auth.create({
      email,
      password:contrasena, 
      userId:usuario.id
      
     })

  }
  catch {
    console.log("error")
  }
})




app.listen(port, () => {
  console.log("Servidor corriendo en el puesto", port)
})