'use client';
import React from 'react';
import { LayoutGrid } from '@/components/ui/layout-grid';

export default function VerificationGuide() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Go to profile</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
        tempore inventore deserunt amet pariatur? Quidem ipsam nemo ut. Ex,
        fugit.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Go to edit profile
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        inventore ullam neque quis, corrupti cupiditate aliquam voluptates
        reprehenderit, magnam amet temporibus exercitationem totam fugit
        doloribus. Tenetur laborum praesentium quos sint.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Add vim as skill in the basic info tab
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam aperiam
        quo et quaerat perferendis dolore ad ut. Delectus, ab beatae.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Now you can enter your username and click on verify
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
        facilis.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: 'md:col-span-2',
    thumbnail: '/ver1.png',
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: 'col-span-1',
    thumbnail: '/ver2.png',
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: 'md:col-span-2',
    thumbnail: '/ver3.png',
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: 'col-span-1',
    thumbnail: '/ver4.png',
  },
];

// TODO: Height full for images on mobile
