var affiliate_interval = setInterval(function(){
    try {
        document.querySelector('div.AffiliateBadgeUi-wzepun-0').remove();
        console.log("removed");
        clearInterval(affiliate_interval);
    } catch(e) {
        console.log("not removed");
    }
}, 10);
