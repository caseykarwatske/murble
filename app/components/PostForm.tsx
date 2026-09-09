"use client"

import { createClient } from "@/utils/supabase/client.ts"
import { createPost } from "../actions.ts"
import { useState } from 'react'

const supabase = createClient();

export default function PostForm(props) {
  const [formVisible, setFormVisible] = useState(false); 

  async function handleSubmit(formData) {
    const post = formData.get("post");

    await createPost(post.name); 

    const { data, error } = await supabase.storage.from("posts").upload(post.name, post);
  };

  return (
    <>
      <button onClick={() => setFormVisible(!formVisible)}>Create Post</button>
      { formVisible &&
        <div className="w-1/2 h-2/3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form className="flex flex-col bg-neutral-900" action={handleSubmit}>
            <input name="post" type="file" />
            <button type="submit">Submit</button>
          </form>
        </div>
      }
    </>
  );
}
