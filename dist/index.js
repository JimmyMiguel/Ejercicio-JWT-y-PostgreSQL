"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const associations_1 = require("./bd/associations");
const associations_2 = require("./bd/associations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.post("/auth", async (req, res) => {
    try {
        //traigo los datos de la peticion y los guardo en un objeto
        const { email, password, fullName, birthDate } = req.body;
        // verifico que todos los datos esten
        if (!email || !password || !fullName || !birthDate) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }
        //si cumple con la condifcion entonces, creamos el usuario
        const usuario = await associations_2.User.create({ fullName, birthDate });
        if (usuario) {
            res.send("Usuario Creado");
        }
        //encriptamos la contrasena por seguridad
        const contrasena = await bcrypt_1.default.hash(password, 10);
        // creamos en auth del usuario nuevo con la contrasena hasheada y vinculado al id
        await associations_1.Auth.create({
            email,
            password: contrasena,
            userId: usuario.id
        });
        res.status(200).json({
            "message": "Usuario creado con exito"
        });
    }
    catch {
        console.log("error");
    }
});
/*
--------------------------------------
*/
app.post("auth/token");
app.listen(port, () => {
    console.log("Servidor corriendo en el puesto", port);
});
