export type InputMaybe<T> = T;
export type Maybe<T> = T;
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;  
	DateTime: any;  
	JSON: any;
	Upload: any;
};

export type BooleanOperators = {
	eq?: InputMaybe<Scalars['Boolean']>;
};

export type DateRange = {
	end: Scalars['DateTime'];
	start: Scalars['DateTime'];
};

export type StringOperators = {
	contains?: InputMaybe<Scalars['String']>;
	eq?: InputMaybe<Scalars['String']>;
	in?: InputMaybe<Array<Scalars['String']>>;
	notContains?: InputMaybe<Scalars['String']>;
	notEq?: InputMaybe<Scalars['String']>;
	notIn?: InputMaybe<Array<Scalars['String']>>;
	regex?: InputMaybe<Scalars['String']>;
};

export type NumberRange = {
	end: Scalars['Float'];
	start: Scalars['Float'];
};

export type DateOperators = {
	after?: InputMaybe<Scalars['DateTime']>;
	before?: InputMaybe<Scalars['DateTime']>;
	between?: InputMaybe<DateRange>;
	eq?: InputMaybe<Scalars['DateTime']>;
};

export type NumberOperators = {
	between?: InputMaybe<NumberRange>;
	eq?: InputMaybe<Scalars['Float']>;
	gt?: InputMaybe<Scalars['Float']>;
	gte?: InputMaybe<Scalars['Float']>;
	lt?: InputMaybe<Scalars['Float']>;
	lte?: InputMaybe<Scalars['Float']>;
};

export type OrderFilterParameter = {
	active?: InputMaybe<BooleanOperators>;
	code?: InputMaybe<StringOperators>;
	createdAt?: InputMaybe<DateOperators>;
	currencyCode?: InputMaybe<StringOperators>;
	orderPlacedAt?: InputMaybe<DateOperators>;
	shipping?: InputMaybe<NumberOperators>;
	shippingWithTax?: InputMaybe<NumberOperators>;
	state?: InputMaybe<StringOperators>;
	subTotal?: InputMaybe<NumberOperators>;
	subTotalWithTax?: InputMaybe<NumberOperators>;
	total?: InputMaybe<NumberOperators>;
	totalQuantity?: InputMaybe<NumberOperators>;
	totalWithTax?: InputMaybe<NumberOperators>;
	updatedAt?: InputMaybe<DateOperators>;
};

export type OrderListOptions = {
	filter?: InputMaybe<OrderFilterParameter>;
	skip?: InputMaybe<Scalars['Int']>;
	sort?: InputMaybe<OrderSortParameter>;
	take?: InputMaybe<Scalars['Int']>;
};

export enum SortOrder {
	ASC = 'ASC',
	DESC = 'DESC'
}

export type OrderSortParameter = {
	code?: InputMaybe<SortOrder>;
	createdAt?: InputMaybe<SortOrder>;
	id?: InputMaybe<SortOrder>;
	orderPlacedAt?: InputMaybe<SortOrder>;
	shipping?: InputMaybe<SortOrder>;
	shippingWithTax?: InputMaybe<SortOrder>;
	state?: InputMaybe<SortOrder>;
	subTotal?: InputMaybe<SortOrder>;
	subTotalWithTax?: InputMaybe<SortOrder>;
	total?: InputMaybe<SortOrder>;
	totalQuantity?: InputMaybe<SortOrder>;
	totalWithTax?: InputMaybe<SortOrder>;
	updatedAt?: InputMaybe<SortOrder>;
};

export interface FeaturedAsset {
  id: string;
  width: number;
  height: number;
  name: string;
  preview: string;
  focalPoint: {
    x: number;
    y: number;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  product: {
	name: string;
    slug: string;	
  }
}

export interface Promotion {
	id: string;
	couponCode: string;
	name: string;
	perCustomerUsageLimit: number;
}

export interface Discount {
  amount: number;
  amountWithTax: number;
  description: string;
  adjustmentSource: string;
  type: string;
}

export interface Line {
  id: number;
  featuredAsset: FeaturedAsset;
  unitPrice: number;
  unitPriceWithTax: number;
  quantity: number;
  linePriceWithTax: number;
  discountedLinePriceWithTax: number;
  productVariant: ProductVariant;
  discounts: Discount[];
}

export interface ShippingMethod {
  id: string;
  code: string;
  name: string;
  description: string;
}

// added the payments field into the Order interface
export interface Order {
  __typename: string;
  id: string;
  code: string;
  state: string;
  active: boolean;
  updatedAt: string;
  orderPlacedAt: string;
  customer: Customer;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  payments: Payment[];
  lines: Line[];
  totalQuantity: number;
  subTotal: number;
  subTotalWithTax: number;
  total: number;
  totalWithTax: number;
  shipping: number;
  shippingWithTax: number;
  shippingLines: {
    priceWithTax: number;
    shippingMethod: ShippingMethod;
  }[];
  currencyCode: string;
  discounts: Discount[];
  promotions: Promotion[];
}

// added the Payment interface (see structure in Vendure docs)
export interface Payment {
	method: string;
	amount: number;
	state: PaymentState;
	errorMessage: string | undefined;
	transactionId: string;
	metadata: JSON;
	order: Order;
}

// added the PaymentState interface
export type PaymentState =
  | 'Created'
  | 'Error'
  | 'Cancelled'
  | keyof CustomPaymentStates
  | keyof PaymentStates;


  export type PaymentStates = 'Authorized' | 'Settled' | 'Declined';

  export interface CustomPaymentStates {
  }

export interface ErrorResult {
  __typename: string;
  errorCode: string;
  message: string;
}

export interface InsufficientStockError {
  order: Order;
  __typename: string;
  errorCode: string;
  message: string;
}

export interface AddItemToOrderMutation {
  addItemToOrder: Order | ErrorResult | InsufficientStockError;
}

export interface AddItemToOrderMutationVariables {
  productVariantId: number;
  quantity: number;
} 

export interface removeOrderLineMutation {
	removeOrderLine: Order | OrderModificationError	
}

export interface OrderModificationError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface NegativeQuantityError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface OrderLimitError {
	__typename: string;
	errorCode: string;
	message: string;
	maxItems: number;
}

export interface removeOrderLineMutationVariables{
	orderLineId: number;	
}

export interface adjustOrderLineMutationVariables{
	orderLineId: number;	
	quantity: number;	
}

export interface adjustOrderLineMutation {
	adjustOrderLine: Order | OrderModificationError	| NegativeQuantityError | OrderLimitError | InsufficientStockError
}

export interface CouponCodeExpiredError{
	__typename: string;
	errorCode: string;
	message: string;
	couponCode: string;
}

export interface CouponCodeInvalidError{
	__typename: string;
	errorCode: string;
	message: string;
	couponCode: string;
}

export interface CouponCodeLimitError{
	__typename: string;
	errorCode: string;
	message: string;
	couponCode: string;
	limit: number;
}

export interface applyCouponCodeMutation{
	applyCouponCode: Order | CouponCodeExpiredError | CouponCodeLimitError | CouponCodeInvalidError
}

export interface applyCouponCodeMutationVariables{
	couponCode: string;
}

export interface removeCouponCodeMutation{
	removeCouponCode: Order 
}

export interface removeCouponCodeMutationVariables{
	couponCode: string;
}

export interface availableCountries{
	id: number;
	languageCode: string;
	code: string;
	type: string;
	name: string;
	enabled: boolean;
}

export interface eligibleShippingMethods{
	id: number;
	code: string;
	name: string;
	price: number;
	priceWithTax: number;
	description: string;
	metadata: JSON;
}

export interface eligiblePaymentMethods{
	id: number;
	code: string;
	name: string;
	description: string;
	isEligible: boolean;
	eligibilityMessage: string;
}

export interface setShippingAddressMutation{
	setOrderShippingAddress: Order | NoActiveOrderError;
}

export interface setShippingAddressMutationVariable{
	input: CreateAddressInput;
}

export interface setBillingAddressMutation{
	setOrderBillingAddress: Order | NoActiveOrderError;
}

export interface setBillingAddressMutationVariable{
	input: CreateAddressInput;
}

export interface NoActiveOrderError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface IneligibleShippingMethodError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface AlreadyLoggedInError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface EmailAddressConflictError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface GuestCheckoutError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface OrderAddress{
	fullName: string;
	company: string;
	streetLine1: string;
	streetLine2: string;
	city: string;
	province: string;
	postalCode: string;
	country: string;
	countryCode: string;
	phoneNumber: string;
	customFields: JSON;
}

export interface setShippingMethodMutation{
	setOrderShippingMethod: Order | OrderModificationError | IneligibleShippingMethodError | NoActiveOrderError;
}

export interface setShippingMethodMutationVariable{
	id: string;
}

export interface setCustomerForOrderMutation{
	setCustomerForOrder: Order | AlreadyLoggedInError | EmailAddressConflictError | NoActiveOrderError;
}

export interface setCustomerForOrderMutationVariable{
	input: CreateCustomerInput;
}


export interface CreateAddressInput {
	city?: InputMaybe<Scalars['String']>;
	company?: InputMaybe<Scalars['String']>;
	countryCode: Scalars['String'];
	customFields?: InputMaybe<Scalars['JSON']>;
	defaultBillingAddress?: InputMaybe<Scalars['Boolean']>;
	defaultShippingAddress?: InputMaybe<Scalars['Boolean']>;
	fullName?: InputMaybe<Scalars['String']>;
	phoneNumber?: InputMaybe<Scalars['String']>;
	postalCode?: InputMaybe<Scalars['String']>;
	province?: InputMaybe<Scalars['String']>;
	streetLine1: Scalars['String'];
	streetLine2?: InputMaybe<Scalars['String']>;
};

export type CreateCustomerInput = {
	customFields?: InputMaybe<Scalars['JSON']>;
	emailAddress: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	phoneNumber?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
};


export type RegisterCustomerInput = {	
	emailAddress: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	phoneNumber?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
	password?: InputMaybe<Scalars['String']>;
};

export interface transitionOrderToStateMutation{
	transitionOrderToState: Order | OrderStateTransitionError;
}

export interface transitionOrderToStateMutationVariable{
	state: string;
}

export interface OrderStateTransitionError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface Customer{
    __typename: string;
	id: string;
	title: string;
	firstName: string;
	lastName: string;
	phoneNumber: string
	emailAddress: string;
}

export interface GetCustomerAddress { 
	__typename: string;
	id: string;
	customer: Customer;
	shippingAddress:OrderAddress;	
}	

export interface SignInMutation { 
	login: 	CurrentUser | InvalidCredentialsError | NotVerifiedError | NativeAuthStrategyError;
}

export interface SignInMutationVariables {
	username: string;	
	password: string;
	rememberMe: boolean;
}

export interface InvalidCredentialsError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface NotVerifiedError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface NativeAuthStrategyError {
    __typename: string;
	errorCode: string;
	message: string;
}

export interface CurrentUser {
    __typename: string;
	id: string;
	identifier: string;
}
export interface TypeName { 
	__typename: string;
}
export interface ActiveCustomer {
    __typename: string;
	id: string;
	createdAt: any;
	updatedAt: any;
	title: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	emailAddress: string;
	user: {
		id: string;
		createdAt: any;
		updatedAt: any;
		identifier: string;
		verified:  boolean;
		roles: {
			id: string;
			code: string;
			description: string;
			permissions: string;
		}
		lastLogin: any;
	}
}



export interface AddPaymentToOrderMutation {
    addPaymentToOrder: Order | OrderPaymentStateError | PaymentFailedError | PaymentDeclinedError | OrderStateTransitionError | NoActiveOrderError | IneligiblePaymentMethodError;
}

export interface AddPaymentToOrderMutationVariable{
	input: {
		method:string;
		metadata?: Maybe<Scalars['JSON']>;
	};
}

export interface PaymentDeclinedError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface PaymentFailedError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface IneligiblePaymentMethodError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface OrderPaymentStateError {
	__typename: string;
	errorCode: string;
	message: string;
}

export interface OrderByCodeVariable{
	code: string;
}

export interface SignOut{
	success: boolean;
}

export interface Me{
	__typename: string;
	id: string;
	identifier: string;
	channels:{
		id: string;
		token: string;
		code: string;
	}[];
}

export interface Success{
    __typename: string;
    success: boolean;
}

export interface MissingPasswordError{
    __typename: string;
	errorCode: string;
	message: string;
}

export interface PasswordValidationError{
    __typename: string;
	errorCode: string;
	message: string;
}

export interface PasswordResetTokenExpiredError{
    __typename: string;
	errorCode: string;
	message: string;
}

export interface PasswordResetTokenInvalidError{
    __typename: string;
	errorCode: string;
	message: string;
}

export interface NotVerifiedError{
    __typename: string;
	errorCode: string;
	message: string;
}

export interface RegisterCustomerMutation { 
	registerCustomerAccount: Success | MissingPasswordError | PasswordValidationError | NativeAuthStrategyError;
}

export interface RegisterCustomerMutationVariables{
	input: RegisterCustomerInput;
}

export interface RequestPasswordResetMutation { 
	requestPasswordReset: Success | NativeAuthStrategyError;
}

export interface RequestPasswordResetMutationVariables{
	emailAddress: string;
}

export interface ResetPasswordMutation { 
	resetPassword: CurrentUser| PasswordValidationError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | NativeAuthStrategyError | NotVerifiedError;
}

export interface ResetPasswordMutationVariables { 
	token: string;
	password: string;
}

export interface GetOrderList {

		__typename: string;
		id: string; 
		orders: {
			__typename: string;
			items: {
				__typename: string;
				id: string;
				updatedAt: string;
				code: string;
				state: string;
				currencyCode: string;
				total: number;
				totalWithTax: number;
			}[]; 
			totalItems: number;
		}
	
}

export interface GetOrderListVariables {
	options?: InputMaybe<OrderListOptions>;
}

export interface CustomerAddress{

	id: string;
	addresses:{
		id: string;
		createdAt: any;
		updatedAt: any;
		fullName: string;
		company: string;
		streetLine1: string;
		streetLine2: string;
		city: string;
		province: string;
		postalCode: string;
		country: {
			id: string;
			code: string;
			name: string;
			enabled: boolean;
		}
		phoneNumber: string;
		defaultShippingAddress: boolean;
		defaultBillingAddress: boolean;
		customFields: JSON;
	}[];			
	
}

export interface Address{
    __typename: string;
	id: string;
	createdAt: any;
	updatedAt: any;
	fullName: string;
	company: string;
	streetLine1: string;
	streetLine2: string;
	city: string;
	province: string;
	postalCode: string;
	country: {
		id: string;
		code: string;
		name: string;
		enabled: boolean;
	}
	phoneNumber: string;
	defaultShippingAddress: boolean;
	defaultBillingAddress: boolean;
	customFields: JSON;
}

export interface Customer{
    __typename: string;
	id: string;
	createdAt: any;
	updatedAt: any;
	title: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	emailAddress: string;
	customFields: JSON;
}

export interface UpdateAddressMutation { 
	updateCustomerAddress: Address;
}

export interface UpdateAddressMutationVariables { 
	input: CreateAddressInput;
}

export interface UpdateCustomerInput {
	customFields?: InputMaybe<Scalars['JSON']>;
	emailAddress: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	phoneNumber?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
};

export interface UpdateCustomerMutation { 
	updateCustomer: Customer;
}

export interface UpdateCustomerMutationVariables { 
	input: UpdateCustomerInput;
}

export interface ChangePasswordMutation { 
	updateCustomerPassword: Success | InvalidCredentialsError | PasswordValidationError | NativeAuthStrategyError;
}

export interface ChangePasswordMutationVariables { 
	currentPassword: string;
	newPassword: string;
}

export interface CreateAddressMutation { 
	createCustomerAddress: Address;
}

export interface CreateAddressMutationVariables { 
	input: CreateAddressInput;
}