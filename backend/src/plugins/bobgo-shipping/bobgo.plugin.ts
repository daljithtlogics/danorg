import {
    EventBus,
    LanguageCode,
    OrderStateTransitionEvent,
    PluginCommonModule,
    VendurePlugin,
} from '@vendure/core';
import { OnApplicationBootstrap } from '@nestjs/common';
import { filter } from 'rxjs/operators';

import './types';
import { BobgoService } from './service/bobgo.service';

@VendurePlugin({
	imports: [PluginCommonModule],
	providers:[BobgoService],
	configuration: config => {
		config.customFields.Order.push(
			{ name: 'channel_order_number', 
				type: 'string', 
				readonly: true, 
				label: [{ languageCode: LanguageCode.en, value: 'Bobgo Channel Number' }],
			},
			{ name: 'bobgoOrderId', 
				type: 'int',
				readonly: true, 
				label: [{ languageCode: LanguageCode.en, value: 'Bobgo Order ID' }] 
			}
		); return config;
	},
	compatibility: '^2.0.0',
})
export class BobgoPlugin implements OnApplicationBootstrap {

	constructor(
		private eventBus: EventBus,
		private bobgoService: BobgoService,
	) {}

	async onApplicationBootstrap() {
		this.eventBus
		.ofType(OrderStateTransitionEvent)
		.pipe(
			filter(event => event.toState === 'PaymentSettled'),
		)
		.subscribe(async (event) => {
			const ctx = event.ctx;
			const orderData = event.order;
			const orderId = event.order.id;

			console.log(
				'=*=*=*=*=*=*=*=*=* Order Event Data: *=*=*=*=*=*=*=*=*=*=*=*=*=*\n', 
				orderData, 
				'\n=*=*=*=*=*=*=*=*=* End - Order Event Data *=*=*=*=*=*=*=*=*=*=*=*=*=*'
			);

			// Stored Bobgo Order ID & Channel Order Number in the Order custom fields
			const storedBobgoID = (orderData.customFields as any).bobgoOrderId;
			const storedChannelOrderNumber = (orderData.customFields as any).channel_order_number;

			// check if bobgoOrderId & storedChannelOrderNumber exist, then...
			if(orderData.customFields && storedBobgoID && storedChannelOrderNumber) {
				/** UPDATE ORDER if it already exists in Bobgo */
				try {
					const updateResponse = await this.bobgoService.updateOrderInBobgo(ctx, storedBobgoID, orderId);
					console.log('// Order Update API response:', updateResponse, 
					'\n// End - Order Update API response | =========================');
				} catch (error) {
					console.error('Error making API update call:', error);
				}
			} else {
				/** CREATE ORDER if it does not exist in Bobgo */
				try {
					const createResponse = await this.bobgoService.createOrderInBobgo(ctx, orderId);
					console.log('// Order Create API response:', createResponse, 
					'\n// End - Order Create API response | =========================');
				} catch (error) {
					console.error('Error making API creation call:', error);
				}
			}
		});
	}

}