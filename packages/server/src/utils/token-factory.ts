import type { Snowflake } from "@khsw-learning-platform/shared";
import * as jose from "jose";

export const ACCESS_TOKEN_SECRET_ENCODED = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET ?? "");
export const REFRESH_TOKEN_SECRET_ENCODED = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET ?? "");

export async function createTokens(payload: { id: Snowflake }): Promise<[string, string]> {
	const accessToken = await new jose.SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("1d")
		.setIssuedAt()
		.sign(ACCESS_TOKEN_SECRET_ENCODED);

	const refreshToken = await new jose.SignJWT({ id: payload.id })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("7d")
		.sign(REFRESH_TOKEN_SECRET_ENCODED);

	return [accessToken, refreshToken];
}

export async function verifyToken(token: string, secret: Uint8Array = ACCESS_TOKEN_SECRET_ENCODED) {
	try {
		if (tokenInvalidator.isInvalid(token)) {
			return { valid: false, payload: null };
		}

		const jwt = await jose.jwtVerify<{ id: Snowflake }>(token, secret);

		if (!("id" in jwt.payload)) {
			return { valid: false, payload: null };
		}

		return { valid: true, payload: jwt.payload };
	} catch (e) {
		return { valid: false, payload: null };
	}
}
