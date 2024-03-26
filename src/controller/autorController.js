import NaoEncontrado from "../config/erros/NaoEncontrado.js";
import {autor} from "../models/index.js";

class AutorController {

  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find({});
            
      req.resultado = listaAutores;

      next();
    } catch (erro) { 
      next(erro);
    }
  }
            
  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
            
      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));        
      }      
    } catch (erro) { 
      next(erro);
    }        
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({
        message: "Autor criado com sucesso",
        livro: novoAutor
      });
    } catch (erro) {
      next(erro);
    }        
  }

  static async atualizarAutor(req, res, next) {
    try {            
      const id = req.params.id;
      console.log(id);
      const autorResultado = await autor.findByIdAndUpdate(id, req.body);
            
      if (autorResultado !== null) {
        res.status(200).json({
          message: `Autor#${id} alterado com sucesso`,                
        });
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }      
    } catch (erro) { 
      next(erro);
    }        
  }

  static async excluirAutor(req, res, next) {
    try {            
      const id = req.params.id;
      const autorResultado =  await autor.findByIdAndDelete(id);
           
      if (autorResultado !== null) {
        res.status(200).json({
          message: `Autor#${id} excluído com sucesso`,                
        });
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }  
    } catch (erro) { 
      next(erro);
    }        
  }
}

export default AutorController;