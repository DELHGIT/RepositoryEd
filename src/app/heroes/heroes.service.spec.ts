import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Hero } from '../hero';
//import { BusinessService } from './heroes.service';
import { HttpErrorHandler } from '../http-error-handler.service';
import { MessageService } from '../message.service';
import { HeroesService } from './heroes.service';

describe('BusinessService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroesService: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        HeroesService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    heroesService = TestBed.get(HeroesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// businessService method tests begin ///

  describe('#getHeroes', () => {
    let expectedHeroes: Hero[];

    beforeEach(() => {
      heroesService = TestBed.get(HeroesService);
      expectedHeroes = [
        { id: 1, name: 'A',power :'power' },
        { id: 2, name: 'B' ,power :'power' },
       ] as Hero[];
    });

    it('should return expected heroes (called once)', () => {

      heroesService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      // businessService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(heroesService.heroesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedHeroes);
    });

    it('should be OK returning no heroes', () => {

      heroesService.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(0, 'should have empty heroes array'),
        fail
      );

      const req = httpTestingController.expectOne(heroesService.heroesUrl);
      req.flush([]); // Respond with no heroes
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty heroes result', () => {

      heroesService.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(0, 'should return empty heroes array'),
        fail
      );

      const req = httpTestingController.expectOne(heroesService.heroesUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected heroes (called multiple times)', () => {

      heroesService.getHeroes().subscribe();
      heroesService.getHeroes().subscribe();
      heroesService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      const requests = httpTestingController.match(heroesService.heroesUrl);
      expect(requests.length).toEqual(3, 'calls to getHeroes()');

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob',power:'power'}]);
      requests[2].flush(expectedHeroes);
    });
  });

  describe('#updateHero', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${heroesService.heroesUrl}/?id=${id}`;

    it('should update a hero and return it', () => {

      const updateHero: Hero = { id: 1, name: 'A',power:'power' };

      heroesService.updateHero(updateHero).subscribe(
        data => expect(data).toEqual(updateHero, 'should return the hero'),
        fail
      );

      // businessService should have made one request to PUT hero
      const req = httpTestingController.expectOne(heroesService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateHero });
      req.event(expectedResponse);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into return of the update hero', () => {
      const updateHero: Hero = { id: 1, name: 'A',power:'power' };

      heroesService.updateHero(updateHero).subscribe(
        data => expect(data).toEqual(updateHero, 'should return the update hero'),
        fail
      );

      const req = httpTestingController.expectOne(heroesService.heroesUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  // TODO: test other businessService methods
});
