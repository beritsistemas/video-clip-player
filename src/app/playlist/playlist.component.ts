import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../_models/video-model';
import { VideoService } from '../_services/video.service';
import { PlaylistModel } from '../_models/playlist-model.';
import { Router } from '@angular/router';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() editable:boolean=true;
  
  playlist:PlaylistModel;
  currentVideo:VideoModel;
  currentVideoIndex:number;

  hasPlaylist:boolean=false;

  constructor(private videoService:VideoService
             ,private router:Router
             ,private _hotkeysService: HotkeysService
            
             ) {

              var that=this;
              this._hotkeysService.add(new Hotkey('ctrl+shift+right', (event: KeyboardEvent): boolean => {
                  console.log('Typed hotkey rigth');
                  that.playNextVideo()
                  return false; // Prevent bubbling
              }));
              this._hotkeysService.add(new Hotkey('ctrl+shift+left', (event: KeyboardEvent): boolean => {
                console.log('Typed hotkey left');
                that.playPreviusVideo()
                return false; // Prevent bubbling
            }));
             
  }

  ngOnInit() {
    this.videoService.getPlaylist().then((playlist)=>{
      if(playlist&&playlist.playlistVideos.length>0){
        this.playlist=playlist;
        this.playVideo(0);
        this.hasPlaylist=true;
      }else{
        this.hasPlaylist=false
      }

    })
  }
  addMainVideo(){
    this.router.navigateByUrl("/main-video");
  }
  addClip(){
    this.router.navigateByUrl("/video");
  }

  playVideo(index:number=0){
    if(this.playlist.playlistVideos&&this.playlist.playlistVideos.length>index){
        this.currentVideoIndex=index;
        this.currentVideo=this.playlist.playlistVideos[index];
    }
  }
  onEndedVideo(){
      this.playNextVideo()
  }
  playNextVideo(){
    if(this.playlist.playlistVideos.length>(this.currentVideoIndex+1)){
      this.currentVideoIndex++
      this.playVideo(this.currentVideoIndex);
    }
  }
  playPreviusVideo(){
    if(this.currentVideoIndex-1>=0){
      this.currentVideoIndex--
      this.playVideo(this.currentVideoIndex);
    }
  }

  onEditVideo(video:VideoModel){
     this.router.navigateByUrl("/video/"+video.id);
  }
  onDeleteVideo(video:VideoModel,index:number){
    this.videoService.deleteVideo(video.id).then(()=>{
      this.videoService.getPlaylist().then(playlist=>{//get again server list of videos, another way is to splice from current list
        this.playlist=playlist; 
      })

      
    })
  }
  onPlayThisVideo(video:VideoModel,index:number){
    this.playVideo(index);
  }

  onSaveToStorage(){
    this.videoService.saveToStorage()
  }

}
