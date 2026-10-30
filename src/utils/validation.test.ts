import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, validateContactForm, sanitizeInput, createMailtoUrl } from './validation';

test('isValidEmail accepts valid email formats', () => {
  assert.equal(isValidEmail('user@example.com'), true);
  assert.equal(isValidEmail('nithiarasu248@gmail.com'), true);
  assert.equal(isValidEmail('test.name+tag@sub.domain.co'), true);
});

test('isValidEmail rejects malformed or empty inputs', () => {
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('user@domain'), false);
  assert.equal(isValidEmail('user@.com'), false);
  assert.equal(isValidEmail('   '), false);
});

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    message: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('validateContactForm accepts complete valid inputs', () => {
  const result = validateContactForm({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    message: 'Hello Nithiarasu, I loved your PocketSmart AI project and want to collaborate!',
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateContactForm flags short name or message', () => {
  const result = validateContactForm({
    name: 'A',
    email: 'alex@example.com',
    message: 'Short',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, 'Name must be at least 2 characters long.');
  assert.equal(result.errors.message, 'Message must be at least 10 characters long.');
});

test('sanitizeInput strips angle brackets to prevent html injection', () => {
  assert.equal(sanitizeInput('<script>alert(1)</script>hello'), 'scriptalert(1)/scripthello');
  assert.equal(sanitizeInput('   Hello World!  '), 'Hello World!');
});

test('createMailtoUrl properly encodes subject, body and recipient', () => {
  const url = createMailtoUrl({
    name: 'Jane Doe',
    email: 'jane@example.com',
    service: 'Personal Portfolio Websites',
    message: 'Hello Nithiarasu, I need a website with AI & React!',
  });

  assert.ok(url.startsWith('mailto:nithiarasu248%40gmail.com?subject='));
  assert.ok(url.includes('Portfolio%20Inquiry%20-%20WHITEe.CODES'));
  assert.ok(url.includes('Visitor%20Name%3A%20Jane%20Doe'));
  assert.ok(url.includes('Visitor%20Email%3A%20jane%40example.com'));
  assert.ok(url.includes('Selected%20Service%3A%20Personal%20Portfolio%20Websites'));
  assert.ok(url.includes('Visitor%20Message%3A'));
  assert.ok(url.includes('Hello%20Nithiarasu%2C%20I%20need%20a%20website%20with%20AI%20%26%20React!'));
});
