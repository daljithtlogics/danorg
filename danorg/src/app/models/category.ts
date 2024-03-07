export interface Category { 
      productId: string;
      slug: string;
      productName: string;
      description: string;
	  inStock: Boolean;
	  currencyCode: string;
	  productVariantId: number;
	  productVariantName: string;
	  price:
         {
            min: number;
            max: number;
			value: number;
            __typename: string;
          }
      priceWithTax:
         {
            min: number;
            max: number;
            value: number;
            __typename: string;
          }
      productAsset:
       {
            id: string;
            preview: string;
            focalPoint: {
              x: number;
              y: number;
              __typename: string;
            };
            __typename: string;
        }
    }

export interface Collection {
	__typename: string;
	id: string;
	name: string;
	slug: string;
	description: string;
	featuredAsset:{
		source:string
	}
    breadcrumbs: CollectionBreadcrumb[];
}

export interface CollectionBreadcrumb {
  __typename: string;
  id: string;
  name: string;
  slug: string;
}
