import express from "express";
import router from "./index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router)

app.use((req, res) => {
    const path =  req.originalUrl;
    const metodo = req.method;
    res.status(404).json({error: -2, descripcion: `ruta \'${path}\' método \'${metodo}\' no implementada`});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening in ${PORT}`));