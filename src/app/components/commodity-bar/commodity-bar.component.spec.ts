import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityBarComponent } from './commodity-bar.component';

describe('CommodityBarComponent', () => {
  let component: CommodityBarComponent;
  let fixture: ComponentFixture<CommodityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
