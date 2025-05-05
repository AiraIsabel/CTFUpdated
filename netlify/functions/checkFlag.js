const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    const { flag, level } = JSON.parse(event.body || "{}");

    if (!flag || !level) {
      return {
        statusCode: 400,
        body: JSON.stringify({ correct: false, error: "Missing flag or level." })
      };
    }

    let correct = false;

    if (parseInt(level) === 1) {
      // Level 1: salted SHA-256 hash
      const password = flag;
      const salt = "C7F82";
      const hash = crypto.createHash("sha256").update(password + salt).digest("hex");

      const expectedHash = "e95a48fa2e7c364f3dc2bdc13c816f05bbd5b8ec5358a7b04ed2ed7aa3673174"; // correct hash of "hamSandwich14325C7F82"

      correct = hash === expectedHash;
    }

    if (parseInt(level) === 2) {
      // Level 2: Double Base64 encoded string with noise
      const expectedDecodedMessage = "this1sCryptography";
      correct = flag.trim() === expectedDecodedMessage;
    }

    if (parseInt(level) === 3) {
      // Will be added later
      correct = false;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ correct })
    };

  } catch (error) {
    console.error("Error in checkFlag:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ correct: false, error: "Server error" })
    };
  }
};
