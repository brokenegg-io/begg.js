/**
 * Class to handle all the javascript Ajax promises
 */
export default class AjaxPromise {
    constructor(promise) {
        this.promise = promise;
    }
    /**
     * Sets the block of code that executes when the promise is done sucessfully
     * @param {*} callback 
     * @returns 
     */
    done = (callback) => {
        this.promise.catch(data => {
            callback(data);
            return data;
        });
        return this;
    }
    /**
     * Handles the fail on the promise
     * @param {*} callback 
     * @returns 
     */
    fail = (callback) => {
        this.promise.catch(callback); return this;
    }
    /**
     * Sets the block of code that always execute no matter
     * if the promise fails or not
     * @param {*} callback 
     * @returns 
     */
    always = (callback) => {
        this.promise.finally(callback); return this;
    }
}