"use client"

import { useState } from 'react';

import { likePost, unlikePost } from '../actions.ts';

export default function LikeButton(props) {
  const [liked, setLiked] = useState(props.liked);    

  function handleClick() {
    const newLiked = !liked;

    if (newLiked)
      likePost(props.postId);
    else
      unlikePost(props.postId);

    setLiked(newLiked);
  };

  return (
    <button onClick={handleClick}>
      { liked ? <p>Unlike</p> : <p>Like</p> }
    </button>  
  );
}
