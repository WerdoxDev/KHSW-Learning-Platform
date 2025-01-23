import type { ReactNode } from "react";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";

const store = createStore(
	combine(
		{
			info: {
				isOpen: false,
				type: "info" as "info" | "error",
				title: "" as string,
				body: {} as ReactNode,
			},
		},
		(set, get) => ({
			setModal: <Modal extends "info">(modal: Modal, data: Partial<ReturnType<typeof get>[Modal]>) =>
				set((old) => ({ [modal]: { ...old[modal], ...data } })),
		}),
	),
);

export function useModals() {
	return useStore(store);
}
