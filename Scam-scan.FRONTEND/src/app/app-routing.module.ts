import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaTableComponent } from './manga/manga-table/manga-table.component';
import { MangaViewComponent } from './manga/manga-view/manga-view.component';
import { ChapterViewComponent } from './manga/chapter-view/chapter-view.component';
import { ContactComponent } from './others/contact/contact.component';

const routes: Routes = [
  { path: 'manga', component: MangaTableComponent },
  { path: 'manga/view/:slug', component: MangaViewComponent},
  { path: 'manga/view/:slug/chapter/:chapter',component:ChapterViewComponent},
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/manga', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
