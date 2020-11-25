import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EntryViewComponent } from './views/entry-view/entry-view.component';
import { FeedComponent } from './views/feed/feed.component';

const routes: Routes = [
  { path: 'home', component: EntryViewComponent },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
