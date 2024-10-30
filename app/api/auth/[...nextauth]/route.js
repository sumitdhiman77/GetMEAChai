import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from "@/app/models/User";
import connectDB, { getConnectionState } from "@/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_APP_ID,
    //   clientSecret: process.env.FACEBOOK_APP_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET,
    // }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await connectDB();
      console.log(`User: ${JSON.stringify(user)}`);
      console.log(`Profile: ${JSON.stringify(profile)}`);
      const currentUser = await User.findOne({ email: user.email }).lean();
      if (!currentUser) {
        // Create a new user if not found
        const newUser = await User.create({
          email: user.email,
          username: user.email.split("@")[0],
          name: profile.name || user.email.split("@")[0],
        });
      } else {
        user.name = currentUser.username;
      }
      return true;
    },
    async session({ session, token, user }) {
      console.log(`session is: ${JSON.stringify(session)}`);
      console.log(`token is: ${JSON.stringify(token)}`);
      const dbUser = await User.findOne({ email: session.user.email }).lean();
      console.log(dbUser);
      if (dbUser) {
        session.user.name = dbUser.username;
        session.user.id = dbUser._id; // Example: Add user ID to session
      } else {
        session.user.name = user.name; // Fallback
      }
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});

export { authoptions as GET, authoptions as POST };
