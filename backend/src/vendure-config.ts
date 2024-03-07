import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import 'dotenv/config';
import path from 'path'; 
import { BobgoPlugin } from './plugins/bobgo-shipping/bobgo.plugin';
import { netcashPaymentHandler } from './plugins/netcash-payment/netcash-payment.handler';
import { NetcashPlugin } from './plugins/netcash-payment/netcash.plugin';

const IS_DEV = process.env.APP_ENV === 'dev';

export const config: VendureConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            adminApiDebug: true,
            shopApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
		requireVerification: false,
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: 'mariadb',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: false,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    paymentOptions: {
        paymentMethodHandlers: [
			netcashPaymentHandler, 
			dummyPaymentHandler // default dummy payment handler
		],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {},
    plugins: [
	    BobgoPlugin,  // shipping plugin
		NetcashPlugin, // netcash payment plugin
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets',
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"Danshop" <noreply@dansa.org>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://157.245.36.128:5200/danshop/account/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: 3002,
			app: compileUiExtensions({
			outputPath: path.join(__dirname, '../admin-ui'),
			extensions: [
			{
			id: 'memberships',
			extensionPath: path.join(__dirname, 'plugins/memberships/ui'),
			routes: [{ route: 'memberships', filePath: 'routes.ts' }],
			providers: ['providers.ts'],
			},
			{
			id: 'student',
			extensionPath: path.join(__dirname, 'plugins/memberships/ui'),
			routes: [{ route: 'memberships/student', filePath: 'routes.ts' }],
			providers: ['providers.ts'],
			},
			{
			id: 'temporary',
			extensionPath: path.join(__dirname, 'plugins/memberships/ui'),
			routes: [{ route: 'memberships/temporary', filePath: 'routes.ts' }],
			providers: ['providers.ts'],
			},
			{
			id: 'annual',
			extensionPath: path.join(__dirname, 'plugins/memberships/ui'),
			routes: [{ route: 'memberships/annual', filePath: 'routes.ts' }],
			providers: ['providers.ts'],
			},
			{
			id: 'commercial',
			extensionPath: path.join(__dirname, 'plugins/memberships/ui'),
			routes: [{ route: 'memberships/commercial', filePath: 'routes.ts' }],
			providers: ['providers.ts'],
			},
			{
			id: 'partner',
			extensionPath: path.join(__dirname, 'plugins/memberships/ui'),
			routes: [{ route: 'memberships/partner', filePath: 'routes.ts' }],
			providers: ['providers.ts'],
			},
			{
			id: 'contacts',
			extensionPath: path.join(__dirname, 'plugins/contacts/ui'),
			routes: [{ route: 'contacts', filePath: 'routes.ts' }],
			providers: ['providers.ts'],   		           
			},    
			{
				id: 'orgquery',	      				
				extensionPath: path.join(__dirname, 'plugins/contacts/ui'),
				routes: [{ route: 'contacts/orgquery', filePath: 'routes.ts' }],      
				providers: ['providers.ts'],       	
			},  			
			{
				id: 'shopquery',	      				
				extensionPath: path.join(__dirname, 'plugins/contacts/ui'),
				routes: [{ route: 'contacts/shopquery', filePath: 'routes.ts' }],      
				providers: ['providers.ts'],              	
			},
			],
			}),
        }),
    ],
};
