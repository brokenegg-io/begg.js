/**
 * Class for handling the Dom elements on the page
 */
 export default class ElementCollection extends Array {
    /**
     * Variable to control if the state of the document is ready
     */
    isReady = this.some(e => e.readyState != null && e.readyState != 'loading');
    /**
     * Set a function to be called when the document is ready
     * @param {*} callback 
     * @returns 
     */
    ready = (callback) => {
        if (!documentIsLoading()) {
            callback();
            return;
        }

        this.on('DOMContentLoaded', callback);
    }
    /**
     * Define in wich event an callback function should be called 
     * on the current DOM object
     * @param {*} event 
     * @param {*} callback 
     * @returns 
     */
    on = (event, callback) => this.forEach(e => e.addEventListener(event, callback));
    /**
     * Define in wich event an callback function should be called 
     * on the current DOM object only when the selector matches 
     * @param {*} event 
     * @param {*} selector 
     * @param {*} callback 
     * @returns 
     */
    on = (event, selector, callback) => {
        this.forEach(el =>
            el.addEventListener(event, ev =>
                ev.target.matches(selector) && callback()
            )
        );

        return this;
    }
    /**
     * Get the next DOM element on the array
     * @returns ElementArray
     */
    next = () => this.map(e => e.nextElementSibling).filter(e => e != null);
    /**
     * Get the previous DOM element on the array
     * @returns ElementArray
     */
    prev = () => this.map(e => e.previousElementSibling).filter(e => e != null);
    /**
     * Remove the css class from an element
     * @param {*} className 
     * @returns ElementCollection
     */
    removeClass = className => {
        this.forEach(e => e.classList.remove(className));
        return this;
    }
    /**
     * Adds a css class to an element
     * @param {*} className 
     * @returns ElementCollection
     */
    addClass = className => {
        this.forEach(e => e.classList.add(className));
        return this;
    }
    /**
     * Changes the css property on the selected element
     * @param {*} property 
     * @param {*} value 
     * @returns 
     */
    css = (property, value) => {
        this.forEach(e => {
            e.style[toCamelCase(property)] = value;
        });

        return this;
    }
}