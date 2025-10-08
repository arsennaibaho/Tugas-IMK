import React from 'react';

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 text-slate-800 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-10 -left-24 w-72 h-72 bg-teal-200 rounded-full opacity-50 filter blur-2xl animate-float"></div>
      <div className="absolute bottom-10 -right-24 w-72 h-72 bg-orange-200 rounded-full opacity-50 filter blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

      <main className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-orange-500" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                Priority Your Task
            </h1>
            <h2 className="text-3xl font-bold text-teal-600 mt-2">{title}</h2>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-slate-200 shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthFormContainer;