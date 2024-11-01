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

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import{DialogCreateMangaComponent} from './dialog/dialog-create-manga/dialog-create-manga.component'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ChapterViewComponent } from './manga/chapter-view/chapter-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogCreateMangaComponent,
    MangaTableComponent,
    MangaViewComponent,
    ChapterViewComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    MatSnackBarModule,MatCardModule,
    MatTableModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
