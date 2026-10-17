export type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'percentage';

export interface CalculationRequest {
  operation: Operation;
  a: number;
  b?: number;
}

export interface CalculationResponse {
  result: number;
  error?: string;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: number;
}