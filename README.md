# Calculator App

A calculator web application with a React and TypeScript frontend and a FastAPI
backend. The frontend sends calculations to the backend over HTTP.

## Requirements

- Python 3 and `pip`
- Node.js and `npm` (use a Node.js version supported by the Vite version in
  `frontend/package-lock.json`)

## Design Decisions & Assumptions

 **- Python (FastAPI) over Go**: Python with FastAPI was selected to prioritize rapid development, strict runtime type safety (via Pydantic), and high maintainability, ensuring full test coverage within the ~2–4 hour window.

 **- Decoupled Business Logic**: The arithmetic core (app/calculator.py) is decoupled from the web layer (app/main.py), making domain logic lightweight and directly testable without mocking HTTP contexts.

 **- Stateless Microservice**: The backend handles calculations statelessly. State management (e.g., input staging and history log) is handled on the React client side.

 **- Explicit Error Handling**: Edge cases like division by zero or negative square roots raise ValueError in the domain layer, which FastAPI intercepts to produce clean 400 Bad Request HTTP responses.

 **- Binary Percentage Calculation**: Percentage calculates $b\%$ of $a$ using $(a \times b) / 100$, matching standard commercial calculator behavior.

 **- Type Safety**: Vite + React with strict TypeScript typing (types.ts) ensures end-to-end type safety between frontend operations and backend API contracts.


## Run the backend

Open a terminal at the repository root and run:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r .\app\requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API is available at `http://localhost:8000`. The interactive API
documentation is at `http://localhost:8000/docs`.

To run the backend tests, open a separate terminal at the repository root:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m pytest app\tests
```

## Run the frontend

Keep the backend running, then open a second terminal at the repository root:

```powershell
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite (the configured development port is
`3000`, usually `http://localhost:3000`).

The frontend uses `http://localhost:8000/api` as its API base URL by default.
If the backend is running at another address, create `frontend/.env.local` with
the following setting, replacing the URL as needed:

```dotenv
VITE_API_URL=http://localhost:8000/api
```

Restart the Vite development server after changing this setting.

## Build the frontend

From the `frontend` directory:

```powershell
npm run build
npm run preview
```

`npm run build` type-checks the TypeScript application and creates the
production build in `frontend/dist`. `npm run preview` serves that build
locally.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Returns the API health status. |
| `POST` | `/api/calculate` | Performs a calculation and returns its numeric result. |

Example request to `POST /api/calculate`:

```json
{
  "operation": "add",
  "a": 2,
  "b": 3
}
```

The response is shaped as `{"result": 5}`. Supported operations are `add`,
`subtract`, `multiply`, `divide`, `power`, `sqrt`, and `percentage`. The
calculator UI uses `sqrt` with one operand; the other operations in the UI use
two operands. Division by zero and square roots of negative numbers return a
client error.

## Project layout

```text
backend/
  app/
    calculator.py       # Arithmetic functions
    main.py             # FastAPI application and API routes
    requirements.txt    # Backend runtime and test dependencies
    tests/              # Backend unit tests
frontend/
  src/
    components/         # Calculator display, keypad, and history
    services/api.ts     # HTTP client for the calculator API
    App.tsx             # Calculator state and UI
  package.json          # Frontend scripts and dependencies
PROMPTS.md              # Log of AI prompts used during development
README.md               # Setup instructions and documentation
```

## Test Coverage

To generate the backend unit test coverage report, run `pytest` with the `coverage` plugin:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m pytest --cov=app app/tests