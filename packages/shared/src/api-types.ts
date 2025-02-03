import type { Snowflake } from "./snowflake";

export type TokenPayload = { id: Snowflake; permissions: number };

export type APIUser = {
	id: Snowflake;
	username: string;
	email: string;
	password?: string | null;
	permissions: number;
};

export type APIPublicUser = Pick<APIUser, "id" | "username">;

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

export type APIPostRefreshTokenResult = Tokens;
export type APIGetCurrentUserResult = APIUser;

export type APICourse = {
	id: Snowflake;
	name: string;
	imageUrl: string;
	author: APIPublicUser;
};

export type APIPostCourseResult = APICourse;
export type APIPostCourseBody = {
	name: string;
	imageUrl: string;
};

export type APIGetCoursesResult = APICourse[];

export type APIChapter = {
	id: Snowflake;
	name: string;
	order: number;
	courseId: Snowflake;
};

export type APIPostChapterBody = {
	name: string;
	order: number;
};

export type APIPostChapterResult = APIChapter;

export enum ContentType {
	VIDEO = 0,
	TEXT = 1,
}

export type APIContent = {
	id: Snowflake;
	name: string;
	type: ContentType;
	chapterId: Snowflake;
};

export type APIPostContentResult = APIContent;
export type APIPostContentBody = {
	name: string;
	type: number;
	chapterId: string;
};
