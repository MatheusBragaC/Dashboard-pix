import { useNavigate } from "react-router-dom";

function PixMenuPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Escolha uma Opção</h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/pix")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all"
          >
            PIX QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default PixMenuPage;