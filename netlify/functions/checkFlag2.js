const crypto = require("crypto");

const correctHash = "f5a7bb1be9d640bb35a4dbda52f9c91be101d8c7eb30d6bfc3a020e48f54d4b2";

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { flag } = JSON.parse(event.body);
    const inputHash = crypto
      .createHash("sha256")
      .update(flag.trim())
      .digest("hex");

    const correct = inputHash === correctHash;

    return {
      statusCode: 200,
      body: JSON.stringify({ correct }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error" }),
    };
  }
};
