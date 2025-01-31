import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

export default function RoomIdSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <Skeleton className="h-8 w-48 bg-zinc-800" />
        <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
          <Skeleton className="h-9 w-24 bg-zinc-800" />
          <Skeleton className="h-9 w-24 bg-zinc-800" />
        </div>
      </div>

      <Tabs defaultValue="leaderboard" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="hidden sm:flex bg-zinc-800 lg:grid lg:w-full lg:grid-cols-3">
            <TabsTrigger value="leaderboard" className="text-zinc-500">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-zinc-500">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="comparison" className="text-zinc-500">
              Comparison
            </TabsTrigger>
          </TabsList>

          <Skeleton className="h-9 w-full sm:hidden bg-zinc-800" />
        </div>

        <TabsContent value="leaderboard" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-zinc-300">User</TableHead>
                  <TableHead className="text-zinc-300">Easy</TableHead>
                  <TableHead className="text-zinc-300">Medium</TableHead>
                  <TableHead className="text-zinc-300">Hard</TableHead>
                  <TableHead className="text-zinc-300">Rating</TableHead>
                  <TableHead className="text-zinc-300">Ranking</TableHead>
                  <TableHead className="text-zinc-300">Contests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
                        <Skeleton className="h-4 w-24 bg-zinc-800" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 bg-zinc-800" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 bg-zinc-800" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 bg-zinc-800" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16 bg-zinc-800" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16 bg-zinc-800" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 bg-zinc-800" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-6">
              <Skeleton className="h-6 w-32 mx-auto mb-2 bg-zinc-800" />
              <ul className="space-y-4">
                {[...Array(3)].map((_, notifIndex) => (
                  <li key={notifIndex} className="bg-zinc-800 p-4 rounded-lg">
                    <Skeleton className="h-4 w-full bg-zinc-700 mb-2" />
                    <Skeleton className="h-3 w-16 bg-zinc-700" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <div className="bg-zinc-800 p-6 rounded-lg text-center">
            <Skeleton className="h-6 w-48 mx-auto mb-2 bg-zinc-700" />
            <Skeleton className="h-4 w-full mx-auto bg-zinc-700" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
