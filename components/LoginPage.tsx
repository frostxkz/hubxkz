import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um endereço de e-mail válido.');
      return;
    }
    setEmailError('');
    setIsLoading(true);
    // A chamada onLogin agora envia os dados para o webhook e muda o estado no App.tsx
    onLogin(email, password);
    // Não precisamos mais gerenciar o estado de carregamento aqui,
    // pois a tela mudará imediatamente.
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Hub do XK
                </h1>
            </div>
             <p className="text-lg text-slate-400">Suite de IA.</p>
        </header>

        <main className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="seu-email@exemplo.com"
                className={`w-full px-4 py-3 bg-slate-900 border-2 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                  emailError ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                required
              />
              {emailError && <p className="mt-2 text-sm text-red-400">{emailError}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <div>
                 <p className="text-sm text-slate-400 text-center mb-2">entre com sua conta do google</p>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
                >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </main>
      </div>
       <footer className="w-full text-center p-4 mt-8 text-slate-500 text-sm absolute bottom-0">
          <p>Hub do XK</p>
       </footer>
    </div>
  );
};

export default LoginPage;
