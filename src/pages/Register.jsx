import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import knightUrl from "../assets/knight.svg";

function Register() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.role = parseInt(data.role, 10); // Converte role para número
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#15110d] via-[#120e0a] to-[#0c0906]">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(1200px_600px_at_50%_-10%,_rgba(202,138,4,0.05),transparent_60%),radial-gradient(800px_400px_at_50%_110%,_rgba(146,64,14,0.05),transparent_60%)]" />

      {/* Cavaleiros laterais */}
      <motion.img
        src={knightUrl}
        alt="Cavaleiro decorativo"
        className="hidden sm:block absolute bottom-0 left-2 md:left-10 w-28 md:w-40 lg:w-52 pointer-events-none select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: [8, 0, 8], opacity: 1 }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={knightUrl}
        alt="Cavaleiro decorativo"
        className="hidden sm:block absolute bottom-0 right-2 md:right-10 w-28 md:w-40 lg:w-52 -scale-x-100 pointer-events-none select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, 8, 0], opacity: 1 }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#1b1410]/80 backdrop-blur-[1px] p-10 rounded-xl shadow-2xl shadow-black/50 max-w-md w-full border border-yellow-900/40 ring-1 ring-yellow-900/10"
        >
          <h2 className="text-3xl font-heading text-yellow-200 text-center mb-4 drop-shadow-[0_0_6px_rgba(120,53,15,0.25)]">Cadastro</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-800/60 to-transparent mb-6" />

          {errorMessage && (
            <p className="text-red-200 text-center bg-[#2a1313]/70 border border-[#5b1c1c]/50 p-2 rounded-lg mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-emerald-200 text-center bg-[#0f2a1f]/70 border border-[#1f5b45]/40 p-2 rounded-lg mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-yellow-100/90">Nome</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full mt-1 px-4 py-2 bg-[#2a2219]/80 border border-[#3b2d1f] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-yellow-700 text-[#f2e9d8] placeholder-[#a38e72] shadow-inner"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label className="block text-yellow-100/90">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full mt-1 px-4 py-2 bg-[#2a2219]/80 border border-[#3b2d1f] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-yellow-700 text-[#f2e9d8] placeholder-[#a38e72] shadow-inner"
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label className="block text-yellow-100/90">Senha</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full mt-1 px-4 py-2 bg-[#2a2219]/80 border border-[#3b2d1f] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-yellow-700 text-[#f2e9d8] placeholder-[#a38e72] shadow-inner"
                placeholder="Digite sua senha"
              />
            </div>

            <div>
              <label className="block text-yellow-100/90">Tipo de Usuário</label>
              <select
                {...register("role", { required: true })}
                className="w-full mt-1 px-4 py-2 bg-[#2a2219]/80 border border-[#3b2d1f] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-yellow-700 text-[#f2e9d8] shadow-inner"
              >
                <option value="1">Usuário Normal</option>
                <option value="2">Administrador</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6b3e1f] hover:bg-[#7a4a27] text-[#f7ecd6] font-semibold py-2 rounded-md transition-colors duration-200 shadow-lg shadow-black/40 border border-[#8a5a2e]"
            >
              Criar Conta
            </button>
          </form>

          <p className="text-[#e6d8bd]/80 text-center mt-4">
            Já tem uma conta?{" "}
            <a href="/" className="text-yellow-300 hover:text-yellow-200 underline-offset-4 hover:underline transition-colors">
              Faça login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
