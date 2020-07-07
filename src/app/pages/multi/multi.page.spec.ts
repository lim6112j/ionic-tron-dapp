import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiPage } from './multi.page';

describe('MultiPage', () => {
  let component: MultiPage;
  let fixture: ComponentFixture<MultiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
