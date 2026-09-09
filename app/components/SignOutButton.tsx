'use client'

import { signOut } from '../actions.ts'

export default function SignOutButton() {
  function handleClick() {
    signOut();
  }

  return (
    <button onClick={handleClick}>Sign Out</button>
  );
}
