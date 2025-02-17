import type { APIUser } from "@khsw-learning-platform/shared";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";

export const apiStore = createStore(
	combine(
		{
			accessToken: null as string | null,
			refreshToken: null as string | null,
			user: undefined as APIUser | undefined,
		},
		(set, get) => ({
			setTokens: async (accessToken?: string | null, refreshToken?: string | null) => {
				set({ accessToken, refreshToken });

				if (accessToken) {
					if (Platform.OS === "web") {
						localStorage.setItem("accessToken", accessToken);
					} else {
						await SecureStore.setItemAsync("accessToken", accessToken);
					}
				}
				if (refreshToken) {
					if (Platform.OS === "web") {
						localStorage.setItem("refreshToken", refreshToken);
					} else {
						await SecureStore.setItemAsync("refreshToken", refreshToken);
					}
				}
			},
			resetTokens: async () => {
				set({ accessToken: null, refreshToken: null });

				if (Platform.OS === "web") {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
				} else {
					await SecureStore.deleteItemAsync("accessToken");
					await SecureStore.deleteItemAsync("refreshToken");
				}
			},
			getTokens: async () => {
				if (Platform.OS === "web") {
					return { accessToken: localStorage.getItem("accessToken"), refreshToken: localStorage.getItem("refreshToken") };
				}

				return { accessToken: await SecureStore.getItemAsync("accessToken"), refreshToken: await SecureStore.getItemAsync("refreshToken") };
			},
			setUser: (user: APIUser) => {
				set({ user });
			},
		}),
	),
);

export function useApi() {
	return useStore(apiStore);
}
