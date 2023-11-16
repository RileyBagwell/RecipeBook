import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const App = require('./App.js');

describe('AppTest', () => {
    let pc;

    beforeEach(() => {
        pc = new App();
    });

    test('TC1', () => {
        expect(pc.adder('Henry123', 'theKing.23')).toBe('Login Successful');
    });

    test('TC2', () => {
      expect(pc.adder('Henry123', 'FURball;99')).toBe('Wrong Password, please try again');
    });

    test('TC3', () => {
    expect(pc.adder('Henry123', 'theKing.23/thekingthekingthekingtheki')).toBe('Password is in incorrect format');
    });

    test('TC4', () => {
      expect(pc.adder('foodLover7', 'theKing.23')).toBe('Unrecognized username');
    });

    test('TC5', () => {
        expect(pc.adder('H', 'theKing.23')).toBe('Username is in incorrect format');
    });
});