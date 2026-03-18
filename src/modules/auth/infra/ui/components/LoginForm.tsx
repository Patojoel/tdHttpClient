import React from "react";
import { UseLoginBehavior } from "../hooks/useLogin";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { User, Lock, Loader2 } from "lucide-react";
import { LoadingState } from "@/shared/domain/enums/LoadingState";

export const LoginForm = ({ behavior }: { behavior: UseLoginBehavior }) => {
  const isPending = behavior.loading === LoadingState.pending;

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Connexion
        </h2>
        <p className="text-slate-500 font-medium">
          Accédez à votre catalogue de produits
        </p>
      </div>

      <form onSubmit={behavior.handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-slate-700 ml-1"
            >
              Identifiant
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <User size={18} />
              </div>
              <Input
                id="username"
                type="text"
                placeholder="Votre identifiant (ex: emilys)"
                className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition-all font-medium"
                value={behavior.username}
                onChange={(e) => behavior.setUsername(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700 ml-1"
            >
              Mot de passe
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition-all font-medium"
                value={behavior.password}
                onChange={(e) => behavior.setPassword(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Mot de passe oublié ?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Connexion en cours...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>

      <div className="pt-4 text-center">
        <p className="text-sm text-slate-500 font-medium">
          Vous n'avez pas de compte ?{" "}
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-700 font-bold"
          >
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
};
