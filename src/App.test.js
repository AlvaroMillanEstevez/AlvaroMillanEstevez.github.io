import { fireEvent, render, screen } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import App from './App';

jest.mock('@emailjs/browser', () => ({ __esModule: true, default: { send: jest.fn() } }));
// A plain class, because CRA resets jest.fn implementations before each test.
jest.mock('lenis', () => ({
  __esModule: true,
  default: class {
    start() {}
    stop() {}
    destroy() {}
    scrollTo() {}
  }
}));

const fillForm = (values) => {
  Object.entries(values).forEach(([name, value]) => {
    fireEvent.change(document.querySelector(`[name="${name}"]`), { target: { value } });
  });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
};

const validValues = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Hello',
  message: 'This is a test message.'
};

beforeEach(() => {
  emailjs.send.mockReset();
  window.localStorage.clear();
});

test('renders the hero heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/building software/i);
});

test('exposes no email address or phone link in the page', () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  expect(container.querySelector('a[href^="mailto:"], a[href^="tel:"]')).toBeNull();
});

test('does not send when the honeypot field is filled', () => {
  render(<App />);
  fireEvent.change(document.querySelector('[name="website"]'), { target: { value: 'spam' } });
  fillForm(validValues);
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('validates the email address before sending', () => {
  render(<App />);
  fillForm({ ...validValues, email: 'not-an-email' });
  expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  expect(emailjs.send).not.toHaveBeenCalled();
});

test('limits fields to their maximum length', () => {
  render(<App />);
  expect(document.querySelector('[name="name"]')).toHaveAttribute('maxLength', '100');
  expect(document.querySelector('[name="message"]')).toHaveAttribute('maxLength', '5000');
});
