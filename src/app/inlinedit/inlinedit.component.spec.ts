import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineditComponent } from './inlinedit.component';

describe('InlineditComponent', () => {
  let component: InlineditComponent;
  let fixture: ComponentFixture<InlineditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
