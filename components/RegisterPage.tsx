import React, { useState } from 'react';
import AuthFormContainer from './AuthFormContainer';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);

    // Basic validation
    if (!name.trim() || !username.trim() || !password || !confirmPassword) {
        setFeedback({ type: 'error', message: 'Semua kolom harus diisi ya.' });
        setIsLoading(false);
        return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Password tidak cocok! Coba lagi ya.' });
      setIsLoading(false);
      return;
    }
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userExists = users.some((user: any) => user.username === username);
          
          if (userExists) {
            setFeedback({ type: 'error', message: 'Username ini sudah digunakan. Coba yang lain ya!' });
            setIsLoading(false);
            return;
          }

          const newUser = { name, username, password };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          setFeedback({ type: 'success', message: 'Asyik! Akunmu berhasil dibuat. Mengalihkan ke halaman masuk...' });
          setTimeout(() => {
            onRegisterSuccess();
          }, 2000);

        } catch (error) {
          console.error("Gagal mendaftar:", error);
          setFeedback({ type: 'error', message: 'Oops! Terjadi kesalahan saat mendaftar.' });
          setIsLoading(false);
        }
    }, 500);
  };

  return (
    <AuthFormContainer title="Ayo Bergabung!">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Nama</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Siapa nama kerenmu?"
            className="w-full bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
            required
          />
        </div>
        <div>
          <label htmlFor="username-reg" className="block text-sm font-bold text-slate-700 mb-1">Username</label>
          <input
            id="username-reg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Pilih username unik"
            className="w-full bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
            required
          />
        </div>
        <div>
          <label htmlFor="password-reg" className="block text-sm font-bold text-slate-700 mb-1">Password</label>
          <input
            id="password-reg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Buat password rahasia"
            className="w-full bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-bold text-slate-700 mb-1">Ulang Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ketik ulang password rahasiamu"
            className="w-full bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400"
            required
          />
        </div>
        
        {feedback && (
          <div className={`text-center text-sm p-3 rounded-lg border ${
            feedback.type === 'error'
              ? 'bg-red-100 border-red-200 text-red-700'
              : 'bg-green-100 border-green-200 text-green-700'
          }`}>
            {feedback.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 transition-all duration-200 transform hover:scale-105 disabled:bg-teal-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
        </button>
        <p className="text-center text-sm text-slate-600">
          Sudah punya akun?{' '}
          <button type="button" onClick={onNavigateToLogin} className="font-bold text-orange-600 hover:underline">
            Masuk di sini
          </button>
        </p>
      </form>
    </AuthFormContainer>
  );
};

export default RegisterPage;
