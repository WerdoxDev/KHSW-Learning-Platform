# khsw-learning-platform

To install dependencies:

```bash
bun install
```

To run:
- App environment variables:
```
EXPO_PUBLIC_API_HOST="http://<server ip>:<server port>"
```

- Server environment varibales:
```
DATABASE_URL=<...>
ACCESS_TOKEN_SECRET=<...>
REFRESH_TOKEN_SECRET=<...>
```

Server:
```bash
cd packages/server
bun run dev
```

App:
```bash
cd packages/mobile
bun start
```
