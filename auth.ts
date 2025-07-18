import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                action: { label: "Action", type: "text" } // For distinguishing signup/signin
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password')
                }

                const isSignup = credentials.action === 'signup'

                if (isSignup) {
                    // Check if user exists
                    const existingUser = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    })

                    if (existingUser) {
                        throw new Error('Email already exists')
                    }

                    // Create new user
                    const hashedPassword = await bcrypt.hash(credentials.password as string, 10)
                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email as string,
                            password: hashedPassword,
                        }
                    })
                    return user
                } else {
                    // Sign in
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string }
                    })

                    if (!user || !user.password) {
                        throw new Error('No user found with this email')
                    }

                    const passwordMatch = await bcrypt.compare(credentials.password as string, user.password)

                    if (!passwordMatch) {
                        throw new Error('Incorrect password')
                    }

                    return user
                }
            }
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async session({ session, user }: any) {
            return session
        },
        async jwt({ token, user, account }: any) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                }
            }
            return token
        },
    },
})