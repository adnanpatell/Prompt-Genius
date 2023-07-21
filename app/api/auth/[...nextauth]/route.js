import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connecttoDB } from "@utils/database";
import User from "@models/user";

const handler= NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session}){
            const sessionuser= await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionuser._id.toString();
            return session;
                },
            async signIn({profile}){
            try{
            await connecttoDB();
            
            //check if user exist
            const userexist = await User.findOne({
                email:profile.email
            })
            
            //or, create new user
            if(!userexist){
                await User.create({
                    email:profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                })
                return true;
            }
            }catch(error){
            console.log(error);
            return false;
            }
            } 
    }
   
})

export {handler as GET, handler as POST}; 