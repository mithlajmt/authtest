import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourselistingComponent } from './courselisting.component';

describe('CourselistingComponent', () => {
  let component: CourselistingComponent;
  let fixture: ComponentFixture<CourselistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourselistingComponent]
    });
    fixture = TestBed.createComponent(CourselistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
