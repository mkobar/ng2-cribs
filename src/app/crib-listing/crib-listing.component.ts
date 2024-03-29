import { Component, OnInit } from '@angular/core';
//import { cribs } from '../../data/cribs';
import { CribsService } from './../services/cribs.service';
import { UtilService } from './../services/util.service';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { Crib } from './../crib';

@Component({
  selector: 'app-crib-listing',
  templateUrl: './crib-listing.component.html',
  styleUrls: ['./crib-listing.component.css']
})
export class CribListingComponent implements OnInit {

//cribs: Array<any> = cribs;
  cribs: Array<Crib> = [];
  error: string = '';
  sortField: string = 'price';
  sortDirection: string = 'asc';
  sortFields: Array<string> = [
    'address',
    'area',
    'bathrooms',
    'bedrooms',
    'price',
    'type'
  ];

  constructor(
    private cribsService: CribsService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.cribsService.getAllCribs()
      .subscribe(
        data => this.cribs = data,
        error => this.error = error.statusText
      );

    this.cribsService.newCribSubject.subscribe(
      // use spread to place new data in front of array
      data => this.cribs = [data, ...this.cribs]  
    );
  }

}
