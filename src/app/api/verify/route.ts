import axios from "axios";
import prisma from "../../../../db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  try {
    const { username } = await req.json();
    console.log(username);
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
    if (response.data.errors) {
      console.log(response.data.errors);
      return NextResponse.json(
        { message: "Cannot find username" },
        { status: 404 }
      );
    }
    // TODO: What happens when there are more than 1 skill and vim is also there at first and then rest and vim is not at first
    const skillTags = response.data.data.matchedUser.profile.skillTags;
    console.log(skillTags);
    return NextResponse.json(
      { message: "Found the user", skillTags },
      { status: 200 }
    );
    // // if (skillTags.includes("linux")) {
    // //   const updatedUser = await prisma.userlc.update({
    // //     where: { googleEmail: user.googleEmail },
    // //     data: { leetCodeUsername: username, isVerified: true },
    // //   });
    // //   // res.json(updatedUser); // send the updated user back to the client
    // //   res.json({ message: "Verified" });
    // } else {
    //   res.json({ message: "Not verified please try again" });
    // }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
