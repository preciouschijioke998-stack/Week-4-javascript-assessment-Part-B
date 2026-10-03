function deepFreeze(obj) {
  // Freeze the top level
  Object.freeze(obj);

  // Recursively freeze nested objects
  Object.values(obj).forEach((value) => {
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function') &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  });

  return obj;
}

// Test
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false });
config.api.baseUrl = 'https://changed.com'; // ignored
config.debug = true;                        // ignored
console.log(config.api.baseUrl, config.debug); // "https://x.com" false
console.log(Object.isFrozen(config.api));    // true