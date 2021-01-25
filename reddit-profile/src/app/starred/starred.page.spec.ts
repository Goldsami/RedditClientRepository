import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarredPage } from './starred.page';

describe('StarredPage', () => {
  let component: StarredPage;
  let fixture: ComponentFixture<StarredPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarredPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
