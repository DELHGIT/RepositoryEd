import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  uri = 'http://localhost:4200/business';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('add : Done'));
  }

getBusinesses() {
  return this.http.get(`${this.uri}`);
}

editBusiness(id) {
  return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateBusiness(person_name, business_name, business_gst_number, id) {

    const obj = {
        person_name: person_name,
        business_name: business_name,
        business_gst_number: business_gst_number
      };
  // return  this.http.post(`${this.uri}/update/${id}`, obj) ;
     this.http.post(`${this.uri}/update/${id}`, obj) .subscribe(res => console.log('Done'));
    // return this.http.post(`${this.uri}/update/${id}`, obj);//update automatically after an edit
  }

  deleteBusiness(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  //#region   
   /** GET heroes from the server */
   getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.uri)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Hero[]>(this.uri, options)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.uri, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (id: number): Observable<{}> {
    const url = `${this.uri}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateHero (hero: Hero): Observable<Hero> {
    httpOptions.headers =  httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Hero>(this.uri, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }
}
