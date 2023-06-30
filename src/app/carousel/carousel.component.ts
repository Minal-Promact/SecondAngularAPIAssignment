import { Component, Inject, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Carousel } from '../shared/carousel';
import { CarouselService } from '../service/carousel.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT, NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,@Inject(DOCUMENT) private _document: Document,private toastr: ToastrService) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    this.getCarouselList(); 
  }
  ngOnInit(): void {
    this.getCarouselList();        
  } 

  //get list carousel to show on ui
  private getCarouselList() {
    debugger;
    this.carouselService.getCarouselList().subscribe(
      data => {
        debugger;
        this.lstCarousel = data;
        console.log(this.lstCarousel)
      });
  };

  
//submit slide for carousel
    onSubmit(addNewSlide: NgForm) {
      
      console.log(addNewSlide.form.value);
      this.lstCarousel = this.lstCarousel.filter(i => i.imageUrl.toLowerCase().indexOf(addNewSlide.form.value.imageUrl.toLocaleLowerCase()) !== -1);
      console.log(this.lstCarousel);
      
      if (this.lstCarousel.length == 0) {
        this.carouselService.createEmployee(addNewSlide.form.value).subscribe(data => {
          console.log(data); 
          this.showSuccess("The image is saved successfully.","Success");
          this.getCarouselList();
          addNewSlide.resetForm();             
        },
          error => console.log(error));
      }
      else {        
        this.toastr.info("The image is already exists.","Warning");
        this.getCarouselList(); 
        addNewSlide.resetForm();                
      }
    } ;
  
    //Delete Slide
    deleteSlide(id: number) {
     
      this.carouselService.deleteEmployee(id).subscribe(data => {    
        
        this.showSuccess("The image is deleted successfully.","Success");
        this.getCarouselList();    
      },
        error => console.log(error));
    }

    //show toastr box
    showSuccess(message, title){
      this.toastr.success(message, title)
  };
}
