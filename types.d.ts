import { AdapterUser, User } from "next-auth/core/types";

declare module "next-auth" {
  interface User extends AdapterUser {
    isVerified?: boolean;
    leetCodeUsername?: string;
    image?: string;
  }
}
