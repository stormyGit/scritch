import React, { Component } from "react";
import { Link } from "react-router-dom";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <a href={"/charges/new"}>Send</a>
      </div>
    );
  }
}

export default CheckoutForm;
