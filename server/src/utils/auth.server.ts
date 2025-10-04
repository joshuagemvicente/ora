import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../lib/db";

const db = client.db("ora");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});

export const getUser = async (req: Request) => {
  const user = await auth.api.getSession(req);

  if (user?.session) {
    return user?.user;
  }

  return null;
};
