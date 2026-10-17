import pytest

from app.calculator import add, subtract, multiply, divide, power, square_root, percentage
def test_addition():
    assert add(2, 3) == 5

def test_subtraction():
    assert subtract(5, 3) == 2

def test_multiplication():
    assert multiply(3, 4) == 12

def test_division():
    assert divide(10, 2) == 5
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)  # Test division by zero

def test_power():
    assert power(2, 3) == 8

def test_square_root():
    assert square_root(25) == 5
    with pytest.raises(ValueError, match="Cannot take square root of a negative number"):
        square_root(-4)  # Test square root of a negative number

def test_percentage():
    assert percentage(100, 50) == 50
    with pytest.raises(ValueError, match="Denominator cannot be zero"):
        percentage(10, 0)  # Test zero denominator