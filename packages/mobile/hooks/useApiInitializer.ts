import { useApi } from "@/stores/apiStore";
import { authHeader, makeUrl } from "@/utils/utils";
import type { APIPostLoginResult, APIPostRefreshTokenResult, APIPostRegisterResult } from "@khsw-learning-platform/shared";
import { useMutation } from "@tanstack/react-query";
import { fetch } from "expo/fetch";

export function useApiInitializer() {
	const api = useApi();

	const refreshTokenMutation = useMutation({
		async mutationFn(data: { refreshToken: string }) {
			const result = await fetch(makeUrl("/auth/refresh-token"), { body: JSON.stringify({ refreshToken: data.refreshToken }), method: "POST" });
			return (await result.json()) as APIPostRefreshTokenResult;
		},
		onError(error) {
			console.error(error);
		},
	});

	const getUserMutation = useMutation({
		async mutationFn(data: { accessToken: string }) {
			const result = await fetch(makeUrl("/user/current"), { headers: authHeader(data.accessToken) });
			return await result.json();
		},
	});

	async function initializeWithResult(result?: APIPostLoginResult | APIPostRegisterResult) {
		if (!result) {
			return;
		}

		await api.setTokens(result.accessToken, result.refreshToken);
		api.setUser(result);
	}

	async function initializeWithToken() {
		const { accessToken, refreshToken } = await api.getTokens();

		if (refreshToken) {
			const tokens = await refreshTokenMutation.mutateAsync({ refreshToken });
			await api.setTokens(tokens.accessToken, tokens.refreshToken);
			const user = await getUserMutation.mutateAsync({ accessToken: tokens.accessToken });
			api.setUser(user);

			return true;
		}

		return false;
	}

	return { initializeWithResult, initializeWithToken };
}
