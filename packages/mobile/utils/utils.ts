export function makeUrl(path: string) {
	return new URL(path, process.env.EXPO_PUBLIC_API_HOST).toString();
}

export function authHeader(token: string) {
	return { Authorization: `Bearer ${token}` };
}
