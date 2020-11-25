import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { PostEditorComponent } from 'src/app/components/post-editor/post-editor.component';
import { Like, Post, PostQuery, User } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog.service';
import { NetService } from 'src/app/services/net.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @ViewChild('feedContainer') feedContainer: ElementRef;
  posts: Post[];
  user$: Observable<User>;
  totalPostAmont: number;
  constructor(
    private userService: UserService,
    private netService: NetService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUserObserver();

    this.netService.getPosts().subscribe((postQuery: PostQuery) => {
      this.posts = postQuery.posts;
      this.totalPostAmont = postQuery.postLength;
    }, (err) => {
      console.log(err);
    });
  }

  likeToggle(like: Like): void {
    this.netService.likeToggle(like).subscribe((postLikeToggle: Post) => {
      const index = this.posts.findIndex(p => p._id === postLikeToggle._id);
      this.posts[index] = postLikeToggle;
    });
  }

  createPost(): void {
    const dialogRef = this.dialogService.openDialog(PostEditorComponent, null);
    dialogRef.afterClosed().subscribe((post) => {
      if (!post) { return; }
      this.netService.createPost(post).subscribe((newPost: Post) => {
        this.posts.unshift(newPost);
      }, (err) => {
        console.log('newPost err', err);
      });
    }, (err) => {
      console.log('err', err);
    });
  }
  onScroll(): void {
    const element = this.feedContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom && this.posts.length < this.totalPostAmont) {
      this.netService.getPosts(this.posts.length).pipe(map((postQuery: PostQuery) => {
        postQuery.posts.forEach(newPost => {
          this.posts.push(newPost);
        });
      })).subscribe();
    }

  }



  postEditClicked(postToEdit: Post): void {

    const dialogRef = this.dialogService.openDialog(PostEditorComponent, postToEdit);
    dialogRef.afterClosed().subscribe((post: Post) => {
      if (!post) { return; }
      this.netService.updatePost(post, postToEdit._id).subscribe((newPost: Post) => {
        const index = this.posts.findIndex(p => p._id === newPost._id);
        if (index !== -1) {
          this.posts[index] = newPost;
        }
      }, (err) => {
        console.log('newPost err', err);
      });
    }, (err) => {
      console.log('err', err);
    });

  }
  postDeleteClicked(post: Post): void {
    this.netService.deletePost(post).subscribe((data: Post) => {
      const index = this.posts.findIndex(p => p._id === data._id);
      this.posts.splice(index, 1);
    }, (err) => console.log('err', err)
    );
  }
}
