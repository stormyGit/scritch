const DIALOG_OPEN_STRING = "dialogOpen"

class HistoryListener {
  initialize = (history) => {
    this.history = history;
    if (this.listener === undefined) {
      let lastSearch = ""
      this.listener = history.listen((newLocation, action) => {
        console.log(newLocation, action);
        if (action !== "PUSH") {
          if (lastSearch.includes(DIALOG_OPEN_STRING) && !newLocation.search.includes(DIALOG_OPEN_STRING)) {
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

  dialogOpened() {
    this.history.push("?" + DIALOG_OPEN_STRING, "HistoryListener");
  }

  dialogClosed() {
    // lastSearch = "";
  }
}

export const _HistoryListener = new HistoryListener();