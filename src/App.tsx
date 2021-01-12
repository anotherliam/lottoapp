/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
} from "react-native";

import OpenDrawsScreeen from "./OpenDrawsScreen";
import ResultsScreen from "./ResultsScreen"
import TabList, { Tab } from "./TabList";
import UserBar from "./UserBar";



declare const global: { HermesInternal: null | {} };

const TABS = [
  {
    key: 0,
    title: "Open Draws"
  },
  {
    key: 1,
    title: "Results"
  }
];

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (tab: Tab) => setSelectedTab(tab.key);

  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <UserBar />
        <TabList tabs={TABS} current={selectedTab} onTabChange={handleChangeTab} />
        {selectedTab === 0 && (
          <OpenDrawsScreeen />
        )}
        {selectedTab === 1 && (
          <ResultsScreen />
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
