import React, {useContext, useState} from "react";
import {withRouter} from "react-router-dom";
import {NavigationContext} from "../../context/NavigationContext";
import {setRequestDialogChange} from "../../reducers/Action";

export const DIALOG_OPEN_STRING = "dialogOpen"

export const HistoryWrapper = withRouter(({history, children}) => {
  const {isDialogOpen, dispatchNavigationChange} = useContext(NavigationContext);
  const [requestDialogChangeState, setRequestDialogChangeState] = useState(false);

  React.useEffect(() => {
      let lastSearch = "";
      history.listen((newLocation, action) => {
        console.log(newLocation, action);
        if (action === "PUSH") {
        } else {
          if (lastSearch.includes(DIALOG_OPEN_STRING) && !newLocation.search.includes(DIALOG_OPEN_STRING)) {
            setRequestDialogChangeState(true);
          } else {
          }
        }
        lastSearch = newLocation.search;
      });
    }, []
  )

  if (requestDialogChangeState && isDialogOpen) {
    dispatchNavigationChange(setRequestDialogChange(true));
    setRequestDialogChangeState(false);
  } else if (requestDialogChangeState && !isDialogOpen) {
    setRequestDialogChangeState(false);
  }

  React.useEffect(() => {
      if (isDialogOpen) {
        if (!history.location.search.includes(DIALOG_OPEN_STRING)) {
          history.push("?" + DIALOG_OPEN_STRING, "HistoryListener");
        }
      } else {
        if (history.location.search.includes(DIALOG_OPEN_STRING)) {
          history.goBack();
        }
      }
    }, [isDialogOpen]
  );

  return children;
});