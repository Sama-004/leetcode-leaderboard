"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  id: string;
  email: string;
  leetCodeUsername: string | null;
}

interface Room {
  id: string;
  name: string;
  code: string;
  creator: User;
  participants: {
    user: User;
  }[];
}

export default function Page() {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const params = useParams();
  const roomName = Array.isArray(params.roomName)
    ? params.roomName[0]
    : params.roomName;

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get<Room>(`/api/room/${roomName}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Failed to fetch room details", error);
        toast({
          title: "Error",
          description: "Failed to fetch room details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (roomName) {
      fetchRoomDetails();
    }
  }, [roomName, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
      <p>Room Code: {room.code}</p>
      <p>Created by: {room.creator.email}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Participants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {room.participants.map((participant) => (
          <Card key={participant.user.id} className="bg-black text-white">
            <CardHeader>
              <CardTitle>{participant.user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              {participant.user.leetCodeUsername && (
                <p>LeetCode: {participant.user.leetCodeUsername}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import { useToast } from "@/components/ui/use-toast";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface User {
//   id: string;
//   email: string;
//   leetCodeUsername: string | null;
// }

// interface Room {
//   id: string;
//   name: string;
//   code: string;
//   creator: User;
//   participants: {
//     user: User;
//   }[];
// }

// export default function Page() {
//   const [room, setRoom] = useState<Room | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();
//   const params = useParams();
//   const roomId = params.roomId as string;
//   const roomName = Array.isArray(params.roomName)
//     ? params.roomName[0]
//     : params.roomName;

//   console.log("Frontend room ID:", roomId);

//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       try {
//         const response = await axios.get<Room>(`/api/room/${roomId}`);
//         setRoom(response.data);
//       } catch (error) {
//         console.error("Failed to fetch room details", error);
//         toast({
//           title: "Error",
//           description: "Failed to fetch room details. Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRoomDetails();
//   }, [roomId, toast]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!room) {
//     return <div>Room not found</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
//       <p>Room Code: {room.code}</p>
//       <p>Created by: {room.creator.email}</p>

//       <h2 className="text-xl font-semibold mt-6 mb-2">Participants</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {room.participants.map((participant) => (
//           <Card key={participant.user.id} className="bg-black text-white">
//             <CardHeader>
//               <CardTitle>{participant.user.email}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {participant.user.leetCodeUsername && (
//                 <p>LeetCode: {participant.user.leetCodeUsername}</p>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
