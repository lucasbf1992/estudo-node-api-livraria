import { livro, autor } from "../models/index.js";
import NaoEncontrado from "../config/erros/NaoEncontrado.js";

class LivroController {

  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
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

  static async listarLivrosPorFiltro(req, res, next) {    
    const busca = await processaBusca(req.query);

    try {   
      if (busca === null) {
        res.status(200).send([]);
        return;
      }         
      
      const livrosResultado = livro
        .find(busca)
        .populate("autor");

      req.resultado = livrosResultado;

      next();                 
    } catch (erro) { 
      res.status(500).json({
        message: `${erro.message} - Falha na busca`                
      });
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};
  
  if (editora) busca.editora = new RegExp(editora, "i");
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$lte = minPaginas;
  if (maxPaginas) busca.paginas.$gte = maxPaginas;

  if (nomeAutor) {
    const autorBuscado = await autor.findOne({
      nome: nomeAutor
    });
    
    if (autorBuscado !== null) {
      busca.autor = autorBuscado._id;
    } else {
      busca = null;
    }        
  }

  return busca;  
}

export default LivroController;