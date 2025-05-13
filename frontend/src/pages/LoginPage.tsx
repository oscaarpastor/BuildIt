export default function LoginPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-purple-800 to-indigo-900">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inicia sesión</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
  