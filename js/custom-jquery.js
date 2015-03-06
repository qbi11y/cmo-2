$(document).ready(function() {
    console.log(' jquery running');

    /*
    $("[data-toggle=popover]").popover({
        html : true,
        content: function() {
          var content = $(this).attr("data-popover-content");
          return $(content).children(".popover-body").html();
        },
        title: function() {
          var title = $(this).attr("data-popover-content");
          return $(title).children(".popover-heading").html();
        }
    });
    */


    
    $('body').popover({
        selector: '[data-toggle="popover"]',
        container: 'body',
        html: true,
        content: function() {
          var content = $(this).attr("data-popover-content");
          return $(content).children(".popover-body").html();
        }
    });

    $('body').tooltip({
        selector: 'a[rel="tooltip"], [data-toggle="tooltip"]'
    });

    function closePopOver() {
        console.log('close popup');
    }


    //$('[data-toggle="popover"]').popover()

    /*
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
    */

})