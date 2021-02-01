import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedditPostsListComponent } from './reddit-posts-list.component';

describe('RedditPostsListComponent', () => {
  let component: RedditPostsListComponent;
  let fixture: ComponentFixture<RedditPostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditPostsListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedditPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
