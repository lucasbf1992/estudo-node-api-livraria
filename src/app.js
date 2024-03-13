import express from 'express';
import conectarBancoDeDados from './config/dbConnect.js';
import routes from './routes/index.js';

const conexaoBanco = await conectarBancoDeDados();

conexaoBanco.on("error", (erro) => {
    console.error("Erro de conexão. Detalhes: ", erro);
});

conexaoBanco.once("open", () => {
    console.log("Conexão com o banco realizada com sucesso.");
})

const app = express();
routes(app);
    
export default app;

