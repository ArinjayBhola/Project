import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "QpUeh@example.com",
        },
      },
      async authorize(credentials: any) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (existingUser) {
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
          };
        }
        try {
          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name,
              password: credentials.password,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (e) {
          console.error(e);
        }
        return null;
      },
    }),
  ],
  secret: "secret",
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
