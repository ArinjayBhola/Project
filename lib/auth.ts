import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CredentialsProps {
  email: string;
  password: string;
  name: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    email: string;
    name: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials: CredentialsProps | undefined) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
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
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
