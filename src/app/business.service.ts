import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import Business from './Business';
import { Observable } from 'rxjs';


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

  uri = 'http://localhost:4000/business';//'http://localhost:4200/business';
  

  constructor(
    private http: HttpClient) {
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

  updateBusinessObject(p_business:Business) : Observable<Business> {
    return this.updateBusiness(p_business.person_name,
      p_business.business_name,
      p_business.business_gst_number,
      p_business.address,
      p_business._id);
  }

  updateBusiness(person_name, business_name, business_gst_number, address, id) : Observable<Business> {

    const obj = {
        person_name: person_name,
        business_name: business_name,
        business_gst_number: business_gst_number,
        address : address
      };
   return  this.http.post<Business>(`${this.uri}/update/${id}`, obj) ;
  //   this.http.post(`${this.uri}/update/${id}`, obj) .subscribe(res => console.log('Done'));
    // return this.http.post(`${this.uri}/update/${id}`, obj);//update automatically after an edit
  }

  deleteBusiness(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }


}
