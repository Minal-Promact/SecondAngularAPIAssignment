import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Carousel } from '../carousel';
import { CarouselService } from '../carousel.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { carouselRequest } from '../carouselRequest';

@Component({
  selector: 'app-carousel-slider-list',
  templateUrl: './carousel-slider-list.component.html',
  styleUrls: ['./carousel-slider-list.component.css']
})
export class CarouselSliderListComponent implements OnInit {

  public lstCarousel: Carousel[] = [];
  carousel: Carousel;
  isAddMode: boolean;
  carouselRequest: carouselRequest;
  @Output() carouselEmitter = new EventEmitter<any>();

  constructor(private carouselService: CarouselService,
    private router: Router) {
    this.isAddMode = false;
  }

  ngOnInit(): void {
    this.getCarouselList();

  }

  public getCarouselList(): any {
    debugger;
    this.carouselService.getCarouselList().subscribe(
      data => {
        debugger;
        this.lstCarousel = data;
        console.log(this.lstCarousel)
      });
  }

  onSubmit(data) {
    debugger;
    console.log(data);
    this.lstCarousel = this.lstCarousel.filter(i => i.imageUrl.toLowerCase().indexOf(data.imageUrl.toLocaleLowerCase()) !== -1);
    console.log(this.lstCarousel);
    debugger;
    if (this.lstCarousel.length == 0) {
      this.carouselService.createEmployee(data).subscribe(data => {
        console.log(data);
        this.lstCarousel = this.getCarouselList();
        this.carouselEmitter.emit(this.lstCarousel)
        alert("The image is saved successfully.");
        this.isAddMode = false;
      },
        error => console.log(error));
    }
    else {
      alert("The image is already exists.");
      this.lstCarousel = this.getCarouselList();
      this.carouselEmitter.emit(this.lstCarousel)

      this.isAddMode = false;
    }
  }

  addCarousel() {
    this.isAddMode = true;
  }

  deleteSlide(imageUrl: string) {
    debugger;
    this.carouselService.deleteEmployee(imageUrl).subscribe(data => {
      this.lstCarousel = this.getCarouselList();
      this.carouselEmitter.emit(this.lstCarousel)
      alert("The image is deleted successfully.");
    },
      error => console.log(error));
  }

}
function newEventEmitter<T>() {
  throw new Error('Function not implemented.');
}

