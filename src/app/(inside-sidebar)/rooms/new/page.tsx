import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Metadata } from 'next';
import { CreateRoom, JoinRoom } from './newroom';

export const metadata: Metadata = {
  title: 'New Room',
  description:
    'Create a new room and invite others to see their leetcode stats',
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="join" className="w-[90%] max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-black text-white">
          <TabsTrigger value="join">Join Room</TabsTrigger>
          <TabsTrigger value="create">Create Room</TabsTrigger>
        </TabsList>
        <TabsContent value="join">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Join Room</CardTitle>
              <CardDescription>{`Enter the room code here.`}</CardDescription>
            </CardHeader>
            <JoinRoom />
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
            <CreateRoom />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
