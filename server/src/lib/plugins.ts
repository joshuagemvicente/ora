import { createAuthMiddleware } from "better-auth/api"

export const myPlugin = () => {
  return {
    id: "my-plugin",
    middlewares: [
      {
        path: "api/me",
        middleware: createAuthMiddleware(async (ctx) => {
          // do something here
        })
      }
    ]
  }
}
