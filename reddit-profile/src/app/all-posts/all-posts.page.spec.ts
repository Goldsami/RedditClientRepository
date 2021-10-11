import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllPostsPage } from './all-posts.page';

describe('AllPostsPage', () => {
  let component: AllPostsPage;
  let fixture: ComponentFixture<AllPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllPostsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AllPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
