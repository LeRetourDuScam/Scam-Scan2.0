import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Pour formGroup
import { RouterModule } from '@angular/router'; // Importer RouterModule
import { AppRoutingModule } from './app-routing.module'; // Import du module de routage
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { AppComponent } from './app.component';
import { MangaTableComponent } from './manga/manga-table/manga-table.component';
import { MangaViewComponent } from './manga/manga-view/manga-view.component';
import { ChapterViewComponent } from './manga/chapter-view/chapter-view.component';
import { ContactComponent } from './others/contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchBarComponent } from './others/search-bar/search-bar.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfilComponent } from './user/profil/profil.component';
import { BookmarkMangaComponent } from './manga/bookmark-manga/bookmark-manga.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentComponent } from './others/comment/comment.component';
import { NotFoundComponent } from './others/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MangaTableComponent,
    MangaViewComponent,
    ChapterViewComponent,
    ContactComponent,
    SearchBarComponent,
    RegisterComponent,
    LoginComponent,
    ProfilComponent,
    HomepageComponent,
    BookmarkMangaComponent,
    CommentComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
