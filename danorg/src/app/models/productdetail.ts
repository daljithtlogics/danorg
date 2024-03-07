export interface Productdetail {
	product:{		   
		id: number,
		slug: string,
		name: string,
		price: number;
		description:string,		
		collections: [{ id:number; name: string; slug: string; }];
		featuredAsset:{
			source:string
		}
		assets:[{
			id:number,
			name:string,
			preview:string,
			source:string,
			height:number,
			width:number
		}];   
		variants:[{
		    id:number,
			name:string,
			price:number,
			priceWithTax:number,
			sku:string,
			stockLevel:string,
			currencyCode:string,
		}]		
	}
}