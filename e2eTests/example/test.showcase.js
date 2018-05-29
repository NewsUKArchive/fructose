/* globals device test expect element by afterEach beforeEach */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  green: {
    backgroundColor: "green",
    height: "100%",
    width: "100%"
  },
  aqua: {
    backgroundColor: "aqua",
    height: "100%",
    width: "100%"
  },
  blue: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%"
  },
  black: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    color: "white",
    fontSize: 100
  },
  orange: {
    backgroundColor: "orange",
    height: "100%",
    width: "100%"
  },
  purple: {
    backgroundColor: "purple",
    height: "100%",
    width: "100%"
  },
  yellow: {
    backgroundColor: "yellow",
    height: "100%",
    width: "100%",
    fontSize: 50,
    fontWeight: "bold"
  }
});

const Break = props => {
  this.break();
  return (
    <View style={styles.red}>
      <Text>ERROR</Text>
    </View>
  );
};

export default {
  name: "MoreExampleTests",
  children: [
    {
      type: "story",
      name: "The Stonejadsnjdanjnjkasdvasvfasd end",
      component: () => (
        <Text style={styles.green}> The Philosopher&apos;s Stone</Text>
      )
    },
    {
      type: "story",
      name: "The Chamberv asdv asd vas dva sd end",
      component: () => <Text style={styles.aqua}> The Chamber of Secrets</Text>
    },
    {
      type: "story",
      name: "The Prisoneajksdvjknasdjasjnkvsadv r end",
      component: () => <Text style={styles.blue}> The Prisoner of Azkaban</Text>
    },
    {
      type: "story",
      name: "The Gokoookds sak ookvsblet end",
      component: () => <Text style={styles.black}>The Goblet of Fire</Text>
    },
    {
      type: "story",
      name: "The Order!!!!!!!sjhdbsjkdcs end",
      component: () => (
        <Text style={styles.orange}> The Order of the Phoenix</Text>
      )
    },
    {
      type: "story",
      name: "The Prince and the pea ofd kjnsdjkn fd end",
      component: () => <Text style={styles.purple}> The Half Blood Prince</Text>
    },
    {
      type: "story",
      name: "The Hallowsjkdjdjdjdjjddjdjddjdjd end",
      component: () => <Text style={styles.yellow}>The Deathly Hallows</Text>
    },
    {
      type: "story",
      name: "The Internal JS Errors aifoinrfnar vafvavavav end",
      component: () => <Break />
    },
    {
      type: "story",
      name: "The Handle undefined Knob showcasejdjdjdjdjdjdjdjdj  end",
      component: ({ undefinedKnob }) => <Text>{undefinedKnob()}</Text>
    },
    {
      type: "story",
      name: "The Handle knob showcasepopopopopopopopopo end",
      component: ({ e2eTestDontDelete }) => <View>{e2eTestDontDelete()}</View>
    }
  ]
};
