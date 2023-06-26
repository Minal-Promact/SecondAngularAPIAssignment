import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSliderListComponent } from './carousel-slider-list.component';

describe('CarouselSliderListComponent', () => {
  let component: CarouselSliderListComponent;
  let fixture: ComponentFixture<CarouselSliderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselSliderListComponent]
    });
    fixture = TestBed.createComponent(CarouselSliderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
