import { TranslateMessageFormatCompiler } from "./translate-message-format-compiler";
import * as i0 from "@angular/core";
export declare class TranslateMessageFormatDebugCompiler extends TranslateMessageFormatCompiler {
    compile(value: string, lang: string): (params: any) => string;
    compileTranslations(value: any, lang: string): any;
    private wrap;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslateMessageFormatDebugCompiler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslateMessageFormatDebugCompiler>;
}
