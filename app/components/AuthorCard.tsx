'use client'

import { useState } from 'react';

export default function AuthorCard(props) {
  const [cardVisible, setCardVisible] = useState(false);

  return (
    <>
      <button onClick={() => setCardVisible(!cardVisible)} className="flex items-center">
        <p className="px-2">{props.author}</p>
        <img className="size-10 rounded-full object-cover" src={props.pfp} />
      </button>
      { cardVisible && 
        <div className="h-2/3 w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 flex flex-col items-center rounded-2xl">
          <img className="size-24 rounded-full object-cover my-4" src={props.pfp} />
          <p className="text-2xl">{props.author}</p>
        </div> }
    </>
  );
}
