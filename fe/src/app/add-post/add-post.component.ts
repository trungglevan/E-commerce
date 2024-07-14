import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post/post';
import { ObjectId } from 'bson';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  [x: string]: any;
  public postForm!: FormGroup;
  public postFlag: boolean = false;
  public message: string = 'Post is creating...';

  ngOnInit() {
    // form
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      author: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email
      ]),
    });
  }

  constructor(private _postService: PostService, private router: Router) { }

  public onSubmit() {
    const a: any[] = [
      {
        "Type": "64GB",
        "test": this.postForm.get('content')?.value ?? ''
      }
    ];
    console.log(a);

    const post: Post = {
      _id: undefined,
      title: this.postForm.get('title')?.value ?? '',
      content: a,
      author: this.postForm.get('author')?.value ?? '',
    };
    this.postFlag = true;
    this._postService.createPost(post).subscribe(data => {
      // check status of response
      if (data) {
        this.message = 'Post created successfully!';
        // delay 3s and redirect to list posts
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 3000);
      } else {
        this.message = 'Error creating post!';
        setTimeout(() => {
          this.postFlag = false;
        }, 2000);
      }
    });
  }

  public get title() {
    return this.postForm.get('title');
  }

  public get content() {
    return this.postForm.get('content');
  }

  public get author() {
    return this.postForm.get('author');
  }
}
