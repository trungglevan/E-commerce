import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post: Post = {
    _id: undefined,
    title: '',
    content: [],
    author: ''
  };
  @Output() postChange = new EventEmitter<any>();

  constructor() {}

  updatePost() {
    this.postChange.emit(this.post);
  }
}
