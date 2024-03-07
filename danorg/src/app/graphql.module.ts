import { NgModule, PLATFORM_ID } from '@angular/core';
import { APP_BASE_HREF, isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

import possibleTypesData from './intro-results';

//const uri = 'https://demo.vendure.io/shop-api'; // <-- add the URL of the GraphQL server here

//const uri = 'http://157.245.36.128:3000/shop-api'; // <-- add the URL of the GraphQL server here

let apolloCache: InMemoryCache;
let providedCacheState: any | undefined;

const environment = {
    production: false,
    apiHost: 'http://157.245.36.128',
    apiPort: 3000,
    shopApiPath: 'shop-api',
    baseHref: '/',
    tokenMethod: 'bearer',
};

export function createApollo(httpLink: HttpLink, platformId: any) {
    // Note: the intermediate assignment to `fn` is required to prevent
    // an angular compiler error. See https://stackoverflow.com/a/51977115/772859
	
    let {apiHost, apiPort, shopApiPath} = environment;
    const isServer = isPlatformServer(platformId);
    apolloCache = new InMemoryCache({
        possibleTypes: possibleTypesData.possibleTypes,
        typePolicies: {
            Order: {
                fields: {
                    adjustments: {
                        merge: (existing, incoming) => incoming,
                    },
                    lines: {
                        merge: (existing, incoming) => incoming,
                    }
                }
            },
            OrderLine: {
                fields: {
                    adjustments: {
                        merge: (existing, incoming) => incoming,
                    },
                }
            }
        }
    });
    if (providedCacheState) {
        apolloCache.restore(providedCacheState);
    }
    if (isServer) {
        apiHost = apiHost;
        apiPort = apiPort;
        shopApiPath = shopApiPath;
    }
    const result = {
        cache: apolloCache,
        link: ApolloLink.from([
            setContext(() => {
                if (!isServer) {
                    if (environment.tokenMethod === 'bearer') {
                        const authToken = localStorage.getItem('authToken');
                        if (authToken) {
                            return {
                                headers: {
                                    authorization: `Bearer ${authToken}`,
                                },
                            };
                        }
                    }
                }
				return {};
            }),
            httpLink.create({
                uri: `${apiHost}:${apiPort}/${shopApiPath}`,
                withCredentials: true,
            })]),
    };
    return result;
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, PLATFORM_ID],
    },
  ],
})
export class GraphQLModule {
	
    constructor(private transferState: TransferState) {}
	
	private readonly STATE_KEY = makeStateKey<any>('apollo.state');
	
	extractState() {
		return this.transferState.get<any>(this.STATE_KEY, {});
	}

    restoreState(state: any) {
		this.transferState.set<any>(this.STATE_KEY, state);
		if (apolloCache) {
		  apolloCache.restore(state);
		}
		providedCacheState = state;
	  }
	
}