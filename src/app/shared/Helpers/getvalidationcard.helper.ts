import { CardBrandEnum } from './cardmodels';

const digitMask = (numDigits: number) => Array(numDigits).fill(/\d/);
const cards: any[] = [];
export const getValidationConfigFromCardNo = (rawValue: string): CardValidation =>
    cards.find((card: { patterns: any[]; }) => {
        const patterns = card.patterns.map(
            (pattern: any) => new RegExp(`^${pattern}`, 'g')
        );
        const matchResult = patterns
            .map((pattern: { [Symbol.match](string: string): RegExpMatchArray | null; }) => rawValue.match(pattern))
            .filter((result: any) => result);

        return !!matchResult.length;
    }) || null;

const defaultFormat = /(\d{1,4})/g;

export interface CardValidation {
    type: CardBrandEnum;
    patterns: number[];
    mask: any;
    format: RegExp;
    length: number[];
    cvvLength: number[];
    luhn: boolean;
}