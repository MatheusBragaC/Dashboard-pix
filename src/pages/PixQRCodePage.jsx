import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../services/api";

function PixQRCodePage() {
  const { register, handleSubmit } = useForm();
  const [qrCodeData, setQrCodeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/pix/gerar", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("QR Code gerado com sucesso:", response.data);
        setQrCodeData(response.data);
        setErrorMessage("");
      } else {
        setErrorMessage("Erro ao gerar QR Code.");
      }
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
      setErrorMessage("Erro ao gerar QR Code. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Gerar QR Code PIX</h2>

        {errorMessage && (
          <p className="text-red-500 text-center bg-red-900 p-2 rounded-lg mb-4">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-300 font-medium">Chave PIX</label>
            <input
              type="text"
              {...register("chavePix", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Digite a chave PIX"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              {...register("valor", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Ex: 49.90"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Descrição</label>
            <input
              type="text"
              {...register("descricao")}
              className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Ex: Pagamento de produto"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"
          >
            Gerar QR Code
          </button>
        </form>

        {qrCodeData && (
          <div className="mt-6 text-center">
            <h3 className="text-white text-lg font-semibold mb-2">QR Code:</h3>

            {qrCodeData.qr_code_base64 ? (
              <img
                src={qrCodeData.qr_code_base64}
                alt="QR Code PIX"
                className="mx-auto rounded-lg border border-gray-700"
              />
            ) : (
              <p className="text-gray-400 italic text-sm">QR Code ainda não gerado</p>
            )}

            <p className="text-gray-300 mt-2 break-all text-sm">
              <strong>Copia e Cola:</strong>{" "}
              {qrCodeData?.copiaECola ?? "Código não disponível"}
            </p>

            {qrCodeData?.copiaECola && (
              <button
                onClick={() =>
                  navigator.clipboard.writeText(qrCodeData.copiaECola)
                }
                className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Copiar código
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PixQRCodePage;
