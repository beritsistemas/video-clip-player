import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'alert-modal',
  template: `
  <h2 mat-dialog-title  >{{title}}</h2>
  <mat-dialog-content >
      <div class="row" style="width:100%">
          <div class="col-12">
                <p>{{warnMessage}}</p>
                </div>
        </div>
        
  </mat-dialog-content>
  <mat-dialog-actions class="bootstrap4">
      <div class="row" style="width:100%">
        <div class="col-12">
          <button type="button" *ngIf="type=='CONTINUE'"  mat-raised-button mat-dialog-close>{{cancelMessage}}</button>
      
          <button type="button"  *ngIf="type=='CONTINUE'"    mat-raised-button (click)="dialogRef.close('Continue')">{{continueMessage}}</button>
            <button type="button" *ngIf="type=='ERROR'" mat-raised-button  mat-dialog-close>Ok</button>
          </div>
        </div>
    </mat-dialog-actions>
  `,styles:[]
})//
export class AlertModal {

  warnMessage;
  title:string="";

  type:string="CONTINUE"; // 

  continueMessage:string="Continue";
  cancelMessage:string="Cancel";


  constructor(
       public dialogRef: MatDialogRef<AlertModal>
    ,@Inject(MAT_DIALOG_DATA) public data: any
    ) { 

    if(data.title)
      this.title=data.title;
    this.warnMessage=data.warnMessage;
    
    if(data.type)
      this.type=data.type;

    if(data.continueMessage)
      this.continueMessage=data.continueMessage;

    if(data.cancelMessage)
        this.cancelMessage=data.cancelMessage;
      
  }

  

}