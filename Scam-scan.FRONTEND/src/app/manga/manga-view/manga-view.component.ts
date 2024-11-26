import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MangaService } from '../../shared/services/manga.service';
import { Manga } from '../../shared/models/manga.model';
import { MatTableDataSource } from '@angular/material/table';
import { Chapter } from 'src/app/shared/models/chapter.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {
  slug: string | null = null;
  userId: string | null = null;
  FavoritesMangaList:string[] =[];
  public manga: Manga | undefined;
  displayedColumns: string[] = ['No', 'chapter', 'updated_at'];
  dataSource: MatTableDataSource<Chapter> = new MatTableDataSource<Chapter>([]);

  comments: Comment[] = [];
  commentForm: FormGroup;
  replyForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private mangaService: MangaService,
              public authService: AuthService,
              private user: UserService,
              private snackbarService:SnackbarService,
              private router: Router,
              private commentService:CommentService,
              private fb: FormBuilder,) {

    this.commentForm = this.fb.group({
        content: ['',Validators.required]
      })
      this.replyForm = this.fb.group({
        content: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.loadManga(this.slug);
      this.loadComments(this.slug)
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.slug = this.route.snapshot.paramMap.get('slug');
        if (this.slug) {
          this.loadManga(this.slug);
        }
      }
    });

  }
  loadComments(mangaSlug:any): void {
    this.commentService.getComments(mangaSlug).subscribe(comments => {
      this.comments = this.organizeComments(comments);
    });
  }
  organizeComments(comments: any[]): any[] {
    const commentMap = new Map();
  
    // Créer une map de tous les commentaires
    comments.forEach((comment) =>
      commentMap.set(comment._id, { ...comment, replies: [] })
    );
  
    const rootComments: any[] = [];
  
    comments.forEach((comment) => {
      if (comment.parentId) {
        // Ajouter les commentaires enfants à leur parent
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentMap.get(comment._id));
        }
      } else {
        // Ajouter les commentaires sans parent dans la racine
        rootComments.push(commentMap.get(comment._id));
      }
    });
    console.log(rootComments)
    return rootComments;
  }

  loadManga(slug: any): void {
    this.mangaService.getMangaBySlug(slug).subscribe(data => {
      this.manga = data;
      this.dataSource = new MatTableDataSource<Chapter>(data.chapters);
    });
  }

  addtoFavoris(mangaSlug: any): void {
    this.userId = this.authService.getUsernameFromToken();
    if (this.userId) {
      this.user.AddToFavoris(mangaSlug, this.userId).subscribe(res => {
        this.snackbarService.addedBookmark();
      });
    }
  }
  IsBookmarked(mangaSlug:any):void{
    this.userId = this.authService.getUsernameFromToken();
    if (this.userId) {
      this.user.GetFavoris(this.userId).subscribe(res=>{
        if(res.includes(mangaSlug)){
          this.user.deleteFavoris(this.userId,mangaSlug).subscribe(res => {
            this.snackbarService.deletedBookmark();
          });
        }
        else{
          this.addtoFavoris(mangaSlug);
        }     
       })
    }
  }


  addComment(mangaSlug:any): void {
    if (this.commentForm.valid) {
      console.log( this.authService.getUsernameFromToken())
      const comment= {
         ...this.commentForm.value, 
         mangaSlug: mangaSlug , 
         userId: this.authService.getUsernameFromToken()
      };
      this.commentService.addComment(comment).subscribe(() => {
        this.loadComments(mangaSlug);
        this.commentForm.reset();
      });
    }
  }
  addReply(parentId: string): void {
    if (this.replyForm.valid) {
      const reply = {
        parentId:parentId,
        content: this.replyForm.value.content,
        userId: this.authService.getUsernameFromToken(),
      };
      this.commentService.replyToComment(reply).subscribe(()=>{
        this.replyForm.reset();
      })
    }
  }
  
  
}