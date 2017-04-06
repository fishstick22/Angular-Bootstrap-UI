//http://stackoverflow.com/questions/32109683/jquery-set-height-of-a-div-to-the-dynamic-height-of-another
$(document).ready(function() {
// doesn't really work because ng-includes don't factor into the height reported 
	console.log('document ready jquery...');
	//alert('document ready jquery...');
    var divHeightLeftSidenav = $('#sidenav-left').height();
    var divHeightRightSidenav = $('#sidenav-right').height();
    console.log('.... left ' +divHeightLeftSidenav);
    console.log('.... right ' +divHeightRightSidenav);
    
    if(divHeightRightSidenav > divHeightLeftSidenav){
    	console.log('adjusting left sidenav height' +divHeightRightSidenav);
    	$('#sidenav-left').css('min-height', divHeightRightSidenav+'px');    	
    }
    if(divHeightLeftSidenav > divHeightRightSidenav){
    	console.log('adjusting right sidenav height' +divHeightLeftSidenav);
        $('#sidenav-right').css('min-height', divHeightLeftSidenav+'px');    	
    }
}); 

