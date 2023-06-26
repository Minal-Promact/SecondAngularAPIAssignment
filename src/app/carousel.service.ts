import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carousel } from './carousel';
import { carouselRequest } from './carouselRequest';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private baseURL;

  constructor(private httpClient: HttpClient) { }
  
    getCarouselList(): Observable<Carousel[]>{
      this.baseURL = "https://localhost:7069/api/Carousel/GetAllCarousel"
      return this.httpClient.get<Carousel[]>(`${this.baseURL}`);    
    }

    createEmployee(carousel: carouselRequest): Observable<Object>{
      this.baseURL = "https://localhost:7069/api/Carousel/AddCarousel"
      return this.httpClient.post(`${this.baseURL}`, carousel);
    }

    deleteEmployee(imageUrl: string): Observable<Object>{
      this.baseURL = "https://localhost:7069/api/Carousel/DeleteCarousel?imageUrl"
      return this.httpClient.delete(`${this.baseURL}=${imageUrl}`);
    }
}
