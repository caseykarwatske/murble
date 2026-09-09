"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function sendOTP(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithOtp({
    "phone": formData.get("phone"),
  });
}

export async function verifyOTP(phone, formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.verifyOtp({
    "phone": phone,
    "token": formData.get("otp"),
    "type": "sms",
  });
}

export async function createProfile(name, pfp) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  const { formData, formError } = await supabase.from("users").upsert({
      "id": user.id,
      "name": name,
      "pfp-location": pfp,
      "decay-rate": null,
    }
  );
}

export async function createPost(post) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, uploadError } = await supabase.from("posts").insert({
    "post-location": post
  });
}

export async function likePost(post, likes) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("likes").insert({
    "post": post,
  })

  const { data: postsData, error: postsError } = await supabase.from("posts").update({ "likes": likes, }).eq("id", post);
}

export async function unlikePost(post, likes) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("likes").delete().eq("user", user.id).eq("post", post);

  const { data: postsData, error: postsError } = await supabase.from("posts").update({ "likes": likes, }).eq("id", post);
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();
}
