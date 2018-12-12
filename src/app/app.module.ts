import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainVideoComponent } from './main-video/main-video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { Ng5SliderModule } from 'ng5-slider';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistVideoComponent } from './playlist-video/playlist-video.component';
import { VideoService } from './_services/video.service';
import { VideoClipEditorComponent } from './video-clip-editor/video-clip-editor.component';
import { ToastrModule } from 'ngx-toastr';
import { VideoClipEditorValidatorDirective } from './directives/video-clip-editor-validator.directive';
import { AlertModal } from './_components/alert-modal';

import {HotkeyModule} from 'angular2-hotkeys';
import { MainAppComponent } from './main-app/main-app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainVideoComponent,
    VideoPlayerComponent,
    PlaylistComponent,
    PlaylistVideoComponent,
    VideoClipEditorComponent
    ,VideoClipEditorValidatorDirective
    ,AlertModal, MainAppComponent
  ]
  ,entryComponents:[
    AlertModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    Ng5SliderModule,
    ToastrModule.forRoot(),
    HotkeyModule.forRoot()
    
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
