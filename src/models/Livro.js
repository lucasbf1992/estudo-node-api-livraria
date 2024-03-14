import mongoose from "mongoose";

const livrosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "Título do livro é obrigatório"] 
  },
  editora: { 
    type: String, 
    required: [true, "Editora do livro é obrigatório"]
  },
  preco: { 
    type: Number, 
    required: [true, "Preco do livro é obrigatório"]
  },
  paginas: { 
    type: Number, 
    required: [true, "A quantidade de páginas é obrigatório"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatório"]
  }
}, { versionKey: false});

const livro = mongoose.model("livros", livrosSchema);

export default livro;