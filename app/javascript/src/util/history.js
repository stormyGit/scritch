const DIALOG_OPEN_STRING = "dialogOpen"

class HistoryListener {
  initialize = (history) => {
    this.history = history;
    if (this.listener === undefined) {
      this.lastSearch = ""
      this.listener = history.listen((newLocation, action) => {
        console.log(newLocation, action);
        this.dispatchChange = false;
        if (action !== "PUSH") {
          if (this.lastSearch.includes(DIALOG_OPEN_STRING) && !newLocation.search.includes(DIALOG_OPEN_STRING)) {
            this.dispatchChange = true;
          }
        }
        this.lastSearch = newLocation.search;
      })
    }
  }

  lastSearch = "";
  dispatchChange = false;
  listener = undefined;

  stayCondition() {
  }

  dialogOpened() {
    if (!this.history.location.search.includes(DIALOG_OPEN_STRING))
      this.history.push("?" + DIALOG_OPEN_STRING, "HistoryListener");
  }

  dialogClosed() {
    // this.dispatchChange = false;
    // this.lastSearch = "";
  }
}

export const _HistoryListener = new HistoryListener();