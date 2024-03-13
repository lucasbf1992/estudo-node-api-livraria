import mongoose from "mongoose";

async function conectarBancoDeDados() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
}

export default conectarBancoDeDados;

