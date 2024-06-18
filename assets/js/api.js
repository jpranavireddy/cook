/**
 * @license MIT
 * @copyright 2024 MGIT
 * @author pj <pj4@gmail.com>
 */

"use strict";


window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const /** {String} */ APP_ID = "b4adc2ca";
const /** {String} */ API_KEY = "d64551b43dd8a8d386e9dc4a38cd7738";
const /** {String} */ TYPE = "public";

/**
 * @param {Array} queries Query array
 * @param {Function} successCallback Success callback function
 */

export const fetchData = async function (queries, successCallback) {
  const /** {String} */ query = queries?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");

  const /** {String} */ url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

  const /** {Object} */ response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
}