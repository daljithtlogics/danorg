"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[2699],{2699:(M,m,c)=>{c.r(m),c.d(m,{DanshopSearchModule:()=>j});var l=c(6895),u=c(1066),_=c(3293),g=c(4004),f=c(1884),v=c(7579),x=c(6063);class T extends v.x{constructor(o=1/0,e=1/0,n=x.l){super(),this._bufferSize=o,this._windowTime=e,this._timestampProvider=n,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,o),this._windowTime=Math.max(1,e)}next(o){const{isStopped:e,_buffer:n,_infiniteTimeWindow:a,_timestampProvider:r,_windowTime:s}=this;e||(n.push(o),!a&&n.push(r.now()+s)),this._trimBuffer(),super.next(o)}_subscribe(o){this._throwIfClosed(),this._trimBuffer();const e=this._innerSubscribe(o),{_infiniteTimeWindow:n,_buffer:a}=this,r=a.slice();for(let s=0;s<r.length&&!o.closed;s+=n?1:2)o.next(r[s]);return this._checkFinalizedStatuses(o),e}_trimBuffer(){const{_bufferSize:o,_timestampProvider:e,_buffer:n,_infiniteTimeWindow:a}=this,r=(a?1:2)*o;if(o<1/0&&r<n.length&&n.splice(0,n.length-r),!a){const s=e.now();let p=0;for(let d=1;d<n.length&&n[d]<=s;d+=2)p=d;p&&n.splice(0,p+1)}}}var Z=c(3099),t=c(4650),S=c(8227),y=c(7185),I=c(5506),C=c(9603),N=c(5211);function P(i,o){if(1&i&&(t.TgZ(0,"p",27)(1,"ins"),t._uU(2),t.ALo(3,"number"),t.qZA(),t.TgZ(4,"small"),t._uU(5),t.ALo(6,"number"),t.qZA()()),2&i){const e=t.oxw().$implicit;t.xp6(2),t.hij("ZAR ",t.xi3(3,2,e.priceWithTax.value/100,"1.2-2"),""),t.xp6(3),t.hij("Ex Tax: ZAR ",t.xi3(6,5,e.price.value/100,"1.2-2"),"")}}function w(i,o){if(1&i&&(t.TgZ(0,"p",27)(1,"ins"),t._uU(2),t.ALo(3,"number"),t.qZA(),t.TgZ(4,"small"),t._uU(5),t.ALo(6,"number"),t.qZA()()),2&i){const e=t.oxw().$implicit;t.xp6(2),t.hij("ZAR ",t.xi3(3,2,e.priceWithTax.min/100,"1.2-2"),""),t.xp6(3),t.hij("Ex Tax: ZAR ",t.xi3(6,5,e.price.min/100,"1.2-2"),"")}}function U(i,o){if(1&i&&(t.TgZ(0,"p",27)(1,"ins"),t._uU(2),t.ALo(3,"number"),t.qZA(),t.TgZ(4,"small"),t._uU(5),t.ALo(6,"number"),t.qZA()()),2&i){const e=t.oxw().$implicit;t.xp6(2),t.hij("ZAR ",t.xi3(3,2,e.priceWithTax.min/100,"1.2-2"),""),t.xp6(3),t.hij("Ex Tax: ZAR ",t.xi3(6,5,e.price.min/100,"1.2-2"),"")}}function W(i,o){1&i&&(t.TgZ(0,"p",27)(1,"ins"),t._uU(2,"Out of stock"),t.qZA()())}function b(i,o){if(1&i){const e=t.EpF();t.TgZ(0,"button",29),t.NdJ("click",function(){t.CHM(e);const a=t.oxw(2).$implicit,r=t.oxw(2);return t.KtG(r.addToCart(a.productVariantId,1))}),t.ALo(1,"replace"),t._UZ(2,"i",30),t.ALo(3,"replace"),t.qZA()}if(2&i){const e=t.oxw(2).$implicit;t.uIk("data-productId",e.productId)("data-productName",e.productName)("data-productPrice",t.lcZ(1,6,e.priceWithTax.min/100)),t.xp6(2),t.uIk("data-productId",e.productId)("data-productName",e.productName)("data-productPrice",t.lcZ(3,8,e.priceWithTax.min/100))}}function D(i,o){if(1&i){const e=t.EpF();t.TgZ(0,"button",29),t.NdJ("click",function(){t.CHM(e);const a=t.oxw(2).$implicit,r=t.oxw(2);return t.KtG(r.navigateToRoute(a.slug))}),t.ALo(1,"replace"),t._UZ(2,"i",30),t.ALo(3,"replace"),t.qZA()}if(2&i){const e=t.oxw(2).$implicit;t.uIk("data-productId",e.productId)("data-productName",e.productName)("data-productPrice",t.lcZ(1,7,e.priceWithTax.min/100))("data-productSlug",e.slug),t.xp6(2),t.uIk("data-productId",e.productId)("data-productName",e.productName)("data-productPrice",t.lcZ(3,9,e.priceWithTax.min/100))}}function L(i,o){if(1&i){const e=t.EpF();t.TgZ(0,"button",29),t.NdJ("click",function(){t.CHM(e);const a=t.oxw(2).$implicit,r=t.oxw(2);return t.KtG(r.navigateToRoute(a.slug))}),t.ALo(1,"replace"),t._UZ(2,"i",30),t.ALo(3,"replace"),t.qZA()}if(2&i){const e=t.oxw(2).$implicit;t.uIk("data-productId",e.productId)("data-productName",e.productName)("data-productPrice",t.lcZ(1,7,e.priceWithTax.min/100))("data-productSlug",e.slug),t.xp6(2),t.uIk("data-productId",e.productId)("data-productName",e.productName)("data-productPrice",t.lcZ(3,9,e.priceWithTax.min/100))}}function J(i,o){if(1&i&&(t.YNc(0,b,4,10,"ng-template",21),t.YNc(1,D,4,11,"ng-template",22),t.YNc(2,L,4,11,"ng-template",null,28,t.W1O)),2&i){const e=t.MAs(3),n=t.oxw().$implicit;t.Q6J("ngIf","SinglePrice"===n.priceWithTax.__typename),t.xp6(1),t.Q6J("ngIf",n.priceWithTax.min===n.priceWithTax.max)("ngIfElse",e)}}const h=function(i){return["/danshop/product-details/",i]};function R(i,o){if(1&i&&(t.TgZ(0,"div",14)(1,"div",15)(2,"div",16)(3,"a",2),t._UZ(4,"img",17),t.qZA()(),t.TgZ(5,"div",18)(6,"h4",19)(7,"a",20),t._uU(8),t.qZA()(),t.TgZ(9,"p"),t._uU(10),t.ALo(11,"slice"),t.ALo(12,"removeHtmlTags"),t.qZA(),t.YNc(13,P,7,8,"ng-template",21),t.YNc(14,w,7,8,"ng-template",22),t.YNc(15,U,7,8,"ng-template",null,23,t.W1O),t.YNc(17,W,3,0,"ng-template",21),t.TgZ(18,"div",24),t.YNc(19,J,4,3,"ng-template",21),t.TgZ(20,"button",25),t._UZ(21,"i",26),t.qZA()()()()()),2&i){const e=o.$implicit,n=t.MAs(16);t.xp6(3),t.Q6J("routerLink",t.VKq(16,h,e.slug)),t.xp6(1),t.s9C("src",e.productAsset.preview,t.LSH),t.xp6(3),t.Q6J("routerLink",t.VKq(18,h,e.slug)),t.xp6(1),t.Oqu(e.productName),t.xp6(2),t.hij("",t.Dn7(11,10,t.lcZ(12,14,e.description),0,100),"..."),t.xp6(3),t.Q6J("ngIf","SinglePrice"===e.priceWithTax.__typename),t.xp6(1),t.Q6J("ngIf",e.priceWithTax.min===e.priceWithTax.max)("ngIfElse",n),t.xp6(3),t.Q6J("ngIf",0==e.inStock),t.xp6(2),t.Q6J("ngIf",1==e.inStock)}}function $(i,o){if(1&i&&(t.TgZ(0,"div",5),t.YNc(1,R,22,20,"div",13),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.allProducts)}}const Y=function(){return["/danshop"]},k=_.Ps`
	query GetProducts($term: String!){
	  search(input: { groupByProduct: true, take: 100, term: $term }) {
		items {
			productId
			slug
			productName
			description
			inStock
			currencyCode
			productVariantId
			productVariantName
			price {
				... on PriceRange {
					min
					max
					__typename
				}
				__typename
				... on SinglePrice {
					value
					__typename
				}
			}
			  priceWithTax {
				... on PriceRange {
					min
					max
					__typename
				}
				__typename
					... on SinglePrice {
					value
				  __typename
				}	
			  }
			productAsset {
				id
				preview
				focalPoint {
					x
					y
					__typename
				}
				__typename
			}
			__typename
		}
		totalItems
		facetValues {
			count
			facetValue {
				id
				name
				facet {
					id
					name
					__typename
				}
				__typename
			}
			__typename
		}
		__typename
	  }
	}
`,q=[{path:"",component:(()=>{class i{constructor(e,n,a,r,s,p){this.apollo=e,this.cartService=n,this.toastrService=a,this.route=r,this.router=s,this.stateService=p,this.allProducts=[]}ngOnInit(){this.searchTerm$=this.route.queryParamMap.pipe((0,g.U)(e=>e.get("search")||""),(0,f.x)(),function A(i,o,e){let n,a=!1;return i&&"object"==typeof i?({bufferSize:n=1/0,windowTime:o=1/0,refCount:a=!1,scheduler:e}=i):n=i??1/0,(0,Z.B)({connector:()=>new T(n,o,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:a})}(1)),console.log(this.searchTerm$),this.apollo.watchQuery({query:k,variables:{term:this.searchTerm$}}).valueChanges.subscribe(({data:e})=>{this.allProducts=e.search.items,console.log(this.allProducts)})}navigateToRoute(e){this.router.navigate(["/danshop/product-details",e])}removeComma(e){return e.replace(",","")}addToCart(e,n){this.cartService.addItemToOrder(e,n).subscribe(s=>{if("id"in s&&s.id){const p=s;this.stateService.setState("activeOrderId",p?p.id:null),e&&(console.log(p,p.id+" Success"),this.cartService.getActiveOrder().subscribe(d=>{this.cartService.updateActiveOrder(d)}),this.toastrService.success("Product Added to Cart","Success!"))}else this.toastrService.error(s.message,"Error!")},s=>{console.error("API Error:",s)})}static#t=this.\u0275fac=function(n){return new(n||i)(t.Y36(_._M),t.Y36(S.N),t.Y36(y._W),t.Y36(u.gz),t.Y36(u.F0),t.Y36(I.b))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-danshop-search"]],decls:31,vars:3,consts:[[1,"breadcrumb"],[1,"container"],[3,"routerLink"],["aria-hidden","true",1,"fa","fa-home"],[1,"mid-inner"],[1,"row"],[1,"col-sm-12","full-wrap"],[1,"products-wrap"],["class","row",4,"ngIf"],[1,"tag-wrap"],[1,"col-sm-12"],[1,"inner"],["href","#",1,"btn"],["class","col-sm-3 pw-coll",4,"ngFor","ngForOf"],[1,"col-sm-3","pw-coll"],[1,"item"],[1,"image"],["alt","","width","100%",3,"src"],[1,"caption"],[2,"min-height","39px"],[1,"woocommerce-LoopProduct-link",3,"routerLink"],[3,"ngIf"],[3,"ngIf","ngIfElse"],["range",""],[1,"button-group"],["type","button","data-toggle","tooltip","title","Add to Wish List"],["aria-hidden","true",1,"fa","fa-heart"],[1,"price"],["range2",""],["type","button","data-toggle","tooltip","title","Add to Cart",3,"click"],["aria-hidden","true",1,"fa","fa-shopping-cart"]],template:function(n,a){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"ul")(3,"li")(4,"a",2),t._UZ(5,"i",3),t._uU(6,"Home "),t.qZA()(),t.TgZ(7,"li"),t._uU(8,"Search Results"),t.qZA()()()(),t.TgZ(9,"section",4)(10,"div",1)(11,"div",5)(12,"div",6)(13,"div",7),t.YNc(14,$,2,1,"div",8),t.qZA()()()()(),t.TgZ(15,"section",9)(16,"div",1)(17,"div",5)(18,"div",10)(19,"div",11)(20,"h2"),t._uU(21,"DAN Shop Emergency Hotline "),t.TgZ(22,"span"),t._uU(23,"Call for Assistance"),t.qZA()(),t.TgZ(24,"p"),t._uU(25,"DAN's Emergency Hotline staff members are on call 24 hours a day, 365 days a year, to provide information, assist with care coordination and evacuation assistance."),t.qZA(),t.TgZ(26,"h2"),t._uU(27,"27 11 266 4900"),t.qZA(),t.TgZ(28,"p")(29,"a",12),t._uU(30,"Shop Now"),t.qZA()()()()()()()),2&n&&(t.xp6(4),t.Q6J("routerLink",t.DdM(2,Y)),t.xp6(10),t.Q6J("ngIf",a.allProducts))},dependencies:[l.sg,l.O5,u.rH,l.OU,l.JJ,C.$,N.A]})}return i})()}];let E=(()=>{class i{static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(q),u.Bz]})}return i})(),j=(()=>{class i{static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[l.ez,E]})}return i})()}}]);