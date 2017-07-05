import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import Fructose from "fructose-app";
import { loadStories } from './components';

AppRegistry.registerComponent("e2eTests", () => Fructose(loadStories));
