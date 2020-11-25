import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Like, Post, User } from 'src/app/models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() user: User;
  @Output() likeClicked = new EventEmitter<Like>();
  @Output() editClicked = new EventEmitter<Post>();
  @Output() deleteClicked = new EventEmitter<Post>();
  prefixUsername: string;
  constructor() { }

  ngOnInit(): void {
    this.prefixUsername = this.post.user.username.slice(0, 2).toLocaleUpperCase();
  }

  likeToggle(): void {
    this.likeClicked.emit({ postId: this.post._id, userId: this.user._id });
  }

  likeCheck(): boolean {
    return !!this.post.likes.find(userLike => userLike === this.user._id.toString());
  }

  isMyPost(): boolean {
    return this.user._id === this.post.user._id;
  }
  editPost(): void {
    this.editClicked.emit(this.post);
  }
  deletePost(): void {
    this.deleteClicked.emit(this.post);
  }
}
