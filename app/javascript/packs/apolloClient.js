import ApolloClient from "apollo-boost";

let loaderCount = 0;

const apolloClient = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      }
    });
  },
  clientState: {
    defaults: {
      theme: process.env.DEFAULT_THEME || 'dark',
      pageTitle: null
    },
    resolvers: {
      Mutation: {
        setTheme: (_, { theme }, { cache }) => {
          cache.writeData({ data: { theme }});
          return null;
        },
        setPageTitle: (_, { pageTitle }, { cache }) => {
          cache.writeData({ data: { pageTitle }});
          return null;
        },
      }
    }
  },
  fetch: (input, init) => {
    // this whole function is pretty ugly

    const globalProgress = document.getElementById("globalProgress");

    loaderCount++;
    if (globalProgress) {
      globalProgress.style.display = 'block';
    }
    return (
      fetch(input, init)
        .then((response) => {
          loaderCount--;

          if (globalProgress && loaderCount === 0) {
            globalProgress.style.display = 'none';
          }
          return (response);
        })
    );
  }
});

export default apolloClient;
