//definition of an item
export class ItemInfoModel{
    title: string;
    Image: string;
    Price : string;
    Location : string;
    CategoryName: string;
    Condition: string;
    ShippingType: string;
    ShippingCost: string;
    ShipToLocations: string;
    ExpeditedShipping: string;
    OneDayShippingAvailable: string;
    BestOfferEnabled: string;
    BuyItNowAvailable: string;
    ListingType: string;
    Gift: string;
    WatchCount: string;

    constructor(obj: any = null){
		if(obj != null){
			Object.assign(this, obj);
		}
	}
}
