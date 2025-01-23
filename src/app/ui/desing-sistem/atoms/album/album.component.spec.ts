import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { Album } from '../../../../domain/models/Album/album.model';
import { By } from '@angular/platform-browser';

const dummyAlbum: Album = {
  id: 1,
  userId: 1,
  title: 'Test Title mock'
};

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    component.album = dummyAlbum;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ', () => {
    const albumTitle = fixture.debugElement.query(By.css('[data-test-id="album-title"]')).nativeElement;

    expect(albumTitle.textContent).toBe(dummyAlbum.title);
  });

  it('should trigger deleteAlbum method on button click ', () => {
    const button = fixture.debugElement.query(By.css('[data-test-id="album-delete"]'));
    spyOn(component, 'deleteAlbum');

    component.deleteAlbum(dummyAlbum);
    fixture.detectChanges();

    expect(component.deleteAlbum).toHaveBeenCalled();
    expect(component.deleteAlbum).toHaveBeenCalledWith(dummyAlbum);
  });

  it('should emit current album when delete button is clicked', () => {
    const buttonDeleteAlbum = fixture.debugElement.query(By.css('[data-test-id="album-delete"]')).nativeElement;
    spyOn(component.delete, 'emit');

    buttonDeleteAlbum.click();
    fixture.detectChanges();

    expect(component.delete.emit).toHaveBeenCalledWith(dummyAlbum);
  });

});
