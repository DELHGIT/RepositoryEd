import { Component, OnInit } from '@angular/core';
import Business from '../Business';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[];

  constructor(private bs: BusinessService) { }

  ngOnInit() {
    this.getBusinesses();
  }

  getBusinesses(): void {
    this.bs.getBusinesses()
    .subscribe((data: Business[]) => {
    this.businesses = data;

    this.businesses.forEach(element => { 
switch (element.gender_type) {
  case null:
  case undefined:
  case "":
  case "M":
  case "Homme":
    element.gender_type = "Homme";
    break;

    case "Femme":
    element.gender_type = "Femme";
    break;

  default:
  element.gender_type = "Femme";

    break;
}

     });
    })
    }

   SringisEmpty(str) {
      str=str.trim();
      return (!str || 0 === str.length);
  }

  deleteBusiness(id) {
    this.bs.deleteBusiness(id).subscribe(res => {
      console.log('Deleted');
      this.getBusinesses();
    });
  }
}