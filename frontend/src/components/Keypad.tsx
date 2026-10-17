import React from 'react';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onOperation: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onOperation,
  onEquals,
  onClear,
  onDelete,
}) => {
  const btnBase = "p-4 text-lg font-semibold rounded-xl transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center";
  const btnNumber = `${btnBase} bg-slate-700 text-white hover:bg-slate-600`;
  const btnOp = `${btnBase} bg-amber-500 text-white hover:bg-amber-400`;
  const btnFunc = `${btnBase} bg-slate-500 text-white hover:bg-slate-400`;
  const btnDanger = `${btnBase} bg-red-500/80 text-white hover:bg-red-500`;

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Fila 1 */}
      <button onClick={onClear} className={btnDanger}>C</button>
      <button onClick={onDelete} className={btnFunc}>⌫</button>
      <button onClick={() => onOperation('sqrt')} className={btnFunc}>√</button>
      <button onClick={() => onOperation('divide')} className={btnOp}>÷</button>

      {/* Fila 2 */}
      <button onClick={() => onDigit('7')} className={btnNumber}>7</button>
      <button onClick={() => onDigit('8')} className={btnNumber}>8</button>
      <button onClick={() => onDigit('9')} className={btnNumber}>9</button>
      <button onClick={() => onOperation('multiply')} className={btnOp}>×</button>

      {/* Fila 3 */}
      <button onClick={() => onDigit('4')} className={btnNumber}>4</button>
      <button onClick={() => onDigit('5')} className={btnNumber}>5</button>
      <button onClick={() => onDigit('6')} className={btnNumber}>6</button>
      <button onClick={() => onOperation('subtract')} className={btnOp}>-</button>

      {/* Fila 4 */}
      <button onClick={() => onDigit('1')} className={btnNumber}>1</button>
      <button onClick={() => onDigit('2')} className={btnNumber}>2</button>
      <button onClick={() => onDigit('3')} className={btnNumber}>3</button>
      <button onClick={() => onOperation('add')} className={btnOp}>+</button>

      {/* Fila 5 */}
      <button onClick={() => onDigit('0')} className={`${btnNumber} col-span-2`}>0</button>
      <button onClick={() => onDigit('.')} className={btnNumber}>.</button>
      <button onClick={() => onOperation('power')} className={btnFunc}>xʸ</button>
      
      {/* Fila 6 (Botón de Igual extendido o funcional) */}
      <button onClick={() => onOperation('percentage')} className={btnFunc}>%</button>
      <button onClick={onEquals} className={`${btnOp} col-span-3 bg-emerald-600 hover:bg-emerald-500`}>=</button>
    </div>
  );
};