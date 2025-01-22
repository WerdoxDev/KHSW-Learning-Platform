import type { Snowflake } from "./snowflake";

export type APIUser = {
	id: Snowflake;
	username: string;
	email: string;
	password?: string | null;
};

export type Tokens = { accessToken: string; refreshToken: string };

export type APIPostLoginBody = {
	email?: string;
	username?: string;
	password: string;
};

export type APIPostRegisterBody = {
	email: string;
	username: string;
	password: string;
};

export type APIPostLoginResult = APIUser & Tokens;
export type APIPostRegisterResult = APIUser & Tokens;
