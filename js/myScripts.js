

var herokuUrl = "https://jobster-backend.herokuapp.com/";
var localUrl = "http://localhost:8080/";
var host;



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

var jobTemplate, noJobsTemplate

var loadSearchPage = function(){

  if(location.hostname === "localhost"){
    //we're in dev mode
    host = localUrl
  } else {
    //we're in production
    host = herokuUrl
  }

  // console.log('loading search page');
  var params = getParams();
  getIrishJobs(params);
  getJobsIe(params);
  getMonsterJobs(params);
  getLinkedinJobs(params);
  jobTemplate = Handlebars.compile($("#job-template").html());
  noJobsTemplate = Handlebars.compile($("#no-jobs-template").html());
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
  $('#searchForm ').find("[name=keyword]").val(decodeURIComponent(params.keyword))

  return params
}


var getIrishJobs = function(params) {

  $.get( host+"scrapeirishjobs?q="+params.keyword+"&reg="+params.region, function( data ) {
    // console.log('getIrishJobs ran:', data);
    if(data === "no jobs found"){

      var noResults = {
        "siteLogo":"img/irishjobs.png",
        "message": "No irishJobs jobs found matching your search"
      }


      var html = noJobsTemplate(noResults);

      $('#results').append(html);

      $('#irishJobsLoading').siblings(".no-jobs").css("display", "initial")


    } else {
        $(data).each(function(index){
        // console.log(this)

        this.siteLogo = "img/irishJobs.png"

        var html = jobTemplate(this);

        $('#results').append(html)
       
        $('#irishJobsLoading').siblings(".loadingDone").css("display", "initial")
      })
    }

     $('#irishJobsLoading').hide();
  });
}

var getJobsIe = function(params) {

  $.get( host+"scrapejobsie?q="+params.keyword+"&reg="+params.region, function( data ) {
    // console.log('getIrishJobs ran:', data);
    if(data === "no jobs found"){

      var noResults = {
        "siteLogo":"img/jobs.png",
        "message": "No jobs jobs found matching your search"
      }


      var html = noJobsTemplate(noResults);

      $('#results').append(html);

      $('#jobsLoading').siblings(".no-jobs").css("display", "initial")


    } else {
        $(data).each(function(index){
        // console.log(this)

        this.siteLogo = "img/jobs.png"

        var html = jobTemplate(this);

        $('#results').append(html)
       
        $('#jobsLoading').siblings(".loadingDone").css("display", "initial")
      })
    }

     $('#jobsLoading').hide();
  });
}

var getMonsterJobs = function(params) {

  $.get( host+"scrapemonster?q="+params.keyword+"&reg="+params.region, function( data ) {
    // console.log('getIrishJobs ran:', data);
    if(data === "no jobs found"){

      var noResults = {
        "siteLogo":"img/monster.png",
        "message": "No monster jobs found matching your search"
      }


      var html = noJobsTemplate(noResults);

      $('#results').append(html);

      $('#monsterLoading').siblings(".no-jobs").css("display", "initial")


    } else {
        $(data).each(function(index){
        // console.log(this)

        this.siteLogo = "img/monster.png"

        var html = jobTemplate(this);

        $('#results').append(html)
       
        $('#monsterLoading').siblings(".loadingDone").css("display", "initial")
      })
    }

     $('#monsterLoading').hide();
  });
}

var getLinkedinJobs = function(params) {

  $.get( host+"scrapelinkedin?q="+params.keyword+"&reg="+params.region, function( data ) {
    // console.log('getIrishJobs ran:', data);

    if(data === "no jobs found"){

      var noResults = {
        "siteLogo":"img/linkedin.png",
        "message": "No Linkedin jobs found matching your search"
      }


      var html = noJobsTemplate(noResults);

      $('#results').append(html);

      $('#linkedinLoading').siblings(".no-jobs").css("display", "initial")


    } else {
      $(data).each(function(index){
      // console.log(this)

      this.siteLogo = "img/linkedin.png"

      var html = jobTemplate(this);

      $('#results').append(html)
     
      $('#linkedinLoading').siblings(".loadingDone").css("display", "initial")
    })
    }

     $('#linkedinLoading').hide();
    
  });
}


  


var fetchJob = function(link){
  // console.log('user wants: ', link);

  //clear any previous job
  $('.modal-body .description').text('');

  $('#peakModalLoader').show();


  $.get(host+"fetchjob?url="+String(link), function( data ) {

    // console.log(data);
    $('#peakModalLoader').hide();
    var html = $.parseHTML(data.description)
    $('.modal-body .description').html(html);
    $('#modal-apply-link').attr('href', link);
  });
}
