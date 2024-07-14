import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  public posts: Post[] = [];

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getAllPosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      
    });
  }
}
