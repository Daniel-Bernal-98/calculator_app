def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(a, b):
    return a ** b

def square_root(a):
    if a < 0:
        raise ValueError("Cannot take square root of a negative number")
    return a ** 0.5

def percentage(a, b):
    if b == 0:
        raise ValueError("Denominator cannot be zero")
    return (a * b) / 100

def dispatch_operation(operation, a, b=None):
    if operation == 'add':
        return add(a, b)
    elif operation == 'subtract':
        return subtract(a, b)
    elif operation == 'multiply':
        return multiply(a, b)
    elif operation == 'divide':
        return divide(a, b)
    elif operation == 'power':
        return power(a, b)
    elif operation == 'square_root':
        return square_root(a)
    elif operation == 'percentage':
        return percentage(a, b)
    else:
        raise ValueError("Invalid operation")