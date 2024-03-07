export type GetCollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;

export type GetCollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, slug: string, description: string, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } }, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, slug: string, name: string }>, children?: Array<{ __typename?: 'Collection', id: string, slug: string, name: string, featuredAsset?: { __typename?: 'Asset', id: string, width: number, height: number, name: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } } }> } };

export type SearchProductsQueryVariables = Exact<{
  input: SearchInput;
}>;


export type SearchProductsQuery = { __typename?: 'Query', search: { __typename?: 'SearchResponse', totalItems: number, items: Array<{ __typename?: 'SearchResult', productId: string, slug: string, productName: string, description: string, priceWithTax: { __typename?: 'PriceRange', min: number, max: number } | { __typename?: 'SinglePrice' }, productAsset?: { __typename?: 'SearchResultAsset', id: string, preview: string, focalPoint?: { __typename?: 'Coordinate', x: number, y: number } } }>, facetValues: Array<{ __typename?: 'FacetValueResult', count: number, facetValue: { __typename?: 'FacetValue', id: string, name: string, facet: { __typename?: 'Facet', id: string, name: string } } }> } };