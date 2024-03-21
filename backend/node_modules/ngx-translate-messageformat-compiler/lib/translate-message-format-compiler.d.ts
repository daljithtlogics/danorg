import { TranslateCompiler } from "@ngx-translate/core";
import { MessageFormatConfig } from "./message-format-config";
import * as i0 from "@angular/core";
/**
 * This compiler expects ICU syntax and compiles the expressions with messageformat.js
 */
export declare class TranslateMessageFormatCompiler extends TranslateCompiler {
    private mfCache;
    private config;
    constructor(config?: MessageFormatConfig);
    compile(value: string, lang: string): (params: any) => string;
    compileTranslations(translations: any, lang: string): any;
    private getMessageFormatInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslateMessageFormatCompiler, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslateMessageFormatCompiler>;
}
