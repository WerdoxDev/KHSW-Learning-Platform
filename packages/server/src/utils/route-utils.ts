import type { TokenPayload } from "@khsw-learning-platform/shared";
import { type H3Event, createError, getQuery, getRouterParams, readBody } from "h3";
import { ZodError, type z } from "zod";
import { prisma } from "~~/prisma/database";
import { createCustomError, unauthorized } from "./errors";
import { hasPermission } from "./permission";

export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	NOT_MODIFIED = 304,
	FOUND = 302,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	TOO_MANY_REQUESTS = 429,
	GATEWAY_UNAVAILABLE = 502,
	NOT_IMPLEMENTED = 501,
	SERVER_ERROR = 500,
}

export async function useValidatedBody<T extends z.ZodTypeAny>(schema: T): Promise<z.infer<T>> {
	const event = useEvent();
	try {
		const body = await readBody(event);
		const parsedBody = await schema.parse(body);
		return parsedBody;
	} catch (e) {
		if (e instanceof ZodError) {
			const issue = e.issues[0];

			throw createCustomError(issue.code, issue.message, issue.path.join("."));
		}
		// throw invalidBody();
	}
}

export async function useValidatedParams<T extends z.ZodTypeAny>(event: H3Event, schema: T): Promise<z.infer<T>> {
	try {
		const params = getRouterParams(event);
		const parsedParams = await schema.parse(params);
		return parsedParams;
	} catch (e) {
		throw createError({ statusCode: 404 });
	}
}

export async function useValidatedQuery<T extends z.ZodTypeAny>(event: H3Event, schema: T): Promise<z.infer<T>> {
	try {
		const query = getQuery(event);
		const parsedQuery = await schema.parse(query);
		return parsedQuery;
	} catch (e) {
		throw createError({ statusCode: 404 });
	}
}

export async function useVerifiedJwt() {
	const event = useEvent();
	const bearer = getHeader(event, "Authorization");

	if (!bearer) {
		throw unauthorized();
	}

	const token = bearer.split(" ")[1];

	const { valid, payload } = await verifyToken(token);

	if (!valid || !payload) {
		throw unauthorized();
	}

	if (!(await prisma.user.exists({ id: BigInt(payload.id) }))) {
		throw unauthorized();
	}

	return { payload, token };
}

export function useCheckPermission(tokenPayload: TokenPayload, permission: number) {
	const valid = hasPermission(tokenPayload.permissions, permission);

	if (!valid) {
		throw unauthorized();
	}
}

export async function catchError<T>(fn: (() => Promise<T>) | (() => T)): Promise<[Error, null] | [null, T]> {
	try {
		return [null, await fn()];
	} catch (e) {
		return [e as Error, null];
	}
}
