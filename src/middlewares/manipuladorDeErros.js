import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).json({message: "Um ou mais dados fornecidos estão incorretos."});
  } else if (erro instanceof mongoose.Error.ValidationError) {
    console.error(erro.errors);
    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join(";");
    
    res.status(400).json({
      message: `Os seguintes erros foram encontrados: ${mensagensErro}`
    });
  } else {
    res.status(500).json({
      message: "Erro interno servidor" 
    });
  }
}

export default manipuladorDeErros;