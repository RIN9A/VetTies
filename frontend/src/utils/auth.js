import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import apiAuthLogin from "./api";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                
                const result = await apiAuthLogin(credentials);
                
                if (result.error) {
                    // Бросаем ошибку, которую NextAuth сможет обработать
                    throw new Error(JSON.stringify({
                        message: result.message,
                        status: result.status
                    }));
                }
                
                return {
                    id: result.id,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    phoneNumber: result.phoneNumber,
                    token: result.token,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    name: user.firstName,
                    lastName: user.lastName,
                    accessToken: user.token, // Сохраняем токен
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                email: token.email,
                name: token.name,
                lastName: token.lastName,
                accessToken: token.accessToken,  // Добавляем токен в сессию
            };
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Maximum session age in seconds (30 days)
    },

    pages: {
        // signIn: "/auth/signin",
    },
    jwt: {
        secret: process.env.NEXT_JWT_SECRET,
    },
    secret: process.env.AUTH_SECRET,

};

export const getServerAuthSession = () => getServerSession(authOptions);