import "react-native";
import React from "react";
import ListItemContainer from "../src/ListItemContainer";

import renderer from "react-test-renderer";


// Snapshot tests

it("renders and matches snapshot", () => {
    const tree = renderer.create(<ListItemContainer refreshing={false} />).toJSON();
    expect(tree).toMatchSnapshot();
})

it("renders and matches snapshot when refreshing", () => {
    const tree = renderer.create(<ListItemContainer refreshing />).toJSON();
    expect(tree).toMatchSnapshot();
})