import { NextResponse } from "next/server";
import cron from "node-cron";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    cron.schedule("*/1 * * * *", async () => {
      console.log("");
      console.log("######################################");
      console.log("#                                    #");
      console.log("# Running scheduler every 1 minutes #");
      console.log("#                                    #");
      console.log("######################################");
      console.log("");

      const response = await axios.get("/test");
      console.log("Works cron:", response);
      return NextResponse.json({ message: "Works" }, { status: 200 });
    });

    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
