// ==UserScript==
// @name         BBB Hide Users
// @namespace    https://openuserjs.org/users/TheDarkTron
// @version      0.2
// @description  Adds a button next to the "show users" button so you can hide the users list without hiding the public chat in Big Blue Button video conferences
// @author       TheDarkTron
// @license      MIT
// @updateURL    https://openuserjs.org/meta/TheDarkTron/BBB_Hide_Users.meta.js
// @downloadURL  https://openuserjs.org/install/TheDarkTron/BBB_Hide_Users.user.js
// @copyright    2021, TheDarkTron (https://openuserjs.org/users/TheDarkTron)
// @homepageURL  https://github.com/TheDarkTron/userscripts
// @match        *://*/html5client/join?sessionToken=*
// @icon         https://www.google.com/s2/favicons?domain=bigbluebutton.org
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toggleDisplay(element) {
        if (element.style.display === 'none') {
            element.style.display = null;
        } else {
            element.style.display = 'none';
        }
    }

    // wait till bbb ajax calls are ready
    setTimeout(function() {
        // add button
        let orgButton = document.querySelector('#app > main > section button[aria-label="Users and messages toggle"');

        let button = orgButton.cloneNode(true);
        button.children[1].innerText = 'Hide Users';
        button.children[0].style.color = 'darkgoldenrod';
        button.setAttribute('aria-label', 'Hide Users');

        button.addEventListener('click', function() {
            const userList = document.querySelector('#app > main > section div[aria-label="User list"]');
            if (!userList) return;
            const userListParent = userList.parentNode;
            toggleDisplay(userListParent);
            toggleDisplay(userListParent.nextElementSibling);
        })

        orgButton.insertAdjacentElement('beforebegin', button);
    }, 3000);
})();
