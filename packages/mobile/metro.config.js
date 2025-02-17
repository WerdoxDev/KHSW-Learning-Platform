// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withMonicon } = require("@monicon/metro");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.blockList = [/@monicon\/runtime/].concat(config.resolver.blockList);

const configWithMonicon = withMonicon(config, {
	icons: ["flat-color-icons:google"],
	// Load all icons from the listed collections
	collections: ["mingcute"],
});

const configWithNativeWind = withNativeWind(configWithMonicon, {
	input: "./global.css",
});

module.exports = configWithNativeWind;
