import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  logout(): void {
    this.userService.logout();
  }

  private subscribeToUser(): void {
    this.user$ = this.userService.getUserObserver();
    // this.userService.getUserObserver().subscribe((user: User) => {
    //   this.user = user;
    // });
  }
}
