

var counties = ["Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow"]


$("#jobLocation").typeahead({ source:counties});





$( "#homepageForm" ).submit(function( event ) {
  // console.log(this);
  event.preventDefault();

  //get job keyword
  var keyword = $(this).find("[name=keyword]").val()
  console.log(keyword)

  //get location
  var keyword = $(this).find("[name=location]").val();
  console.log(keyword)
});