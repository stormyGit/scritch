class HistoryListener {
  initialize = (history) => {
    if (this.listener === undefined) {
      this.listener = history.listen((newLocation, action) => {
        console.log(newLocation, action);
        if (action === "PUSH") {
          if (
            newLocation.pathname !== this.currentPathname ||
            newLocation.search !== this.currentSearch
          ) {
            this.currentPathname = newLocation.pathname;
            this.currentSearch = newLocation.search;
            history.push({
              pathname: newLocation.pathname,
              search: newLocation.search
            });
          }
        } else {
          if (this.stayCondition()) {
            history.goForward();
            console.log("forward");
            this.dispatchChange = true;
          } else {
            // history.goBack();
            console.log("backward");
          }
        }
      })
    }
  }

  dispatchChange = false;
  listener = undefined;
  currentPathname = undefined;
  currentSearch = undefined;

  stayCondition() {
  }
}

export const _HistoryListener = new HistoryListener();