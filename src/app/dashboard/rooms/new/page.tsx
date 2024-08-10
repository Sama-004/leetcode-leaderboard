import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Create/Join Room",
  description: "Create new room or Join existing room",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="join" className="w-[90%] max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-black text-white">
          <TabsTrigger value="join">Join</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="join">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Join Room</CardTitle>
              <CardDescription>{`Enter the room code here.`}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Input
                  id="code"
                  placeholder="Enter Room Code"
                  className="bg-gray-700 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-green-500 hover:bg-gray-500">
                Join Room
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Create New Room</CardTitle>
              <CardDescription>
                {`Create a new room for you and your friends.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Input
                  id="name"
                  placeholder="Enter Room Name"
                  className="bg-gray-700 text-white"
                />
                <Label className="text-xs select-none">{`Note: Room name can't be changed later`}</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-600 hover:bg-gray-500">
                Create room
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
