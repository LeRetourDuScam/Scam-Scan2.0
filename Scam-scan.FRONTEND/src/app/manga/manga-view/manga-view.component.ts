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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewService } from 'src/app/shared/services/view.service';
import { View } from 'src/app/shared/models/views.model';
@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {
  slug: string | null = null;
  username: string | null = null;

  FavoritesMangaList:string[] =[];
  public manga: Manga | undefined;
  dataSource: MatTableDataSource<Chapter> = new MatTableDataSource<Chapter>([]);
 
  views: View[] = [];
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
              private fb: FormBuilder,
              private viewService:ViewService) {

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
 

  loadManga(slug: any): void {
    this.mangaService.getMangaBySlug(slug).subscribe(data => {
      this.manga = data;
      data.chapters.forEach(chapter => {
        this.viewService.getView(chapter.slug).subscribe(viewData => {
          chapter.views = viewData.views;
        });
      });
      this.dataSource = new MatTableDataSource<Chapter>(data.chapters);
    });
  }

  addtoFavoris(mangaSlug: any): void {
    this.username = this.authService.getUsernameFromToken();
    if (this.username) {
      this.user.AddToFavoris(mangaSlug, this.username).subscribe(res => {
        this.snackbarService.addedBookmark();
      });
    }
  }
  IsBookmarked(mangaSlug:any):void{
    this.username = this.authService.getUsernameFromToken();
    if (this.username) {
      this.user.GetFavoris(this.username).subscribe(res=>{
        if(res.includes(mangaSlug)){
          this.user.deleteFavoris(this.username,mangaSlug).subscribe(res => {
            this.snackbarService.deletedBookmark();
          });
        }
        else{
          this.addtoFavoris(mangaSlug);
        }     
       })
    }
  }
  getChapterView(Slug:string){
    this.viewService.getView(Slug).subscribe((data)=>{
      this.views
    })
  }

  addComment(mangaSlug:any): void {
    if (this.commentForm.valid) {
      const comment= {
         ...this.commentForm.value, 
         mangaSlug: mangaSlug , 
         username: this.authService.getUsernameFromToken()
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
        username: this.authService.getUsernameFromToken(),
      };
      this.commentService.replyToComment(reply).subscribe(()=>{
        this.replyForm.reset();
      })
    }
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
    return rootComments;
  }
}