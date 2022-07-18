interface Route {
  url: string;
  component: () => Promise<HTMLElement>;
}

export const createRouting = ({ routes, target }) => {

  const showLoadingIndicator = () => {
    console.log('loadingIndicator.show()');
  };
  const hideLoadingIndicator = () => {
    console.log('loadingIndicator.hide()');
  };
};
