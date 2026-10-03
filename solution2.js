function diffObjects(oldObj, newObj) {
  const added = {};
  const removed = {};
  const changed = {};

  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  // Keys in newObj but not in oldObj → added
  for (const key of newKeys) {
    if (!Object.prototype.hasOwnProperty.call(oldObj, key)) {
      added[key] = newObj[key];
    }
  }

  // Keys in oldObj but not in newObj → removed
  for (const key of oldKeys) {
    if (!Object.prototype.hasOwnProperty.call(newObj, key)) {
      removed[key] = oldObj[key];
    }
  }

  // Keys in both but different values → changed
  for (const key of oldKeys) {
    if (
      Object.prototype.hasOwnProperty.call(newObj, key) &&
      oldObj[key] !== newObj[key]
    ) {
      changed[key] = { from: oldObj[key], to: newObj[key] };
    }
  }

  return { added, removed, changed };
}

// Test
console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
));
// {
//   added: { city: 'Kingston' },
//   removed: { country: 'Jamaica' },
//   changed: { role: { from: 'Engineer', to: 'Senior Engineer' } }
// }