class HistoryListener {
  initialize = (history) => {
    if (this.listener === undefined) {
      let lastSearch = ""
      this.listener = history.listen((newLocation, action) => {
        console.log(newLocation, action);
        if (action === "PUSH") {
        } else {
          if (lastSearch === "?dialogOpen" && newLocation.search !== "?dialogOpen") {
            this.dispatchChange = true;
          }
        }
        lastSearch = newLocation.search;
      })
    }
  }

  dispatchChange = false;
  listener = undefined;

  stayCondition() {
  }
}

export const _HistoryListener = new HistoryListener();