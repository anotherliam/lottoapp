import styled from "@emotion/native";
import React from "react";
import { images } from "./images";
import { LottoTypes } from "./network";

const StyledImage = styled.Image({
    width: 96,
    height: 96
});

interface Props {
    prodId: LottoTypes;
}

const LogoImage: React.FC<Props> = ({ prodId }) => <StyledImage source={images[prodId]} />;

export default LogoImage;