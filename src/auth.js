import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (!isValid) return null;

        return {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user);
    },
  },
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
