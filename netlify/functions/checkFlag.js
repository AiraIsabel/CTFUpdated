const crypto = require('crypto');

// Define the correct hashes and salts for each level
const level1Hash = 'ec4fbc87fabefbf59cc72492b0f273e7889e7c137fc5e3c406ae27515845ddc5';
const level1Salt = 'salt123';

const level2Hash = '574d7ef857e2b7ee959f4dc28569151490c767c3356e3c0ea6235c2088b34c7d';
const level2Salt = 'level2';

// Main handler function
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { flag, level } = JSON.parse(event.body); // Parse flag and level from the request body

    if (level === '1') {
      const input = flag + level1Salt; // Concatenate flag and salt
      const hash = crypto.createHash('sha256').update(input).digest('hex'); // Generate SHA-256 hash
      return {
        statusCode: 200,
        body: JSON.stringify({ correct: hash === level1Hash }), // Compare with the stored hash
      };
    }

    if (level === '2') {
      const input = flag + level2Salt; // Concatenate flag and salt
      const hash = crypto.createHash('sha256').update(input).digest('hex'); // Generate SHA-256 hash
      return {
        statusCode: 200,
        body: JSON.stringify({ correct: hash === level2Hash }), // Compare with the stored hash
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid level' }) }; // Invalid level

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server Error' }) }; // Handle errors
  }
};
