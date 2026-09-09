"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

import LoginForm from './components/LoginForm'
import ProfileForm from './components/ProfileForm'
import PostForm from './components/PostForm'
import Feed from './components/Feed'
import SignOutButton from './components/SignOutButton'

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <>
      { !user ? <LoginForm /> :
        <div>
          <div className="w-full flex flex-col items-center">
            <Feed />
          </div>
          <div className="w-full h-1/9 fixed top-0 left-0 flex justify-between p-4 bg-neutral-800">
            <SignOutButton />
            <PostForm />
            <ProfileForm />
          </div>
        </div>
      }
    </>
  );
}
