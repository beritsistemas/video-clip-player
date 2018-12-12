import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoModel } from '../_models/video-model';
import { MatDialog } from '@angular/material';
import { AlertModal } from '../_components/alert-modal';

@Component({
  selector: 'app-playlist-video',
  templateUrl: './playlist-video.component.html',
  styleUrls: ['./playlist-video.component.scss']
})
export class PlaylistVideoComponent implements OnInit {

  @Input() video:VideoModel;
  @Input() editable:boolean=false;
  @Input() isPlaying:boolean=false;

  @Output() editVideo:EventEmitter<VideoModel>=new EventEmitter();
  @Output() deleteVideo:EventEmitter<VideoModel>=new EventEmitter();

  @Output() playThisVideo:EventEmitter<VideoModel>=new EventEmitter();
  

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  onEditVideo(){
    this.editVideo.emit(this.video);
  }
  
  onDeleteVideo(){
    
    let dialogRef = this.dialog.open(AlertModal, {
              data: {
                    warnMessage:"Click continue to delete the clip",
                    title:"Confirm deletion" 
                  }
              });
              dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed',result);      
              if(result=="Continue"){
                this.deleteVideo.emit(this.video);
              }
      });
  }
  onPlayThisVideo(){
    this.playThisVideo.emit(this.video);
  }


}
