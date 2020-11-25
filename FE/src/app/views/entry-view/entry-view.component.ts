import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { NetService } from 'src/app/services/net.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss']
})
export class EntryViewComponent implements OnInit {
  login = true;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  toggleClicked(): void {
    this.login = !this.login;
  }

  createUser(user: User): void {
    this.userService.register(user).subscribe((token: any) => {
      this.router.navigate(['/feed']);
    }, (err) => {
      console.log('login err', err);
    });
  }

  loginUser(user: User): void {
    this.userService.login(user).subscribe((token: any) => {
      this.router.navigate(['/feed']);
    }, (err) => {
      console.log('login err', err);
    });
  }
  submitClicked(user: User): void {
    this.login ? this.loginUser(user) : this.createUser(user);
  }
}
