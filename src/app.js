import express from "express";
import conectarBancoDeDados from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexaoBanco = await conectarBancoDeDados();

conexaoBanco.on("error", (erro) => {
  console.error("Erro de conexão. Detalhes: ", erro);
});

conexaoBanco.once("open", () => {
  console.log("Conexão com o banco realizada com sucesso.");
});

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);
    
export default app;

