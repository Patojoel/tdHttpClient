import React from "react";
import { useLogin } from "./hooks/useLogin";
import { LoginForm } from "./components/LoginForm";
import { PackageSearch } from "lucide-react";

export const ViewLogin = () => {
  const behavior = useLogin();

  return (
    <div className="min-h-screen w-full flex bg-slate-50/50">
      {/* Left side: Hero/Info Section */}
      <div className="hidden lg:flex flex-col flex-1 bg-indigo-600 p-12 justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-linear-to-br from-indigo-700/50 to-purple-800/50 opacity-10 blur-3xl animate-pulse" />
        <div className="z-10 max-w-lg space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl w-fit border border-white/20 shadow-xl">
            <div className="p-3 bg-white/20 rounded-2xl">
              <PackageSearch size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">AppInventory</h1>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest text-indigo-100/70">
                Gestion intelligente
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
              Gérez votre stock <br />
              <span className="text-indigo-200">en toute simplicité.</span>
            </h2>
            <p className="text-lg font-medium opacity-90 leading-relaxed text-indigo-50/80">
              L'outil idéal pour suivre vos produits, vos ventes et analyser vos performances en temps réel de manière efficace.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-10 font-bold">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg group hover:bg-white/20 transition-all cursor-pointer">
              <div className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform origin-left text-indigo-100">+10k</div>
              <div className="text-xs uppercase tracking-widest opacity-70 text-indigo-100/60 font-black">Produits gérés</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg group hover:bg-white/20 transition-all cursor-pointer">
              <div className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform origin-left text-indigo-100">99.9%</div>
              <div className="text-xs uppercase tracking-widest opacity-70 text-indigo-100/60 font-black">Temps de disponibilité</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white lg:bg-transparent animate-in fade-in zoom-in duration-500">
        <LoginForm behavior={behavior} />
        <div className="mt-8 text-center text-slate-400 text-sm font-medium">
          © 2024 AppInventory. Tous droits réservés.
        </div>
      </div>
    </div>
  );
};

export default ViewLogin;
