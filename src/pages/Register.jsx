import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

function Register() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.role = parseInt(data.role, 10); // Converte role para número

      // Remove qualquer campo "rule" antes do envio
      delete data.rule;

      const response = await api.post("/users/register", data);
      console.log("Usuário registrado com sucesso:", response.data);

      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.response?.data || error.message);
      setErrorMessage("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-10 rounded-2xl shadow-lg max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Cadastro</h2>

        {errorMessage && (
          <p className="text-red-500 text-center bg-red-900 p-2 rounded-lg mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center bg-green-900 p-2 rounded-lg mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-300 font-medium">Nome</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Senha</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Digite sua senha"
            />
          </div>

          {/* Campo corrigido para Role */}
          <div>
            <label className="block text-gray-300 font-medium">Tipo de Usuário</label>
            <select
              {...register("role", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="1">Usuário Normal</option>
              <option value="2">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Já tem uma conta?{" "}
          <a href="/" className="text-blue-400 hover:underline">
            Faça login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
