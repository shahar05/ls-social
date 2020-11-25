import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(private toastr: ToastrService) { }

  showError(msg: string = ''): void {
    this.toastr.error('Something went wrong', msg, { positionClass: 'toast-bottom-right' });

  }

  showAdd(msg: string): void {
    this.toastr.success(msg, '', { positionClass: 'toast-bottom-right' });
  }
}
