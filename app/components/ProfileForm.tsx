'use client'

import { createClient } from '@/utils/supabase/client'
import { createProfile } from "../actions.ts"
import { useState } from 'react'

const supabase = await createClient();

export default function ProfileForm(props) {
  const [formVisible, setFormVisible] = useState(false);

  async function uploadPFP(formData) {
    const pfp = formData.get("pfp");

    await createProfile(formData.get("name"), pfp.name);

    const { data, error } = await supabase.storage.from("pfps").upload(pfp.name, pfp);
  };

  return (
    <>
      <button onClick={() => setFormVisible(!formVisible)}>Edit Profile</button>
      { formVisible &&
        <div className="w-1/2 h-2/3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form className="flex flex-col bg-neutral-900" action={uploadPFP}>
            <input name="name" required />
            <input name="pfp" type="file" />
            <button type="submit">Submit</button>
          </form>
        </div>
      }
    </>
  );
}
