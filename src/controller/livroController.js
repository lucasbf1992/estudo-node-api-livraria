import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import NaoEncontrado from "../config/erros/NaoEncontrado.js";

class LivroController {

  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
            
      res.status(200).json(listaLivros);
    } catch (erro) { 
      next(erro);
    }
        
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
                
    } catch (erro) { 
      next(erro);
    }        
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      
      const livroCompleto = {
        ...novoLivro, autor: { ...autorEncontrado?._doc }
      };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({
        message: "Livro criado com sucesso",
        livro: livroCriado
      });
    } catch (erro) {
      next(erro);
    }        
  }

  static async atualizarLivro(req, res, next) {
    try {            
      const id = req.params.id;
      
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);
           
      if (livroResultado !== null) {
        res.status(200).json({
          message: `Livro#${id} alterado com sucesso`,                
        });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) { 
      next(erro);
    }        
  }

  static async excluirLivro(req, res, next) {
    try {            
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndDelete(id);
         
      if (livroResultado !== null) {
        res.status(200).json({
          message: `Livro#${id} excluído com sucesso`,                
        });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) { 
      next(erro);
    }        
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;

    try {            
      const livrosPorEditora = await livro.find({ editora: new RegExp(editora, "i") });
            
      res.status(200).json(livrosPorEditora);
    } catch (erro) { 
      res.status(500).json({
        message: `${erro.message} - Falha na busca`                
      });
    }
  }
}

export default LivroController;