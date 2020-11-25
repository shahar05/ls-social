import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<any>, data: any, width?: string, height?: string): MatDialogRef<any, any> {
    const dialogRef = this.dialog.open(component, {
      width,
      height,
      data
    });
    return dialogRef;
  }

}
