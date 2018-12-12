import { Injectable } from '@angular/core';
import { VideoModel } from '../_models/video-model';
import { PlaylistModel } from '../_models/playlist-model.';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
/**
 * Video service... 
 * 
 * IMPORTANT: I added Promise in each method to simulate server side processing
 * 
 * It's usign LocalStorage
 *
 * 
 */
export class VideoService {

  constructor() { }
  playList:PlaylistModel/*={playlistVideos:[{
    name:"main"
    ,url:"http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"
    ,id:uuid()
    ,isMain:true
  },{
    name:"first clip"
    ,url:"http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"
    ,start:10
    ,end:40
    ,id:"84cec96f-0d1f-499d-b7ab-9d65e3cffac5"
    ,isMain:false
  }
  ,{
    name:"second clip"
    ,url:"http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"
    ,start:0
    ,end:30
    ,id:"84cec96f-0d1f-499d-b7ab-9d65e3cffac3"
    ,isMain:false
  }
]}*/;

  getPlaylist():Promise<PlaylistModel>{
    return new Promise(resolve=>{
        if(!this.playList){
         let fromStorage=this.getFromStorage()
         if(fromStorage){
           this.playList=fromStorage;
         }
        }
        resolve(this.playList)
    })
  }

  getMainVideo():Promise<any>{
    return new Promise(resolve=>{
      if(this.playList)
        resolve(this.playList.playlistVideos.find(video=>video.isMain)) 
      else  
        resolve()
    });
  }
  saveMainVideo(video:VideoModel):Promise<any>{
    return new Promise(resolve=>{

      return this.getMainVideo().then(mainVideo=>{
        video.id=uuid(); 
        video.name="Main video";
        if(!mainVideo||video.url!=mainVideo.url){ //check if previos Main video URL is different
          if(!this.playList){
            this.playList={playlistVideos:[]}
          }
          this.playList.playlistVideos=[video];//CLEAN All PLAYLIST
           this.saveToStorage();
        }
        resolve(video);
      })
     
    });
  }

  deleteMainVideo(){
    this.playList=undefined;
    this.saveToStorage()
  }

  getVideoById(id):Promise<any>{
    return new Promise(resolve=>{
      resolve(this.playList.playlistVideos.find(video=>video.id==id)) 
    });
  }

  addClip(video:VideoModel):Promise<any>{
    return new Promise(resolve=>{
        video.id=uuid(); //this is generated in server side.. but this project is not tied to a server (for now :-) )
    
       this.playList.playlistVideos.push(video);
       this.saveToStorage();
      resolve()
    });
  }
  updateClip(videoToUpdate:VideoModel):Promise<any>{
    return new Promise((resolve,reject)=>{
    
       let index=this.playList.playlistVideos.findIndex(video=>video.id==videoToUpdate.id);
       if(index>=0)
       {
        this.playList.playlistVideos[index]=videoToUpdate;
        this.saveToStorage();
        resolve()
       }else{
        reject("No video found with the id "+videoToUpdate.id)
       }
       //this.playList.playlistVideos.push(video);
      
    });
  }
  deleteVideo(id:string){
    return new Promise(resolve=>{
      let index=this.playList.playlistVideos.findIndex(video=>video.id==id);
      this.playList.playlistVideos.splice(index,1);

      this.saveToStorage();
      resolve()
    });
  } 

  saveToStorage(){
    localStorage.setItem("playlist",JSON.stringify(this.playList));
  }
  getFromStorage(){
   let inStorage=localStorage.getItem("playlist")
   if(inStorage){
     return JSON.parse(inStorage);
   }
  }
}
