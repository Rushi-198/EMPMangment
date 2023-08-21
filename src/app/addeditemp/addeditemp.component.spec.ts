import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditempComponent } from './addeditemp.component';

describe('AddeditempComponent', () => {
  let component: AddeditempComponent;
  let fixture: ComponentFixture<AddeditempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
