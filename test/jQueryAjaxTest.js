describe('jQuery Ajax Mock', function () {

    let server;
    let spy;

    beforeEach(() => {
        console.log(sinon.fakeServer.create);
        server = sinon.createFakeServer({respondImmediately: true});
        spy = sinon.spy(tracking, "trackEvent");
    });

    afterEach(() => {
        server.restore();
        spy.restore();
    });

    it('some bogus test', function () {
        expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });

    // it('ajax mocking works #1', (done) => {
    //
    //     server.respondWith("GET", 'first/url', [ 200, { "Content-Type": "text/html" }, `mocked1` ]);
    //     server.respondWith("GET", 'second/url', [ 200, { "Content-Type": "text/html" }, `mocked2` ]);
    //
    //     reloadApp().then((r1) => {
    //         expect(r1).to.equal(`mocked1`);
    //         expect(spy.callCount).to.equal(2);
    //         done();
    //     });
    //
    //     // server.respond();
    //
    // });

    it('ajax mocking works #2', (done) => {

        server.respondWith("GET", 'first/url', [ 200, { "Content-Type": "text/html" }, `mocked1` ]);
        server.respondWith("GET", 'second/url', [ 200, { "Content-Type": "text/html" }, `mocked2` ]);

        console.log("queue", server.queue.length, server.requests.length, server.responses.length);

        reloadApp().then((r1) => {
            console.log("queue", server.queue.length,  server.requests.length, server.responses.length);
            // waitFrames(1, () => {
            //     console.log("queue", server.queue.length,  server.requests.length, server.responses.length);
            //     // expect(r1).to.equal(`mocked1`);
            //     expect(spy.callCount).to.equal(2);
            //     done();
            // });
            waitForServerToFulfillRequests(server).then(() => {
                expect(spy.callCount).to.equal(2);
                done();
            });
        });

        // server.respond();

    });

});

// describe('jQuery Ajax Live', () => {
//
//     it('ajax is not mocked anymore', () => {
//
//         reloadApp(); // Show throw Network Errors in console
//
//     });
//
// });