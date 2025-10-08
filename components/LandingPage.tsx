import React from 'react';
import AnimatedIllustration1 from './icons/AnimatedIllustration1';
import AnimatedIllustration2 from './icons/AnimatedIllustration2';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin, onNavigateToRegister }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 text-slate-800 text-center overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-24 w-72 h-72 bg-teal-200 rounded-full opacity-50 filter blur-2xl animate-float"></div>
      <div className="absolute bottom-0 -right-24 w-72 h-72 bg-orange-200 rounded-full opacity-50 filter blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-40 filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Animated Illustrations */}
      <div className="absolute bottom-10 left-10 w-48 md:w-64 animate-float" style={{ animationDuration: '8s' }}>
        <AnimatedIllustration1 />
      </div>
      <div className="absolute top-10 right-10 w-48 md:w-64 animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }}>
        <AnimatedIllustration2 />
      </div>


      <header className="absolute top-4 right-4 z-20">
        <div className="bg-orange-100/70 backdrop-blur-sm p-2 rounded-full shadow-md">
            <nav className="flex items-center gap-2">
            <button 
                onClick={onNavigateToLogin}
                className="px-4 py-2 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 transition-all transform hover:scale-105">
                Masuk
            </button>
            <button onClick={onNavigateToRegister} className="px-4 py-2 font-semibold text-teal-600 hover:text-teal-700">
                Daftar
            </button>
            </nav>
        </div>
      </header>

      <main className="z-10 flex flex-col items-center animate-fadeInUp">
        <div className="mb-4 text-2xl font-bold text-orange-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Priority Your Task</div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-teal-600">
          Selesaikan Tugasmu, Satu per Satu!
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-8">
          Selamat datang di Priority Your Task! Tempat yang super seru untuk mengelola petualangan harianmu. Berhenti bingung mau melakukan apa dan mulailah bersenang-senang dengan ide-ide ajaib!
        </p>
      </main>
    </div>
  );
};

export default LandingPage;