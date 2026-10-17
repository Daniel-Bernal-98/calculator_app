# Prompts Log - Technical Assessment

## Frontend UI Architecture & Component Design Prompt

**Prompt Used:**

> "I am building the frontend for a full-stack calculator microservice application.
> 
> Technical Stack & Constraints:
> - Framework: React with TypeScript
> - Build Tool: Vite
> - Styling: Tailwind CSS (modern, dark-mode design inspired by clean desktop/iOS calculators)
> - Communication: Fetch API to communicate with a RESTful backend running on `http://localhost:8000/api/calculate`.
>
> Operational Requirements:
> 1. Basic & Advanced Arithmetic Operations:
>    - Binary: Addition (`add`), Subtraction (`subtract`), Multiplication (`multiply`), Division (`divide`), Exponentiation (`power`), and Percentage (`percentage`).
>    - Unary: Square Root (`sqrt`).
> 2. Components Needed:
>    - `Display.tsx`: Displays current user input, pending operations/expressions, loading indicators, and server error messages gracefully.
>    - `Keypad.tsx`: Grid layout (4-column matrix) with stylized buttons for numbers, operations, clear (`C`), delete (`⌫`), and equals (`=`).
>    - `History.tsx`: Displays a list of recent calculation results with an option to clear history.
>    - `App.tsx`: Main state controller managing inputs, execution flow, API integration, and keyboard event listeners (handling key presses like numbers, `Enter`, `Backspace`, `Escape`, etc.).
>    - `services/api.ts`: API service wrapper executing POST requests to the backend with payload `{ operation, a, b }` and handling HTTP/validation errors.
>    - `types.ts`: TypeScript interfaces for request/response payloads and operation types.
>
> Please provide clean, modular, and fully typed TypeScript React components for this calculator UI."

# AI Prompts History

This document logs the primary prompts used during the development of the Full-Stack Calculator Microservice as required by the assessment guidelines.

## 1. Project Scaffolding & Architecture
- **Goal:** Define optimal project directory structure, separation of concerns (React Frontend + Python FastAPI Backend), and delivery timeline.

## 2. Frontend Development (React + TypeScript)
- **Goal:** Generate modular React components (`Display`, `Keypad`, `History`, `api.ts`, `App.tsx`) with dark-mode Tailwind CSS styling, responsive layout, and keyboard listener support.
- *[Insert the Prompt from above here]*

## 3. Backend Development & Unit Testing
- **Goal:** Implement clean mathematical logic in Python (`calculator.py`), write unit tests using `pytest` (including edge cases like division by zero), and set up REST API endpoints with FastAPI and Pydantic validation.