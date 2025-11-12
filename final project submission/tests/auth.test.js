const jwt = require('jsonwebtoken');

test('sign and verify token', () => {
  const token = jwt.sign({ id: '123' }, 'secret', { expiresIn: '1h' });
  const decoded = jwt.verify(token, 'secret');
  expect(decoded.id).toBe('123');
});
