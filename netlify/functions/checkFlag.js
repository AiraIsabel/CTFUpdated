const crypto = require('crypto');

const correctHash = 'ec4fbc87fabefbf59cc72492b0f273e7889e7c137fc5e3c406ae27515845ddc5';
const salt = 'salt123';

exports.handler = async (event, context) => {
if (event.httpMethod !== 'POST') {
return {
statusCode: 405,
body: JSON.stringify({ error: 'Method Not Allowed' }),
};
}

try {
const { flag } = JSON.parse(event.body);

```
const input = flag + salt;
const hash = crypto.createHash('sha256').update(input).digest('hex');

const correct = (hash === correctHash);

return {
  statusCode: 200,
  body: JSON.stringify({ correct }),
};
```

} catch (err) {
return {
statusCode: 500,
body: JSON.stringify({ error: 'Server Error' }),
};
}
};
