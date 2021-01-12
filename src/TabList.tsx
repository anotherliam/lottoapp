import styled from "@emotion/native";
import React from "react";
import { TouchableOpacity } from "react-native";

const TabContainer = styled.View({
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
});

const TabsRow = styled.View({
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
});

interface TabProps {
    selected: boolean;
}
const TabText = styled.Text(({ selected }: TabProps) => ({
    color: selected ? "blue" : "darkgray",
    paddingVertical: 12,
    fontSize: 16
}));

const TabItem = styled.TouchableOpacity(({ selected }: TabProps) => ({
    alignItems: "center",
    flex: 1,
    borderBottomColor: selected ? "blue" : "transparent",
    borderBottomWidth: 2
}));

export interface Tab {
    title: string;
    key: number;
}

interface Props {
    tabs: Tab[];
    current: number;
    onTabChange: (tab: Tab) => void;
}

const TabList: React.FC<Props> = ({ tabs, current, onTabChange }) => {
    return (
        <TabContainer>
            <TabsRow>
                {tabs.map((tab) => {
                    const selected = tab.key === current;
                    return (
                        <TabItem key={tab.key} onPress={() => onTabChange(tab)} selected={selected}>
                                <TabText selected={selected}>{tab.title}</TabText>
                        </TabItem>
                    );
                })}
            </TabsRow>
        </TabContainer>
    );
};

export default TabList;