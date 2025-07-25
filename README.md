# TrackMyHabits

TrackMyHabits is a monorepo that bundles a NestJS API and an Expo mobile application. The workspace is managed with [Nx](https://nx.dev) and uses MongoDB for storing habit data.

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

   Make sure you are using Node.js 18 or later.

2. **Configure Environment Variables**
   The API expects several variables such as `MONGODB_URI`, `AUTH0_ISSUER_URL`, `AUTH0_AUDIENCE`, `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET`. Create a `.env` file at the project root with these values.

## Running the API

To start the backend server run:

```bash
npx nx serve api
```

The API will be available on `http://localhost:3000/api/v1` by default.

## Running the Mobile App

The mobile client is located in `apps/mobile`. You can start it with Expo:

```bash
cd apps/mobile
npx expo start
```

This opens the Expo developer tools where you can launch the app on an emulator or a physical device.

## Testing

Unit tests are powered by Jest and can be executed per project. For example, to run the API tests:

```bash
npx nx test api
```

## Project Structure

- `apps/api` – NestJS backend
- `apps/mobile` – Expo React Native app
- `libs/data` – Shared data models used by the API and the app

## License

This project is released under the MIT license.
