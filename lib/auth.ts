import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter username",
          required: true,
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter Password",
          required: true,
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter Email",
          required: true,
        },
      },

      async authorize(credentials: {
        username: string;
        password: string;
        email: string;
      }) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            username: credentials.username,
          },
        });
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              email: existingUser.email,
              username: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              email: credentials.email,
              username: credentials.username,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          return NextResponse.json(
            {
              message: "Error in signing up",
            },
            {
              status: 411,
            }
          );
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET ?? "secret",
  callbacks: {
    async session({
      token,
      session,
    }: {
      token: { sub: string };
      session: { user: { id: string } };
    }) {
      session.user.id = token.sub;
      return session;
    },
  },
};
