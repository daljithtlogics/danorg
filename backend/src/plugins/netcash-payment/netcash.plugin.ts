import { 
	PluginCommonModule, 
	VendurePlugin,
} from '@vendure/core';

import { NetcashPaymentService } from './service/netcash.service';
import { NetcashController } from './controller/netcash.controller';
import { netcashPaymentHandler } from './netcash-payment.handler';

@VendurePlugin({
	imports: [PluginCommonModule],
	providers:[NetcashPaymentService],
	controllers: [NetcashController],
	configuration: config => {
		config.paymentOptions.paymentMethodHandlers.push(netcashPaymentHandler);
		return config;
	},
	compatibility: '^2.0.0',
})
export class NetcashPlugin {}