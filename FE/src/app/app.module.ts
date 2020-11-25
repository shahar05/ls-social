import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EntryComponent } from './components/entry/entry/entry.component';
import { EntryViewComponent } from './views/entry-view/entry-view.component';
import { FeedComponent } from './views/feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostComponent } from './components/post/post.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { TokenInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './services/user.service';
import { PrefixUsernamePipe } from './pipe/prefix-username.pipe';

export function loginUser(userService: UserService) {
  return () => userService.loginFromLocalStorage().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntryComponent,
    EntryViewComponent,
    FeedComponent,
    PostComponent,
    PostEditorComponent,
    PrefixUsernamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MaterialFileInputModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loginUser,
      deps: [UserService], multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




