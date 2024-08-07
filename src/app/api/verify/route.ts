import axios from "axios";
import prisma from "../../../../db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  try {
    const { username, userId } = await req.json();
    console.log("Username received in backend:", username);
    console.log("Id received in backend:", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // user.id does not exist in the database
    }

    const response = await axios.post("https://leetcode.com/graphql", {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            profile {
              skillTags
            }
          }
        }`,
      variables: { username },
      operationName: "userPublicProfile",
    });

    //TODO: Use toast to display these error messages
    if (response.data.errors) {
      console.log(response.data.errors);
      return NextResponse.json(
        { message: "Cannot find username" },
        { status: 404 }
      );
    }

    const skillTags = response.data.data.matchedUser.profile.skillTags;
    console.log(skillTags);
    // if skilltags are empty then show a different message maybe
    if (skillTags.includes("vim")) {
      // TODO: includes is case sensitive do something about it later
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          leetCodeUsername: username,
        },
      });
      return NextResponse.json(
        { message: "User verified successfully", user: updatedUser },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Vim skill not found. Please try again." },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
