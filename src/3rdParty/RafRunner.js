class RafRunner {
    constructor(maxTicks, callback) {
        this.tick = 0;
        this.maxTicks = maxTicks;
        this.callback = callback;
    }

    loop() {
        console.log(`RafRunner ${this.tick}`);

        if (this.tick === this.maxTicks) {
            this.callback.call(this);
            return;
        }

        this.tick++;

        requestAnimationFrame(() => {
            this.loop();
        });
    }
}

function waitFrames(frames, callback) {
    const runner = new RafRunner(frames, callback);
    runner.loop();
}


function waitForServerToFulfillRequests(server, timeout) {
    timeout = timeout || 100;
    return new Promise((resolve, reject) => {
        let checkCount = 0;
        const i = setInterval(() => {
            if (server.requests.length === server.responses.length) {
                clearInterval(i);
                resolve();
            }
            if (checkCount === 100) {
                clearInterval(i);
                reject(`Maximum waiting count of ${checkCount * 16} has passed.`);
            }
            checkCount++;
        }, 16);
    });
}