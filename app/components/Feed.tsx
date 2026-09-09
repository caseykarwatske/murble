import { createClient } from '@/utils/supabase/server.ts'
import { cookies } from 'next/headers'

import Post from './Post.tsx'

export default async function Feed(props) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore);

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  const { data: followData, error: followError } = await supabase.from("following").select("followee").eq("follower", user.id);
  const ids = followData.map(row => row.followee);
  const { data: postData, error: postError } = await supabase.from("posts").select("*").in("user", ids);

  const posts = postData.map(row => <Post key={row.id} poster={row.user} postId={row.id} likes={row.likes} post-location={row["post-location"]} />);

  return (
    <div className="w-screen md:w-1/2 lg:w-1/3 px-2 flex flex-col bg-neutral-900">
      {posts}
    </div>
  );
}
