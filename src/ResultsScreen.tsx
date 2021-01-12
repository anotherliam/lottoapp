import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "@emotion/native";
import { fetchResults, LottoResult } from "./network";
import LogoImage from "./LogoImage";
import ListItemContainer from "./ListItemContainer";

const NumberRow = styled.View({
    flexDirection: "row",
    flexWrap: "wrap"
});
const NumberWrapper = styled.View({
    margin: 4,
    padding: 4,
    backgroundColor: "white",
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#333"
})
const PrimaryNumber = styled.Text({
    color: "blue",
    fontSize: 14
});
const SecondaryNumber = styled.Text({
    color: "red",
    fontSize: 14
});

interface ResultItemProps {
    draw: LottoResult;
    refreshing: boolean;
}
const ResultItem: React.FC<ResultItemProps> = ({ draw, refreshing }) => {
    return (
        <ListItemContainer key={`${draw.DrawNumber}${draw.ProductId}`} refreshing={refreshing}>
            <View>
                <Text>{draw.DrawDate}</Text>
                <Text>{draw.DrawDisplayName}</Text>
                <Text>Draw {draw.DrawNumber}</Text>
                <Text>Numbers</Text>
                <NumberRow>
                    {draw.SecondaryNumbers.map((num) => <NumberWrapper key={num}><SecondaryNumber>{num}</SecondaryNumber></NumberWrapper>)}
                </NumberRow>
                <NumberRow>
                    {draw.PrimaryNumbers.map((num) => <NumberWrapper key={num}><PrimaryNumber>{num}</PrimaryNumber></NumberWrapper>)}
                </NumberRow>
            </View>
            <LogoImage prodId={draw.ProductId} />
        </ListItemContainer>
    );
};


const OpenDrawsScreeen: React.FC = () => {
    const [draws, setDraws] = useState<LottoResult[]>([]);
    const [status, setStatus] = useState<"loading" | "done" | "error">("done");

    const handleFetchData = () => {
        // Skip if currently fetching
        if (status === "loading") return;
        setStatus("loading");
        fetchResults()
            .then((draws) => {
                setStatus("done");
                setDraws(draws);
            })
            .catch((_) => {
                setStatus("error");
            })
    }
    // Fetch data on mount
    useEffect(handleFetchData, []);

    const refreshing = status === "loading";

    return (<>
        {status === "error" && (
            <Text>Failed to fetch data</Text>
        )}
        <FlatList refreshing={refreshing} onRefresh={handleFetchData} data={draws} renderItem={({ item }) => <ResultItem draw={item} refreshing={refreshing} />} keyExtractor={(item) => `${item.DrawNumber}${item.ProductId}`} />
    </>)
}

export default OpenDrawsScreeen;