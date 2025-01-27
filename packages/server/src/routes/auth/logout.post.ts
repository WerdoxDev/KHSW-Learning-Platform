export default defineEventHandler(async (event) => {
	const { token } = await useVerifiedJwt();

	tokenInvalidator.invalidate(token);

	return sendNoContent(event, HttpCode.NO_CONTENT);
});
