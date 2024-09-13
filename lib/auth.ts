import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import { NextResponse } from "next/server";

export const authOptions = {
  trustHost: true,
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
      // @ts-ignore
      async authorize(credentials: any) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            username: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, username } = parsedCredentials.data;
          const hashedPassword = await bcrypt.hash(password, 10);
          const existingUser = await db.user.findFirst({
            where: {
              email: email,
            },
          });
          if (existingUser) {
            const passwordMatch = await bcrypt.compare(
              password,
              hashedPassword
            );
            if (passwordMatch) {
              return NextResponse.json({
                existingUser,
              });
            }
            console.log("Invalid Credentials");
            return null;
          }
          try {
            const user = await db.user.create({
              data: {
                email: email,
                password: hashedPassword,
                username: username,
              },
            });
            return {
              id: user.id,
              email: user.email,
              username: user.username,
            };
          } catch (error) {
            console.log(error);
          }
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET ?? "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
