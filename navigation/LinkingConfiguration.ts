import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Dices: "dices",
          Calculator: "calculator",
          Characters: "characters",
          History: "history",
        },
      },
      NotFound: "*",
    },
  },
};
