import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../_models/video-model';
import { Options } from 'ng5-slider';
import { VideoService } from '../_services/video.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-clip-editor',
  templateUrl: './video-clip-editor.component.html',
  styleUrls: ['./video-clip-editor.component.scss']
})
export class VideoClipEditorComponent implements OnInit {

  @Input() video:VideoModel;


  _minValue: number = 0;
  set minValue(v:number){
    this._minValue=v;
   // if(this.videoplayer){
   //   this.getNativeVideo().currenttime=this._minValue;
   // }
  }
  get minValue(){
    return this._minValue;
  }
  maxValue: number = 0;

  loaded:boolean=false;

  rangeOptions: Options ;
  
  constructor(
    private route:ActivatedRoute
    ,private videoService:VideoService
    ,private toastr:ToastrService
    ,private router:Router
    ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      
      let video_id = params['id']; 
      if(video_id){//update of a clip
        this.videoService.getVideoById(video_id).then(video=>{

          this.video=video;
        })
      }else{
        this.videoService.getMainVideo().then(video=>{
          if(video){
            let newVideo={
              url:video.url
              ,isMain:false
              ,start:0
            }
            this.video=newVideo;
          }else{
            this.toastr.error("Main video doesn't exist, please add one")
          }
          })
         
      }

    })
  }

  onLoadedMetaData(video:VideoModel){
    
    this.video.duration=video.duration
    if(!this.video.id){
      this.video.end=this.video.duration;
    }

    this.rangeOptions= {
      floor: 0,
      ceil: this.video.duration
    //  ,step:1
      ,showTicks:false
      ,showTicksValues:false
    };

    this.loaded=true;

  }
  onTimeUpdate(event){
    if(this.maxValue==0){
      this.maxValue=this.rangeOptions.ceil;
    }
  }
  validate(){
  
    if(this.video.start<0){
        return false
    }
    return true;
  }
  save(){
    if(!this.validate()){
      this.toastr.error('Please review the values entered');
    }
    if(this.video.id){
      this.videoService.updateClip(this.video).then(()=>{
        this.toastr.success('Clip updated successfully');
        this.router.navigateByUrl("/");
      })
    }else{
      this.videoService.addClip(this.video).then(()=>{
        this.toastr.success('Clip added successfully');
        this.router.navigateByUrl("/");
      })
    }
  
  }
}
