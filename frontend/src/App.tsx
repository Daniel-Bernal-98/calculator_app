import { useState, useEffect } from 'react';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { History } from './components/History';
import { calculate } from './services/api';
import { Operation, HistoryItem } from './types';

export function App() {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(null);
  const [expression, setExpression] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Agregar dígitos
  const handleDigit = (digit: string) => {
    if (error) setError(null);
    if (digit === '.' && currentInput.includes('.')) return;
    setCurrentInput((prev) => prev + digit);
  };

  // Borrar último carácter
  const handleDelete = () => {
    if (error) setError(null);
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  // Limpiar todo el estado
  const handleClear = () => {
    setCurrentInput('');
    setPreviousValue(null);
    setPendingOperation(null);
    setExpression('');
    setError(null);
  };

  // Ejecutar operaciones unarias (raíz cuadrada, porcentaje)
  const handleUnaryCalculate = async (op: Operation) => {
    const val = parseFloat(currentInput);
    if (isNaN(val)) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await calculate({ operation: op, a: val });
      const expr = `${op}(${val})`;
      setCurrentInput(String(res.result));
      setExpression(expr);
      
      setHistory((prev) => [
        { id: Date.now().toString(), expression: expr, result: res.result },
        ...prev,
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar selección de operaciones binarias o ejecutar unarias
  const handleOperation = (opStr: string) => {
    const op = opStr as Operation;

    if (op === 'sqrt') {
      handleUnaryCalculate(op);
      return;
    }

    if (!currentInput && previousValue === null) return;

    if (currentInput) {
      setPreviousValue(parseFloat(currentInput));
      setPendingOperation(op);
      setExpression(`${currentInput} ${getOpSymbol(op)}`);
      setCurrentInput('');
    } else if (previousValue !== null) {
      setPendingOperation(op);
      setExpression(`${previousValue} ${getOpSymbol(op)}`);
    }
  };

  // Calcular resultado final con operación binaria
  const handleEquals = async () => {
    if (!pendingOperation || previousValue === null || !currentInput) return;

    const bVal = parseFloat(currentInput);
    setIsLoading(true);
    setError(null);

    try {
      const res = await calculate({
        operation: pendingOperation,
        a: previousValue,
        b: bVal,
      });

      const fullExpr = `${previousValue} ${getOpSymbol(pendingOperation)} ${bVal}`;
      setExpression(`${fullExpr} =`);
      setCurrentInput(String(res.result));
      setPreviousValue(null);
      setPendingOperation(null);

      setHistory((prev) => [
        { id: Date.now().toString(), expression: fullExpr, result: res.result },
        ...prev,
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getOpSymbol = (op: Operation): string => {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      case 'power': return '^';
      case 'percentage': return '%';
      default: return op;
    }
  };

  // Eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === '.') handleDigit('.');
      if (e.key === '+') handleOperation('add');
      if (e.key === '-') handleOperation('subtract');
      if (e.key === '*') handleOperation('multiply');
      if (e.key === '/') handleOperation('divide');
      if (e.key === 'Enter' || e.key === '=') handleEquals();
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Escape') handleClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentInput, previousValue, pendingOperation]);

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-none">
      <div className="bg-slate-800 p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-700">
        <h1 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 text-center">
          Calculator Microservice
        </h1>
        
        <Display 
          expression={expression}
          currentInput={currentInput}
          error={error}
          isLoading={isLoading}
        />

        <Keypad 
          onDigit={handleDigit}
          onOperation={handleOperation}
          onEquals={handleEquals}
          onClear={handleClear}
          onDelete={handleDelete}
        />

        <History 
          items={history}
          onClearHistory={() => setHistory([])}
        />
      </div>
    </main>
  );
}

export default App;