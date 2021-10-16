const { isString, objectToQueryString } = require('./Helpers/MainHelper');
const ElementCollection = require('./Dom/ElementCollection');
const Exception = require('./Exceptions/Exception');
const AjaxPromise = require('./Ajax/AjaxPromise');

$ = param => {
    if (isString(param)) return new ElementCollection(...document.querySelectorAll(param));
    return new ElementCollection(param);
}
/**
 * Sends an HTTP Get Request
 * @param {*} param0 
 * @param {*} dataType 
 * @returns 
 */
 $.get = ({ url, data = {}, success = () => { } }, dataType) => $.ajax({ url, data, success }, dataType, 'GET');
 /**
  * Sends an HTTP Post Request
  * @param {*} param0 
  * @param {*} dataType 
  * @returns 
  */
 $.post = ({ url, data = {}, success = () => { } }, dataType) => $.ajax({ url, data, success }, dataType, 'POST');
 /**
  * Sends an HTTP Delete Request
  * @param {*} param0 
  * @param {*} dataType 
  * @returns 
  */
 $.delete = ({ url, data = {}, success = () => { } }, dataType) => $.ajax({ url, data, success }, dataType, 'DELETE');
 /**
  * Sends an HTTP Put Request
  * @param {*} param0 
  * @param {*} dataType 
  * @returns 
  */
 $.put = ({ url, data = {}, success = () => { } }, dataType) => $.ajax({ url, data, success }, dataType, 'PUT');
 /**
  * Custom function to send HTTP requests on custom methods name
  * to be used on the GET, POST, DELETE and PUT methods
  * @param {*} param0 
  * @param {*} dataType 
  * @param {*} method 
  * @returns 
  */
 $.ajax = ({ url, data = {}, success = () => { } }, dataType, method) => {
     const isGet = method === 'GET';
     let callUrl = isGet ? `${url}?${objectToQueryString(data)}` : url;
     return new AjaxPromise(
         fetch(callUrl, {
             method: method,
             headers: {
                 'Content-Type': dataType
             },
             data: isGet ? null : data
         }).then(response => {
             if (!response.ok) throw new Exception(response.status);
             response.json();
         })
             .then(data => {
                 success(data);
                 return data;
             }
             ));
 }

 module.exports = { $ }