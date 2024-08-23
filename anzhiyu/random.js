var posts=["2024/08/21/Git学习笔记-一/","2024/08/19/hello-world/","2024/08/23/Git学习笔记-二/","2024/08/22/python基础学习总结-七/","2024/08/23/python基础学习总结-八/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };