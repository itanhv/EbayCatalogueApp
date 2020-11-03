import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {ItemInfoModel} from '../models/ItemInfoModel';
import {CallEbayService} from "../call-ebay.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  //stores items returned from the API response
  items;

  //stores the keyword used for searching
  searchedKeyword;

  //stores data about which item cards are currently collapsed
  public isCollapsed = Array<boolean>(100).fill(true);

  // public selectedIndex: number = 0;

  //current page of items being displayed
  p: number = 1;
  displayNoItems = false;
  noItems = true;
  item: ItemInfoModel = new ItemInfoModel({
    title: "iphone",
    Image: "www.xyz.com",
    Price: "560$",
    Location: "USA",
    Condition: "New",
    ShippingCost:"10$",
    ShippingType: "Expedited"

  });


  constructor(private callEbay : CallEbayService) { }

  ngOnInit(): void {
  this.callEbay.returnedItems.subscribe((returnedItems)=>{
    //the keyswords used for the search
    this.searchedKeyword = returnedItems['keywords'];

    //the items returned from the API are stores in items
    this.items = returnedItems['sendItems'];

    //if no items are returned from the API
    this.noItems = returnedItems['noItems'];
    this.displayNoItems = returnedItems['noItems'];
  });
  }

  openTabs(i,id){
    //Showing detail tabs of an item card
    this.isCollapsed[this.items.indexOf(i)] = !this.isCollapsed[this.items.indexOf(i)];
  }

}
