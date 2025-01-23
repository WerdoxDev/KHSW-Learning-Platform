import { useModals } from "@/stores/modalsStore";
import { clsx } from "clsx";
import { type ReactNode, useEffect } from "react";
import { BackHandler, Pressable, Text, View } from "react-native";

export default function BaseModal(props: { modalKey: "info"; children: ReactNode; className?: string }) {
	const modals = useModals();

	function onBack() {
		if (modals[props.modalKey].isOpen) {
			modals.setModal(props.modalKey, { isOpen: false });
			return true;
		}

		return false;
	}

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", onBack);

		return () => backHandler.remove();
	});

	return (
		<Pressable className="absolute inset-0 justify-center bg-black/20" onPress={() => modals.setModal(props.modalKey, { isOpen: false })}>
			<Pressable onPress={() => {}}>
				<View className={clsx("mx-5 rounded-lg bg-white p-5 shadow-md", props.className)}>{props.children}</View>
			</Pressable>
		</Pressable>
	);
}
