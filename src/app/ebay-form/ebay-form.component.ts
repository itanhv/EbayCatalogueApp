import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import {Router} from "@angular/router";
import {CallEbayService} from "../call-ebay.service";
import { ItemCardComponent } from "../item-card/item-card.component";

@Component({
  selector: 'app-ebay-form',
  templateUrl: './ebay-form.component.html',
  styleUrls: ['./ebay-form.component.css']
})
export class EbayFormComponent implements OnInit {
  //status of the form
  submitted = false;

  //reference to the form
	itemForm: FormGroup;

  //the component to display on API response
  currentComponent = null;

  // data received from the json resposnse
  itemsReceived : any;
  constructor(private formBuilder: FormBuilder, private callebay : CallEbayService ) {

  }

  emptyKeywords(){
    // if keywords firls is empty, form should not submit.
    return (this.submitted && this.itemForm.controls.keywords.errors != null);
  }

  priceNegative(){

    // if price is negative the form should not submit
    let val : boolean = this.itemForm.controls.MinPrice.value > this.itemForm.controls.MaxPrice.value;

    //if min price or max price is not mentioned this error will not occur
    if(this.itemForm.controls.MaxPrice.value === '' || this.itemForm.controls.MaxPrice.value === null || this.itemForm.controls.MinPrice.value === '' || this.itemForm.controls.MinPrice.value === ''){
      val = false
    }
    // if maxprice > minprice then set error
    if(val) {
      this.itemForm.controls['MaxPrice'].setErrors({incorrect: true});
    }
    if(!val && this.itemForm.controls.MaxPrice.value>0){
      this.itemForm.controls['MaxPrice'].setErrors(null);
    }
    if(this.itemForm.invalid == true){
    }
    return (this.submitted && (val || this.itemForm.controls.MinPrice.errors != null || this.itemForm.controls.MaxPrice.errors != null || this.itemForm.controls.MaxPrice.errors ));
  }



  ngOnInit(): void {
    this.submitted = false;
    console.log("submitted in on init:" + this.submitted);
    // setting initial values, validators for the form
    this.itemForm = this.formBuilder.group({
      keywords : ['', Validators.required],
      MinPrice : ['',Validators.min(0)],
      MaxPrice : ['',Validators.min(0)],
      new : [false],
      used: [false],
      good: [false],
      verygood: [false],
      acceptable: [false],
      sortOrder:['BestMatch'],
      ExpeditedShippingType:[false],
      ReturnsAcceptedOnly:[false],
      FreeShippingOnly:[false]
    }

    );

  }

  onSubmit1(){
    let url : string = "";
  	this.submitted = true;
  	if(this.itemForm.invalid == true)
  	{
  		return;
  	}

    this.currentComponent = null;
    // generating url with query parameters
    let formData = (this.itemForm.value);
    url+="search?keywords="+String(formData["keywords"]);
    url+="&sortOrder="+String(formData["sortOrder"]);
    if(formData["MinPrice"]===null){
      url+="&MinPrice=";
    }
    else url+="&MinPrice="+String(formData["MinPrice"]);

    if(formData["MaxPrice"]===null){
      url+="&MaxPrice=";
    }
    else url+="&MaxPrice="+String(formData["MaxPrice"]);

    url+="&ReturnsAcceptedOnly="+String(formData["ReturnsAcceptedOnly"]);
    url+="&FreeShippingOnly="+String(formData["FreeShippingOnly"]);
    url+="&ExpeditedShippingType="+String(formData["ExpeditedShippingType"]);
    url+="&new="+String(formData["new"]);
    url+="&used="+String(formData["used"]);
    url+="&good="+String(formData["good"]);
    url+="&verygood="+String(formData["verygood"]);
    url+="&acceptable="+String(formData["acceptable"]);
    // subscription to the API Service
    this.callebay.getItems(url).subscribe((data: any) =>{
      this.itemsReceived = data;
      this.currentComponent = ItemCardComponent;
    });


  }

  clearForm(){
    // clearing the form
    this.currentComponent = null;
    // setting default form values
    let defaultFormValues = {
      keywords: "",
      MinPrice: "",
      MaxPrice: "",
      new: false,
      used: false,
      verygood: false,
      good: false,
      acceptable: false,
      sortOrder: 'BestMatch',
      ExpeditedShippingType: false,
      ReturnsAcceptedOnly: false,
      FreeShippingOnly: false
    };

    this.itemForm.reset(defaultFormValues);
    this.submitted = false;
  }
};
