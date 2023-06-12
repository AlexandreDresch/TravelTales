import { Stack } from "@phosphor-icons/react";

interface Card {
  picture: string;
  icon: boolean;
}

export function PostCard({ picture, icon }: Card) {
  return (
    <li className="cursor-pointer relative">
      <img
        src={picture}
        alt=""
        className="w-full h-full rounded-sm max-w-fit"
      />
      {icon && (
        <Stack size={20} className="absolute bottom-1 left-1 text-white" />
      )}
    </li>
  );
}
