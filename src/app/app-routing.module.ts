import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  MainVideoComponent } from './main-video/main-video.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoClipEditorComponent } from './video-clip-editor/video-clip-editor.component';

const routes: Routes = [
  { path: '',
  component: PlaylistComponent},
  { path: 'main-video',
  component: MainVideoComponent},
  { path: 'video',
  component: VideoClipEditorComponent},
  { path: 'video/:id',
  component: VideoClipEditorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
