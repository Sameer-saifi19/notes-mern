import NextAuth, {CredentialsSignin} from "next-auth";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          
          if (!credentials) return null;

          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined; 

          if (!email || !password) {
            throw new CredentialsSignin("please provide both email & password")
          };
          
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            throw new Error("Password did not match")
          };

          // Return only user object fields you want exposed to the session
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});