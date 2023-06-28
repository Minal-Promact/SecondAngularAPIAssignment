import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Carousel } from './carousel';
import { carouselRequest } from './carouselRequest';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private baseURL = "/api/Carousel";

  constructor(private httpClient: HttpClient) { } 
    

    getCarouselList(): Observable<Carousel[]> {

      return this.httpClient.get<Carousel[]>(this.baseURL)
         .pipe(
            catchError(this.handleError)
         );
   }   

    createEmployee(carousel: carouselRequest): Observable<carouselRequest> {
      debugger
      return this.httpClient.post<carouselRequest>(this.baseURL, carousel)
         .pipe(
            catchError(this.handleError)
         );
   }    

    deleteEmployee(id: number): Observable<{}> {

      const url = `${this.baseURL}/${id}`;
      return this.httpClient.delete(url, httpOptions)
         .pipe(
            catchError(this.handleError)
         );
    }

    private handleError(error: HttpErrorResponse) {

      if (error.error instanceof ErrorEvent) {
  
         // A client-side or network error occurred.
  
         console.error('An error occurred:', error.error.message);
  
      } else {
  
         // Server error
  
         console.error(
  
            `Backend returned code ${error.status}, ` +
  
            `body was: ${error.error}`);  
      }
  
      return throwError(
  
         'Something bad happened; please try again later.');
  
   }
}
