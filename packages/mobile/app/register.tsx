import OAuthButton from "@/components/OAuthButton";
import { custom } from "@/constants/styles";
import { useApiInitializer } from "@/hooks/useApiInitializer";
import { useModals } from "@/stores/modalsStore";
import { makeUrl } from "@/utils/utils";
import type { APIPostRegisterBody, APIPostRegisterResult, ErrorObject } from "@khsw-learning-platform/shared";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { fetch } from "expo/fetch";
import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Register() {
	const router = useRouter();
	const modals = useModals();
	const { initializeWithResult } = useApiInitializer();
	const usernameInputRef = useRef<TextInput | null>(null);
	const emailInputRef = useRef<TextInput | null>(null);
	const passwordInputRef = useRef<TextInput | null>(null);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const mutation = useMutation({
		mutationFn: async (data: APIPostRegisterBody) => {
			const result = await fetch(makeUrl("auth/register"), {
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

			const result = data.json as APIPostRegisterResult;
			await initializeWithResult(result);

			router.navigate("/home");
		},
	});

	function register() {
		mutation.mutate({ username: username, password: password, email: email });
	}

	return (
		<View className="h-full justify-center bg-gray-200">
			<View className="mx-10 items-center justify-center">
				<View className="mb-10">
					<Text className="mb-2 text-center font-bold text-5xl">Hallo!</Text>
					<Text className="text-center text-2xl">Willkomen auf der KHSW-Lernplattform!</Text>
				</View>
				<View className="mb-10 w-full gap-y-4">
					<TextInput
						ref={usernameInputRef}
						submitBehavior="submit"
						returnKeyType="next"
						autoCapitalize="none"
						placeholder="Benutzername"
						className="w-full rounded-2xl bg-white p-5"
						onSubmitEditing={() => emailInputRef.current?.focus()}
						onChangeText={(text) => setUsername(text)}
					/>
					<TextInput
						ref={emailInputRef}
						submitBehavior="submit"
						autoCapitalize="none"
						keyboardType="email-address"
						returnKeyType="next"
						placeholder="E-Mail Adresse"
						className="w-full rounded-2xl bg-white p-5"
						onSubmitEditing={() => passwordInputRef.current?.focus()}
						onChangeText={(text) => setEmail(text)}
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
				<Pressable onPress={register} className="w-full rounded-2xl bg-rose-500 px-5 py-5 active:opacity-50" style={custom.authButtonShadow}>
					<Text className="text-center text-white">Registrieren</Text>
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
				<Text>Sie sind schon Mitglied?</Text>
				<Link className="text-blue-600" href="/login">
					{" "}
					Jetzt anmelden!
				</Link>
			</View>
		</View>
	);
}
