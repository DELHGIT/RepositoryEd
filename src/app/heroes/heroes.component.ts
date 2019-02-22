import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { BusinessService } from '../business.service';
import Business from '../Business';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  providers: [ BusinessService ],
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //heroes: Hero[];
//  businessListe: any = {};
  businessListe: Business[];
  editBusiness: Business; // the hero currently being edited

  //constructor(private businessService: businessService) { }
  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.getBusinesses();
  }

  getBusinesses(): void {
    this.businessService.getBusinesses()
      .subscribe(b => this.businessListe = b as Business[]);
  }

  add(name: string): void {
   /* this.editBusiness = undefined;
    name = name.trim();
    if (!name) { return; }
    
    const newHero: Hero = { name } as Hero;
    this.businessService.addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
      */
  }

  delete(p_Business: Business): void {
    this.businessListe = this.businessListe.filter(h => h !== p_Business);
    this.businessService.deleteBusiness(p_Business._id).subscribe();
  }

  edit(p_Business) {
    this.editBusiness = p_Business;
  }

  search(searchTerm: string) {
    /*this.editBusiness = undefined;
    if (searchTerm) {
      this.businessService.searchHeroes(searchTerm)
        .subscribe(heroes => this.heroes = heroes);
    }*/
  }

  update() {
    if (this.editBusiness) {
      this.businessService.updateBusinessObject(this.editBusiness)
        .subscribe(_business => {
          // replace the hero in the heroes list with update from server
          const ix = _business ? (this.businessListe as Business[]).findIndex(h => h._id === _business._id) : -1;
          if (ix > -1) { this.businessListe[ix] = _business; }
        });
      this.editBusiness = undefined;
    }
  }
}
