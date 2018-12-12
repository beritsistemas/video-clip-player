import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../_models/video-model';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../_services/video.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-video',
  templateUrl: './main-video.component.html',
  styleUrls: ['./main-video.component.scss']
})
export class MainVideoComponent implements OnInit {


  @Input() video:VideoModel;
  url:string;
  showVideoPlayer:boolean=false;


  constructor( private route:ActivatedRoute
              ,private videoService:VideoService
              ,private toastr:ToastrService
              ,private router:Router
              ) { }

  ngOnInit() {
    this.videoService.getMainVideo().then(video=>{
       if(video){
         this.video=video;
         this.url=video.url;
       }else{
         this.url="http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4";
       }
    })
  }
  onUrlChange(){
    if(this.showVideoPlayer){
      this.showVideoPlayer=false;
      this.video=undefined;
    }
  }
  loadVideo(){
    if(this.validateVideo()){
        this.video={
          url:this.url
          ,isMain:true
        }
        this.showVideoPlayer=true;
    }
  }
  /**
   Try to validate video url
  */
  validateVideo():boolean{
    return true;
  }
  onLoadedMetaData(video:VideoModel){
      this.video=video;
  }
  /**
   * Save main video
   */
  save(){
    this.videoService.saveMainVideo(this.video).then(()=>{
      this.toastr.success("Main video successfully saved");
      this.router.navigateByUrl("/");
    })
  }

}
