import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaTableComponent } from './manga/manga-table/manga-table.component';
import { MangaViewComponent } from './manga/manga-view/manga-view.component';
import { ChapterViewComponent } from './manga/chapter-view/chapter-view.component';
import { ContactComponent } from './others/contact/contact.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookmarkMangaComponent } from './manga/bookmark-manga/bookmark-manga.component';
const routes: Routes = [
  {path: '', component:HomepageComponent},
  { path: 'manga', component: MangaTableComponent },
  { path: 'manga/view/:slug', component: MangaViewComponent },
  { path: 'manga/view/:slug/chapter/:chapter', component: ChapterViewComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'bookmark',component:BookmarkMangaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
