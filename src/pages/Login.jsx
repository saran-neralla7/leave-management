import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, attemptRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await attemptRegister(email, password);
      }
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Incorrect email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container flex items-center justify-center p-4">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none opacity-50"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl shadow-primary/20 flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,159,255,0.2),transparent_70%)]"></div>
             <span className="material-symbols-outlined text-[32px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>group_work</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface headline-font tracking-tight">GVPCDPGC(A)</h1>
          <p className="text-on-surface-variant font-medium mt-2">Leave & Compensation Management</p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-purple-gradient opacity-80"></div>
          
          <h2 className="text-2xl font-bold text-on-surface mb-8 headline-font tracking-tight">
            {isLogin ? 'Welcome back' : 'Claim your account'}
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-error-container/30 text-error font-medium text-sm border border-error-container/50 flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/50 border border-outline-variant/30 text-on-surface rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all font-medium placeholder:text-on-surface-variant/50"
                placeholder="sarah@company.com"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/50 border border-outline-variant/30 text-on-surface rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all font-medium placeholder:text-on-surface-variant/50"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin" style={{fontVariationSettings: "'FILL' 1"}}>sync</span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
