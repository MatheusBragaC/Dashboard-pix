import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      console.log("Resposta da API:", response); // <-- DEBUGANDO A RESPOSTA

      // Garante que o token existe antes de salvar
      if (response.status === 200 && response.data) {
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
        localStorage.setItem("token", response.data);
        navigate("/dashboard");
      } else {
        setErrorMessage("Erro ao salvar o token. Resposta inválida.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
      setErrorMessage("Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-center bg-red-900 p-2 rounded-lg mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
