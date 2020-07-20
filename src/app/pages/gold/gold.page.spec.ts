import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoldPage } from './gold.page';

describe('GoldPage', () => {
  let component: GoldPage;
  let fixture: ComponentFixture<GoldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
