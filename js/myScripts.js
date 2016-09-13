

var counties = ["Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", "Dublin", "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow"]


$("#jobLocation").typeahead({ source:counties});





$( "#searchForm" ).submit(function( event ) {
  // console.log(this);
  event.preventDefault();

  //get job keyword
  var keyword = $(this).find("[name=keyword]").val()
  console.log(keyword)

  //get location
  var location = $(this).find("[name=location]").val().toLowerCase();
  // console.log(keyword)

  //build url
  var newUrl = "/search.html?q="+keyword+"&reg="+location

  // console.log('redirect to:',newUrl)
  window.location.assign(newUrl)
});

var loadSearchPage = function(){
  console.log('loading search page');
  var params = getParams();
  getIrishJobs(params)
}

var getParams = function(){
  //get query and location params from url
  var keyword = location.search.split('&')[0]
  keyword = keyword.slice(3, keyword.len);
  console.log('keyword is:', keyword)

  var region = location.search.split('&')[1]
  region = region.slice(4, region.len);
  console.log('region is:', region)
  var params = {
    keyword: keyword,
    region: region
  }

  $('#searchForm ').find("[name=location]").val(params.region)
  $('#searchForm ').find("[name=keyword]").val(params.keyword)

  return params
}

var getIrishJobs = function(params) {
  var source   = $("#job-template").html();
  var template = Handlebars.compile(source);

  $.get( "http://localhost:8080/scrapeirishjobs?q="+params.keyword+"&reg="+params.region, function( data ) {
    // console.log('getIrishJobs ran:', data);
    $(data).each(function(index){
      // console.log(this)

      this.siteLogo = "img/irishjobs.png"

      var html = template(this);

      $('#results').append(html)
    })
  });
}


