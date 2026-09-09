import { createClient } from '@/utils/supabase/server.ts'
import { cookies } from 'next/headers'

import LikeButton from './LikeButton.tsx'
import AuthorCard from './AuthorCard.tsx'

export default async function Post(props) {
  const cookieStore = await cookies();   
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  const { count } = await supabase.from("likes").select("*", { count: "exact", head: true}).eq("post", props.postId).eq("user", user.id);

  const { data: { signedUrl: signedPostUrl } } = await supabase.storage.from("posts").createSignedUrl(props["post-location"], 60);

  const { data: postData } = await supabase.from("posts").select("user").eq("id", props.postId).maybeSingle();
  const { data: posterData } = await supabase.from("users").select("name, pfp-location").eq("id", postData.user).maybeSingle();

  const { data: { signedUrl: signedPfpUrl } } = await supabase.storage.from("pfps").createSignedUrl(posterData["pfp-location"], 60);

  return (
    <div className="py-2">
      <img src={signedPostUrl} />
      <div className="flex py-2 align-center justify-between">
        <LikeButton postId={props.postId} liked={count === 1} />
        <AuthorCard author={posterData.name} pfp={signedPfpUrl} />
      </div>
    </div>
  );
}
