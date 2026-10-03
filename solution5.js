function validateSchema(obj, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    // Missing property
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      errors.push(`${key}: missing property`);
      continue;
    }

    // Wrong type
    if (typeof obj[key] !== expectedType) {
      errors.push(`${key}: expected ${expectedType}, got ${typeof obj[key]}`);
    }
  }

  return errors;
}

// Tests
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' };

console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema));
// []

console.log(validateSchema({ name: 'Ada', age: '21' }, schema));
// ['age: expected number, got string', 'isAdmin: missing property']