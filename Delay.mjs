

/**
 * Asynchronous delay that can be canceled
 */
export default class Delay {



    /**
     * indicates if the delay is currently running
     *
     * @return     {boolean}  True if running, False otherwise.
     */
    isRunning() {
        return this.started && !this.ended;
    }



    /**
     * Cancel the delay. Will stall your code at the position you are waiting for the delay to
     * resolve. Wont stall your process since it is just a promise that is never going to be
     * resolved.
     */
    cancel() {
        clearTimeout(this.timeout);
    }



    /**
     * Cancel the delay, continue execution
     *
     * @param      {*}  value   value to return when resolving
     */
    cancelAndResolve(value) {
        if (!this.started) throw new Error('Cannot cancel delay, it was never started!');
        this.resolve(value);
    }


    /**
     * Cancel the delay, continue execution with an exception
     *
     * @param      {Error}  err     error to throw
     */
    cancelAndReject(err) {
        if (!this.started) throw new Error('Cannot cancel delay, it was never started!');
        this.reject(err);
    }



    /**
     * Delay the execution n milliseconds
     *
     * @param      {number}   msecs   milliseconds to wait
     * @return     {Promise}  undefined
     */
    async wait(msecs) {
        if (this.started) {
            throw new Error('Cannot start delay, it was started already!');
        }

        this.started = true;

        const promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        this.timeout = setTimeout(() => {
            this.ended = true;
            this.resolve();
        }, msecs);

        return promise;
    }
}
