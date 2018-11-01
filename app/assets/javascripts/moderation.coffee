#= require Chart.bundle
#= require chartkick
#= require rails-ujs
#= require jquery

$(window).load ->
  $("[data-activator]").click ->
    $($(this).attr('href')).addClass('is-active')

  $("[data-activatable]").each ->
    $(this).find(".close-button").click =>
      $(this).removeClass('is-active')
