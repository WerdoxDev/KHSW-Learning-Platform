export const permissions = {
	DEFAULT: 1,
	CREATE_COURSE: 2,
} as const;

Object.freeze(permissions);

export function getPermissions(permission: number) {
	const userPermissions: Record<keyof typeof permissions, boolean> = { CREATE_COURSE: false, DEFAULT: false };

	for (const key of Object.keys(userPermissions)) {
		const castedKey = key as keyof typeof permissions;
		if (permission & permissions[castedKey]) {
			userPermissions[castedKey] = true;
		}
	}

	return userPermissions;
}

export function hasPermission(userPermissions: number, permissionToCheck: number) {
	return !!(userPermissions & permissionToCheck);
}
