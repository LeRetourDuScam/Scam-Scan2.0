import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/shared/services/comment.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'], // Ajoute un fichier CSS pour les styles spécifiques si nécessaire
})
export class CommentComponent {
  @Input() comment: any; // Le commentaire parent à afficher
  @Input() mangaSlug: string | null = null; // Le slug du manga associé aux commentaires
  replyForm: FormGroup;
  showReplyForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    public authService: AuthService
  ) {
    this.replyForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  // Afficher ou masquer le formulaire de réponse
  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

  // Ajouter une réponse au commentaire
  addReply() {
    if (this.replyForm.valid && this.comment._id && this.mangaSlug) {
      const reply = {
        parentId: this.comment._id,
        content: this.replyForm.value.content,
        username: this.authService.getUsernameFromToken(),
        mangaSlug: this.mangaSlug,
      };

      this.commentService.replyToComment(reply).subscribe(() => {
        // Ajouter la réponse localement
        if (!this.comment.replies) {
          this.comment.replies = [];
        }
        this.comment.replies.push({
          ...reply,
          createdAt: new Date(),
        });
        this.replyForm.reset();
        this.showReplyForm = false;
      });
    }
  }
  
}
