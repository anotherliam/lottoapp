// Locally require images

import { ImageRequireSource } from "react-native";
import { LottoTypes } from "../network";

// The image url returned by the api does not seem to be valid (its a 301 Permanently Moved)
// So instead ive just downloaded some pngs
export const images: Record<LottoTypes, ImageRequireSource> = {
    OzLotto: require("./OzLotto.png"),
    Powerball: require("./Powerball.png"),
    TattsLotto: require("./SatLotto.png"),
    MonWedLotto: require("./MonWedLotto.png")
};