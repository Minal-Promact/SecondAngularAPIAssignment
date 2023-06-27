import { Component, Inject, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Carousel } from '../carousel';
import { CarouselService } from '../carousel.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit{
  title = 'ng-carousel-demo';
  public lstCarousel: Carousel[] = [];

  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "https://picsum.photos/id/700/900/500"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "https://picsum.photos/id/1011/900/500"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "https://picsum.photos/id/984/900/500"}
  ];
  
  constructor(config: NgbCarouselConfig,private carouselService: CarouselService,
    private router: Router,@Inject(DOCUMENT) private _document: Document) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    this.getCarouselList(); 
  }
  ngOnInit(): void {
    this.getCarouselList();        
  }

  refresh():void {
    this._document.defaultView.location.reload();
  }

  private getCarouselList() {
    debugger;
    this.carouselService.getCarouselList().subscribe(
      data => {
        debugger;
        this.lstCarousel = data;
        console.log(this.lstCarousel)
      });
  }

  onCarousel(carousel: any) {
    this.lstCarousel = carousel;
    this.refresh();
    }
}
