var posts=["2024/08/19/hello-world/","2024/08/21/Linux/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };