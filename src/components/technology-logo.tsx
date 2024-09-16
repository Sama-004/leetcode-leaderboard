'use client';

import Image from 'next/image';
import { useState } from 'react';

export function TechnologyLogo({ name, logo }: { name: string; logo: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={60}
        height={60}
        className="grayscale hover:grayscale-0 transition-all duration-300"
      />
      {isHovered && (
        <span className="absolute -bottom-10 text-xs text-zinc-400">
          {name}
        </span>
      )}
    </div>
  );
}
