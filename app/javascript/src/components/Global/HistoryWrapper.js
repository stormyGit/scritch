import React, {useContext, useState} from "react";
import {withRouter} from "react-router-dom";
import {NavigationContext} from "../../context/NavigationContext";
import {setDialogChange} from "../../reducers/Action";

export const DIALOG_OPEN_STRING = "dialogOpen"

export const HistoryWrapper = withRouter(({history, children}) => {
  // _HistoryListener.initialize(history);
  const {isDialogOpen, dispatchNavigationChange} = useContext(NavigationContext);
  const [listener, setListener] = useState(undefined);

  React.useEffect(() => {
      let lastSearch = "";
      history.listen((newLocation, action) => {
        console.log(newLocation, action);
        if (action !== "PUSH") {
          if (lastSearch.includes(DIALOG_OPEN_STRING) && !newLocation.search.includes(DIALOG_OPEN_STRING)) {
            dispatchNavigationChange(setDialogChange(true));
          // } else if (!lastSearch.includes(DIALOG_OPEN_STRING) && newLocation.search.includes(DIALOG_OPEN_STRING)) {
          }
        } else {
          dispatchNavigationChange(setDialogChange(false));
        }
        lastSearch = newLocation.search;
      });
      // console.log("HistoryWrapper.useEffect: "+listen);
      // setListener(listen);
    }, []
  )


  return children;
});