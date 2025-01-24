import type { Snowflake } from "@khsw-learning-platform/shared";
import { H3Error } from "h3";

export enum DBErrorType {
	INVALID_ID = "INVALID_ID",
	NULL_USER = "NULL_USER",
}

export class DBError extends Error {
	public constructor(
		public callerName: string,
		public type: DBErrorType,
		public cause?: string,
	) {
		super(`Unhandeled Database Error => ${callerName} => ${type}: ${cause ? `(${cause})` : ""}`, {
			cause: cause,
		});
	}

	isErrorType(type: DBErrorType): boolean {
		return this.type === type;
	}
}

export function isDBError(object: unknown): object is DBError {
	if (object !== null && typeof object === "object" && object instanceof DBError) {
		return true;
	}

	return false;
}

export function assertId(methodName: string, ...ids: (Snowflake | undefined)[]) {
	let lastValidIndex = -1;
	try {
		for (const [i, id] of ids.entries()) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			BigInt(id!);
			lastValidIndex = i;
		}
	} catch (e) {
		throw createError({ cause: new DBError(methodName, DBErrorType.INVALID_ID, ids[lastValidIndex + 1]) });
	}
}

export function assertObj(methodName: string, obj: unknown, errorType: DBErrorType, cause?: string) {
	if (obj === null || typeof obj !== "object") {
		throw createError({ cause: new DBError(methodName, errorType, cause) });
	}
}

export function assertError(error: Error | null, type: DBErrorType) {
	let actualError = error;
	if (error instanceof H3Error) {
		actualError = error.cause as DBError;
	}

	return actualError && isDBError(actualError) && actualError.isErrorType(type);
}
