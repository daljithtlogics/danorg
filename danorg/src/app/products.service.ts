import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apollo: Apollo) {}

  getProducts(): Observable<any> {
    const query = gql`
      {
        products {
          items {
            id
            name
            slug
            description
            featuredAsset {
              preview
            }
            variants {
              priceWithTax {
                value
              }
              stockOnHand
            }
          }
        }
      }
    `;

    return this.apollo
      .query<any>({
        query: query,
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data.products.items));
  }
}
