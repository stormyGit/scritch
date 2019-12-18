// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

console.log(123);
var stripe = Stripe("pk_test_sLMNzzOK6N8WwKRKf3IWbz2J");

var checkoutButtonMonth = document.querySelector("#checkout-button-month");
checkoutButtonMonth.addEventListener("click", function() {
  alert(123);
  stripe.redirectToCheckout({
    items: [
      {
        plan: "monthly",
        quantity: 1
      }
    ],
    successUrl: "https://google.com",
    cancelUrl: "https://bing.com"
  });
});
