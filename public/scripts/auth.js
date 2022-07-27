"use strict";
(function (win, doc, _) {
    var emailInputHandler = function () {
        var emailInputNode = doc.querySelector(".input[type='email']");
        if (emailInputNode)
            emailInputNode.addEventListener("input", function (e) {
                return emailInputNode.setAttribute("value", e.target.value);
            });
    };
    if (location.pathname === "/login")
        emailInputHandler();
    if (location.pathname === "/register") {
        emailInputHandler();
        var passwords = Array.from(doc.querySelectorAll(".input[type='password']")).map(function (node) { return node.value; });
        var arePasswordMatching = passwords[0] === passwords[1];
        if (!arePasswordMatching) {
            // show error
        }
    }
})(window, document);
