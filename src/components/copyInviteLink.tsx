export const copyInviteLink = (roomCode: string, toast: any) => {
  const inviteLink = `${window.location.origin}/invite/${roomCode}`;
  navigator.clipboard.writeText(inviteLink).then(() => {
    toast({
      description: 'Invite Link Copied to Clipboard',
      className: 'bg-zinc-800 border-zinc-700 text-zinc-100',
    });
  });
};
