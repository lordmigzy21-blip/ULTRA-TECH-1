'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { getSettings } from '@/lib/db';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [correctPassword, setCorrectPassword] = useState('admin');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings && settings.admin_password) {
        setCorrectPassword(settings.admin_password);
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/60 px-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-border p-8 md:p-12 space-y-8 shadow-xl">
        
        {/* En-tête */}
        <div className="text-center space-y-2">
          <AppLogo showText={true} className="justify-center scale-110" />
          <h2 className="font-extrabold text-xl text-accent pt-4">Accès Administrateur</h2>
          <p className="text-xs text-muted-foreground">Veuillez entrer le mot de passe pour accéder au panneau.</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-accent">Mot de passe</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            {error && (
              <p className="text-xs font-bold text-red-500 pt-1">
                ⚠️ Mot de passe incorrect. Réessayez.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-wider shadow-md hover:bg-sky-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Se connecter
          </button>
        </form>

        {/* Note de pied */}
        <p className="text-[10px] text-center text-muted-foreground leading-normal">
          Le mot de passe par défaut est &quot;admin&quot;. Il peut être modifié dans les paramètres du panneau une fois connecté.
        </p>

      </div>
    </div>
  );
}
