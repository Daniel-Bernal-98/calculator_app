from enum import Enum
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Import the calculator functions from the calculator module
from app.calculator import (
    add,
    subtract,
    multiply,
    divide,
    power,
    square_root,
    percentage,
)

app = FastAPI(title="Calculator Microservice API")

# 1. CORS Configuration
# Allow request from frontend React App (port 3000 / Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the domain; for development, use "*" or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define an Enum for the supported operations to ensure type safety and validation
class OperationType(str, Enum):
    ADD = "add"
    SUBTRACT = "subtract"
    MULTIPLY = "multiply"
    DIVIDE = "divide"
    POWER = "power"
    SQRT = "sqrt"
    PERCENTAGE = "percentage"

# 3. JSON request and response models using Pydantic
class CalculationRequest(BaseModel):
    operation: OperationType
    a: float
    b: Optional[float] = None

class CalculationResponse(BaseModel):
    result: float


# 4. Endpoint of health check (Healthcheck)
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "calculator-api"}


# 5. Main calculus endpoint
@app.post("/api/calculate", response_model=CalculationResponse)
def calculate(request: CalculationRequest):
    try:
        op = request.operation
        a = request.a
        b = request.b

        # Validate if the binary operations have the second operand 'b'
        if op in [OperationType.ADD, OperationType.SUBTRACT, OperationType.MULTIPLY, OperationType.DIVIDE, OperationType.POWER]:
            if b is None:
                raise HTTPException(status_code=400, detail=f"Operation '{op.value}' requires parameter 'b'")

        # Execution of the operation according to the type
        if op == OperationType.ADD:
            res = add(a, b)
        elif op == OperationType.SUBTRACT:
            res = subtract(a, b)
        elif op == OperationType.MULTIPLY:
            res = multiply(a, b)
        elif op == OperationType.DIVIDE:
            res = divide(a, b)
        elif op == OperationType.POWER:
            res = power(a, b)
        elif op == OperationType.SQRT:
            res = square_root(a)
        elif op == OperationType.PERCENTAGE:
            res = percentage(a) if b is None else percentage(a, b)
        else:
            raise HTTPException(status_code=400, detail="Unsupported operation")

        return CalculationResponse(result=res)

    except ValueError as e:
        # Capture and return any ValueError raised by the calculator functions as an HTTPException with status code 400
        raise HTTPException(status_code=400, detail=str(e))