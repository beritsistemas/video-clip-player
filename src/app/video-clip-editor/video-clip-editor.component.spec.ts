import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoClipEditorComponent } from './video-clip-editor.component';

describe('VideoClipEditorComponent', () => {
  let component: VideoClipEditorComponent;
  let fixture: ComponentFixture<VideoClipEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoClipEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoClipEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
