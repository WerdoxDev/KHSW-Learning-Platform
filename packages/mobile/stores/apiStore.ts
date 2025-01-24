import type { APIUser } from "@khsw-learning-platform/shared";
import * as SecureStore from "expo-secure-store";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";

const store = createStore(
	combine(
		{
			accessToken: null as string | null,
			refreshToken: null as string | null,
			user: undefined as APIUser | undefined,
		},
		(set) => ({
			setTokens: async (accessToken?: string | null, refreshToken?: string | null) => {
				set({ accessToken, refreshToken });

				if (accessToken) {
					await SecureStore.setItemAsync("accessToken", accessToken);
				}
				if (refreshToken) {
					await SecureStore.setItemAsync("refreshToken", refreshToken);
				}
			},
			setUser: (user: APIUser) => {
				set({ user });
			},
		}),
	),
);

export function useApi() {
	return useStore(store);
}
