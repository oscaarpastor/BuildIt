export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="bg-surface shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text mb-6">Inicia sesión</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="px-4 py-2 border border-text rounded-md bg-transparent text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="px-4 py-2 border border-text rounded-md bg-transparent text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white py-2 rounded-md transition-colors font-semibold"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
