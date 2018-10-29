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