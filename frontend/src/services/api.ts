import { CalculationRequest, CalculationResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const calculate = async (data: CalculationRequest): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || result.error || 'Error en el cálculo');
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Error de conexión con el servidor');
  }
};