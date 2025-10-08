import React, { useState } from 'react';
import AuthFormContainer from './AuthFormContainer';

interface LoginPageProps {
  onLoginSuccess: (name: string) => void;
  onNavigateToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan password harus diisi.');
      return;
    }
    
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((user: any) => user.username === username && user.password === password);
      
      if (foundUser) {
        console.log('Login attempt with:', { username });
        onLoginSuccess(foundUser.name);
      } else {
        setError('Gagal masuk. Username atau password salah.');
      }
    } catch (err) {
      console.error("Gagal masuk:", err);
      setError('Oops! Terjadi kesalahan saat mencoba masuk.');
    }
  };

  return (
    <AuthFormContainer title="Selamat Datang Kembali!">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-1">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username kamu"
            className="w-full bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
            required
          />
        </div>
        <div>
          <label htmlFor="password"  className="block text-sm font-bold text-slate-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password rahasiamu"
            className="w-full bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
            required
          />
        </div>
        {error && (
            <p className="text-center text-sm text-red-600 bg-red-100 p-2 rounded-lg border border-red-200">
            {error}
            </p>
        )}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
        >
          Masuk
        </button>
        <p className="text-center text-sm text-slate-600">
          Belum punya akun?{' '}
          <button type="button" onClick={onNavigateToRegister} className="font-bold text-teal-600 hover:underline">
            Daftar di sini
          </button>
        </p>
      </form>
    </AuthFormContainer>
  );
};

export default LoginPage;