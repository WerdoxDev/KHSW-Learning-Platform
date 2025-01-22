import { randomBytes } from "node:crypto";

function generateJwtSecret(length = 64) {
	// Generate a random string of the specified length
	return randomBytes(length).toString("hex");
}

const jwtSecret = generateJwtSecret();
console.log("JWT Secret:", jwtSecret);
