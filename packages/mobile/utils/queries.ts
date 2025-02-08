import { apiStore } from "@/stores/apiStore";
import type { APIGetCoursesResult } from "@khsw-learning-platform/shared";
import { queryOptions } from "@tanstack/react-query";
import { fetch } from "expo/fetch";
import { authHeader, makeUrl } from "./utils";

export function coursesOptions() {
	return queryOptions({
		queryKey: ["courses"],
		queryFn: async () => {
			const accessToken = apiStore.getState().accessToken;
			if (!accessToken) return null;

			return (await (await fetch(makeUrl("/courses"), { method: "GET", headers: authHeader(accessToken) })).json()) as APIGetCoursesResult;
		},
	});
}

export function myCoursesOptions() {
	return queryOptions({
		queryKey: ["my-courses"],
		queryFn: async () => {
			const accessToken = apiStore.getState().accessToken;
			if (!accessToken) return null;

			return (await (await fetch(makeUrl("/my-courses"), { method: "GET", headers: authHeader(accessToken) })).json()) as APIGetCoursesResult;
		},
	});
}
