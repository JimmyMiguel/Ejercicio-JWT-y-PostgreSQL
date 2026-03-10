import Express, { response, request } from "express";
import { Auth } from "./bd/associations";
import { User } from "./bd/associations";
import bcrypt, { hash } from "bcrypt"
import { error } from "node:console";
import { sequelize } from "./bd";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


const app = Express()
app.use(Express.json());
const port = process.env.PORT || 3000



async function bootstrap() {
  try {
    //comprobamos que se ha conectado con Neon nuestra base de datos 
    await sequelize.authenticate()
    console.log("Conexion con Neon exitosa")
    //configuramos para que se actualiza cuando hacemos una accion
    await sequelize.sync({ alter: true })
    console.log('🚀 Modelos sincronizados con la base de datos.');

    app.listen(port, () => {
      console.log("Servidor corriendo en el puesto", port)
    })


  } catch (err) {
    console.error("❌ Error crítico al iniciar:", err);
    process.exit(1); // Cerramos el proceso si no hay DB
  }

}

bootstrap()



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


    //encriptamos la contrasena por seguridad
    const contrasena = await bcrypt.hash(password, 10)
    // creamos en auth del usuario nuevo con la contrasena hasheada y vinculado al id
    await Auth.create({
      email,
      password: contrasena,
      userId: usuario.id
    })
    res.status(200).json({
      "message": "Usuario creado con exito"
    })

  }
  catch (error) {
    if (error instanceof Error) {
      // Aquí TS ya sabe que 'error' tiene la propiedad .message
      console.error("Mensaje de error:", error.message);
    } else {
      console.error("Ocurrió un error desconocido", error);
    }
  }
})

/*
--------------------------------------
*/

app.post("/auth/token", async (req, res) => {


  const { email, password } = req.body

  const userFind = await Auth.findOne({
    where: {
      email: email
    }
  })

  if (!userFind) {
    console.log("Usuario no encontrado")
    return res.status(404).json({ messege: "No Autorizado" })
  }

  const passGood = await bcrypt.compare(password, userFind.password)
  if (!passGood) {
    res.send(404).json({ messege: "Contrasena no coinciden" })
  }


  const token = jwt.sign({ id: userFind?.userId }, process.env.JWT_TOKEN!, { expiresIn: "1h" })

  return res.json({ token })

})

