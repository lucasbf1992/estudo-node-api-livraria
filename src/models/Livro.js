import mongoose from "mongoose";

const livrosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "Título do livro é obrigatório"] 
  },
  editora: { 
    type: String, 
    required: [true, "Editora do livro é obrigatório"],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "Editora '{VALUE}' não é um valor permitido"
    }
  },
  preco: { 
    type: Number, 
    required: [true, "Preco do livro é obrigatório"]
  },
  paginas: { 
    type: Number, 
    /*min: [10, "O número de páginas deve estar entre 10 e 100000. Valor fornecido {VALUE}"],
    max: [100000, "O número de páginas deve estar entre 10 e 100000. Valor fornecido {VALUE}"],*/
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 100000;
      },
      message: "O número de páginas deve estar entre 10 e 100000. Valor fornecido {VALUE}"
    },
    required: [true, "A quantidade de páginas é obrigatório"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatório"]
  }
}, { versionKey: false});

const livro = mongoose.model("livros", livrosSchema);

export { livro };