import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeteditComponent } from './setedit.component';

describe('SeteditComponent', () => {
  let component: SeteditComponent;
  let fixture: ComponentFixture<SeteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
