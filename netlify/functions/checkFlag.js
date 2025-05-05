const crypto = require('crypto');

// Level 1 - Salted SHA-256 Hash
const level1Hash = 'ec4fbc87fabefbf59cc72492b0f273e7889e7c137fc5e3c406ae27515845ddc5';
const level1Salt = 'salt123';

// Level 2 - Salted SHA-256 Hash
const level2Hash = '574d7ef857e2b7ee959f4dc28569151490c767c3356e3c0ea6235c2088b34c7d';
const level2Salt = 'level2';

// Level 3 - RSA Encryption
const rsaPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCHkpzZj7xMIt9Z7UpmctMjq/fZp6gkq45mHnGBJ+9dYm72xeHe
...
<your private key here>
-----END RSA PRIVATE KEY-----`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { flag, level } = JSON.parse(event.body);

    if (level === '1') {
      const input = flag + level1Salt;
      const hash = crypto.createHash('sha256').update(input).digest('hex');
      return {
        statusCode: 200,
        body: JSON.stringify({ correct: hash === level1Hash }),
      };
    }

    if (level === '2') {
      const input = flag + level2Salt;
      const hash = crypto.createHash('sha256').update(input).digest('hex');
      return {
        statusCode: 200,
        body: JSON.stringify({ correct: hash === level2Hash }),
      };
    }

    if (level === '3') {
      // Check if the decrypted flag matches the expected flag
      const expectedFlag = 'CTFCrypto_complete'; // The flag you set in Level 3
      return {
        statusCode: 200,
        body: JSON.stringify({ correct: decryptedFlag === expectedFlag }),
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid level' }) };

  } catch (err) {
    console.error(err); // Log error to the server logs for debugging
    return { statusCode: 500, body: JSON.stringify({ error: 'Server Error' }) };
  }
};
