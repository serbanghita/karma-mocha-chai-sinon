let tracking = {
    trackEvent: (r) => { console.log("someCallback", r) }
};

function reloadApp() {
    return $.ajax('first/url').then((r1) => {
        tracking.trackEvent(r1);

        $.ajax('second/url').then((r2) => {
            tracking.trackEvent(r2);
            console.log('finally!');
            return r2;
        }, (err) => {
            console.log('err', err);
        });

        return r1;
    }, (err) => {
        console.log('err', err);
    });
}