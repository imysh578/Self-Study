// @ts-check : check types in js file
/**
 * Initializes the project
 * @param {object} config 
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code 
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}