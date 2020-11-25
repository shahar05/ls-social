import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;
  title: string;
  fileName: string;
  constructor(
    public dialogRef: MatDialogRef<PostEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post | null
  ) { }

  ngOnInit(): void {
    this.title = this.post ? 'Update' : 'Create';
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.pattern(/image-*/)),
    });
    if (this.post) {
      this.form.get('name').setValue(this.post.name);
      this.form.get('description').setValue(this.post.description);
    }
  }

  _handleReaderLoaded(e): void {
    const reader = e.target;
    this.imageSrc = reader.result;
  }

  handleInputChange(e): void {

    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.fileName = file.name;
    const reader = new FileReader();
    this.form.get('image').setValue(file.type);
    if (this.form.get('image').invalid) {
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }
  submit(): void {
    if (this.form.valid && (this.title === 'Update' || (this.title === 'Create' && this.imageSrc))) {
      const post: Post = this.form.value;
      if (this.imageSrc) {
        post.image = this.imageSrc;
      } else {
        delete post.image;
      }
      this.dialogRef.close(post);
    }
  }

}
