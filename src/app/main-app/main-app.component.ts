import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../_services/video.service';
import { MatDialog } from '@angular/material';
import { AlertModal } from '../_components/alert-modal';

@Component({
  selector: 'main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {

  constructor(private videoService:VideoService
    ,private router:Router
    ,private dialog:MatDialog
){

}



  ngOnInit() {
  }

  onNew(){

    let dialogRef = this.dialog.open(AlertModal, {
      data: {
            warnMessage:"Click continue to add a new video",
            title:"New main video" 
          }
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);      
      if(result=="Continue"){
              this.videoService.deleteMainVideo();
              this.router.navigateByUrl("/main-video");
            }
      });
   
    }
}
