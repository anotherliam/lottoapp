import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { fetchDraws, LottoDraw } from "./network";
import ListItemContainer from "./ListItemContainer";
import LogoImage from "./LogoImage";

interface DrawItemProps {
    draw: LottoDraw;
    refreshing: boolean;
}
const DrawItem: React.FC<DrawItemProps> = ({ draw, refreshing }) => {
    return (<ListItemContainer key={`${draw.DrawNumber}${draw.ProductId}`} refreshing={refreshing}>
        <View>
            <Text>{draw.DrawDate}</Text>
            <Text>{draw.DrawDisplayName}</Text>
            <Text>Draw {draw.DrawNumber}</Text>
            <Text>Jackpot ${draw.Div1Amount}</Text>
        </View>
        <LogoImage prodId={draw.ProductId} />
    </ListItemContainer>);
};

const OpenDrawsScreeen: React.FC = () => {
    const [draws, setDraws] = useState<LottoDraw[]>([]);
    const [status, setStatus] = useState<"loading" | "done" | "error">("done");

    const handleFetchData = () => {
        // Skip if currently fetching
        if (status === "loading") return;
        setStatus("loading");
        fetchDraws()
            .then((draws) => {
                setStatus("done");
                setDraws(draws);
            })
            .catch((_) => {
                setStatus("error");
            });
    };
    // Fetch data on mount
    useEffect(handleFetchData, []);

    const refreshing = status === "loading";

    return (<>
        {status === "error" && (
            <Text>Failed to fetch data</Text>
        )}
        <FlatList
            refreshing={refreshing}
            onRefresh={handleFetchData}
            data={draws}
            renderItem={({ item }) => <DrawItem draw={item} refreshing={refreshing} />}
            keyExtractor={(item) => `${item.DrawNumber}${item.ProductId}`} />
    </>);
}

export default OpenDrawsScreeen;