import OAuthButton from "@/components/OAuthButton";
import { custom } from "@/constants/styles";
import { useApiInitializer } from "@/hooks/useApiInitializer";
import { useModals } from "@/stores/modalsStore";
import { makeUrl } from "@/utils/utils";
import type { APIPostLoginBody, APIPostLoginResult, ErrorObject } from "@khsw-learning-platform/shared";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { fetch } from "expo/fetch";
import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
	const router = useRouter();
	const modals = useModals();
	const { initializeWithResult } = useApiInitializer();
	const loginInputRef = useRef<TextInput | null>(null);
	const passwordInputRef = useRef<TextInput | null>(null);

	const [loginValue, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const mutation = useMutation({
		mutationFn: async (data: APIPostLoginBody) => {
			const result = await fetch(makeUrl("/auth/login"), {
				body: JSON.stringify(data),
				method: "POST",
			});

			return { result, json: await result.json() };
		},
		async onSuccess(data, variables, context) {
			if (!data.result.ok) {
				const error = data.json as ErrorObject;
				modals.setModal("info", { isOpen: true, title: error.code, body: error.field, type: "error" });
				return;
			}

			const result = data.json as APIPostLoginResult;
			await initializeWithResult(result);

			router.navigate("/home");
		},
	});

	function login() {
		mutation.mutate({ username: loginValue, email: loginValue, password: password });
	}

	return (
		<View className="h-full justify-center bg-gray-200">
			<View className="mx-10 items-center justify-center">
				<View className="mb-10">
					<Text className="mb-2 text-center font-bold text-5xl">Nochmals Hallo!</Text>
					<Text className="text-center text-2xl">Wir freuen uns, Sie auf der KHSW-Lernplattform wiederzusehen!</Text>
				</View>
				<View className="mb-10 w-full gap-y-4">
					<TextInput
						ref={loginInputRef}
						submitBehavior="submit"
						returnKeyType="next"
						placeholder="E-Mail Adresse / Benutzername"
						className="w-full rounded-2xl bg-white p-5"
						autoCapitalize="none"
						onSubmitEditing={() => passwordInputRef.current?.focus()}
						onChangeText={(text) => setLogin(text)}
					/>
					<TextInput
						ref={passwordInputRef}
						secureTextEntry
						placeholder="Passwort"
						autoCapitalize="none"
						className="w-full rounded-2xl bg-white p-5"
						onChangeText={(text) => setPassword(text)}
					/>
				</View>
				<Pressable onPressIn={login} className="w-full rounded-2xl bg-rose-500 px-5 py-5 active:opacity-50" style={custom.authButtonShadow}>
					<Text className="text-center text-white">Anmelden</Text>
				</Pressable>
				<View className="mx-5 my-10 flex-row items-center justify-center gap-x-5">
					<View className="h-0.5 w-full shrink bg-gray-500 " />
					<Text className="text-gray-600 leading-none">Oder weiter mit</Text>
					<View className="h-0.5 w-full shrink bg-gray-500 " />
				</View>
				<View className="w-full flex-row justify-around gap-x-5">
					<OAuthButton iconName="flat-color-icons:google" />
				</View>
			</View>
			<View className="absolute inset-x-0 bottom-16 flex-row justify-center">
				<Text>Sie sind noch kein Mitglied?</Text>
				<Link className="text-blue-600" href="/register">
					{" "}
					Jetzt registrieren!
				</Link>
			</View>
		</View>
	);
}
