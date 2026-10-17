import React from 'react';

interface DisplayProps {
  expression: string;
  currentInput: string;
  error: string | null;
  isLoading: boolean;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  currentInput,
  error,
  isLoading,
}) => {
  return (
    <div className="bg-slate-950 p-4 rounded-xl text-right mb-4 border border-slate-800 shadow-inner flex flex-col justify-between h-28">
      {/* Expresión previa u operación en curso */}
      <div className="text-slate-400 text-sm font-mono h-6 truncate">
        {isLoading ? 'Calculating...' : expression}
      </div>

      {/* Pantalla Principal (Resultado, entrada o error) */}
      <div className="text-white text-3xl font-mono font-bold truncate">
        {error ? (
          <span className="text-red-400 text-lg font-normal">{error}</span>
        ) : (
          currentInput || '0'
        )}
      </div>
    </div>
  );
};