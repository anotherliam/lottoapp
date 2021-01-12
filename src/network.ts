/**
 * Configuration stuff for requests
 */
const DRAWS_URL = "https://data.api.thelott.com/sales/vmax/web/data/lotto/opendraws";
const RESULTS_URL = "https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults";
const LOTTO_COMPANY = "GoldenCasket";
const MAX_DRAWS = 20; // How many future draws to fetch
const MAX_RESULTS_PER_PRODUCT = 4; // How many results to fetch for each lotto
const LOTTOS = ["OzLotto", "Powerball", "TattsLotto", "MonWedLotto"] as const; // TattsLotto is Saturday Gold Lotto

export type LottoTypes = typeof LOTTOS[number];

// The data returned from the api
// Only typing the relevant data
export interface LottoDraw {
    ProductId: LottoTypes;
    DrawNumber: number;
    DrawDisplayName: string;
    DrawDate: string;
    DrawLogoUrl: string;
    Div1Amount: string;
}
export interface LottoDrawResponse {
    Draws: LottoDraw[];
    ErrorInfo: string | null;
    Success: boolean;
}
export interface LottoResult {
    ProductId: LottoTypes;
    DrawNumber: number;
    DrawDisplayName: string;
    DrawDate: string;
    PrimaryNumbers: number[];
    SecondaryNumbers: [];
}
export interface LottoResultResponse {
    DrawResults: LottoResult[];
    ErrorInfo: string | null;
    Success: boolean;
}

// toLocaleDateString and similar functions don't work properly on android react native
// Normally I would use some kind of date library, but I didnt want to include one for such little code
export const dateToString = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


// Parse the dates then sort
const parseAndSortResult = <T extends { DrawDate: string }>(items: T[]): T[] => {
    return items
        .map((draw) => ({ ...draw, DrawDate: new Date(draw.DrawDate) }))
        .sort((drawA, drawB) => drawA.DrawDate.getTime() - drawB.DrawDate.getTime())
        .map((draw) => ({ ...draw, DrawDate: dateToString(draw.DrawDate) }));
};

/**
 * Actual network requests:
 */


/**
 * Returns a promise to an array of future draws, sorted by date.
 */
export const fetchDraws = async (): Promise<LottoDraw[]> => {
    try {
        const res = await fetch(DRAWS_URL, {
            method: "post",
            body: JSON.stringify({
                CompanyId: LOTTO_COMPANY,
                MaxDrawCount: MAX_DRAWS,
                OptionalProductFilter: LOTTOS
            })
        });
        const json: LottoDrawResponse = await res.json();
        if (json.Success) {
            const draws = parseAndSortResult(json.Draws);
            return draws;
        } else {
            throw Error(`Error in result: ${json.ErrorInfo}`);
        }
    } catch (error) {
        console.error("Failed to fetch data, ", error);
        throw error;
    }
};

/**
 * Returns a promise to an array of previous draws, sorted by date.
 */
export const fetchResults = async (): Promise<LottoResult[]> => {
    try {
        const res = await fetch(RESULTS_URL, {
            method: "post",
            body: JSON.stringify({
                CompanyId: LOTTO_COMPANY,
                MaxDrawCountPerProduct: MAX_RESULTS_PER_PRODUCT,
                OptionalProductFilter: LOTTOS
            })
        });
        const json: LottoResultResponse = await res.json();
        if (json.Success) {
            const draws = parseAndSortResult(json.DrawResults);
            return draws;
        } else {
            throw Error(`Error in result: ${json.ErrorInfo}`);
        }
    } catch (error) {
        console.error("Failed to fetch data, ", error);
        throw error;
    }

}
