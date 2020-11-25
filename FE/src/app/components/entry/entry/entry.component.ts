import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models';
import { PopUpService } from 'src/app/services/pop-up.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input() login: boolean;
  @Output() submitClicked = new EventEmitter<User>();
  @Output() toggleClicked = new EventEmitter<void>();
  signText: string;
  form: FormGroup;
  constructor(private popUpService: PopUpService) { }

  ngOnInit(): void {
  //  this.popUpService.showError('Not have permisssion');
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9 ]+/)]),
      password: new FormControl('', Validators.required),
    });
  }
  submit(): void {
    if (this.form.valid) {
      this.submitClicked.emit(this.form.value);
    }
  }
  reserForm(): void {
    this.form.reset();
  }
  toggle(): void {
    this.reserForm();
    this.toggleClicked.emit();
  }
}
