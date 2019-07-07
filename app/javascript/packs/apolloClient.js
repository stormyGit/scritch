import ApolloClient from "apollo-boost";

import Cookies from "universal-cookie";

const cookies = new Cookies();

let loaderCount = 0;
const apolloClient = new ApolloClient({
  uri: "/graphql",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: `Scritcher ${cookies.get("csrf-token")}`,
        "X-CSRF-Token": cookies.get("csrf-token")
      },
      credentials: "same-origin"
    });
  },
  clientState: {
    defaults: {
      theme: process.env.DEFAULT_THEME || "dark",
      pageTitle: null
    },
    resolvers: {
      Mutation: {
        setTheme: (_, { theme }, { cache }) => {
          cache.writeData({ data: { theme } });
          return null;
        },
        setPageTitle: (_, { pageTitle }, { cache }) => {
          cache.writeData({ data: { pageTitle } });
          return null;
        }
      }
    }
  },
  fetch: (input, init) => {
    // this whole function is pretty ugly

    const globalProgresses = document.querySelectorAll(".globalProgress");
    loaderCount++;
    Array.from(globalProgresses).forEach(globalProgress => {
      globalProgress.style.display = "block";
    });

    const handleResponse = response => {
      loaderCount--;

      if (loaderCount === 0) {
        Array.from(globalProgresses).forEach(globalProgress => {
          globalProgress.style.display = "none";
        });
      }
      return response;
    };

    return fetch(input, init)
      .then(handleResponse)
      .catch(handleResponse);
  }
});

export default apolloClient;
