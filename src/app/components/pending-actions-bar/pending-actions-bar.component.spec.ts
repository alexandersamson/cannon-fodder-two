import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActionsBarComponent } from './pending-actions-bar.component';

describe('PendingActionsBarComponent', () => {
  let component: PendingActionsBarComponent;
  let fixture: ComponentFixture<PendingActionsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingActionsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
