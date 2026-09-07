import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
	theme: {
		tokens: {
			colors: {
				navy: {
					value: "#0B0D1A",
				},
				navyLight: {
					value: "#19193d",
				},
				purple: {
					value: "#A08FF9",
				},
				purpleBright: {
					value: "#cc9fffde",
				},
				paleLavender: {
					value: "#d4d1fc",
				},
				green: {
					value: "#39FF14",
				},
				pink: {
					value: "#E770E2",
				},
				cream: {
					value: "#E8E5DF",
				},
			},
			fonts: {
				branding: {
					value: "Metal Mania, sans-serif",
				},
				mainFont: {
					value: "Forum, serif",
				},
				accentFont: {
					value: "Bona Nova SC, serif",
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, customConfig);
