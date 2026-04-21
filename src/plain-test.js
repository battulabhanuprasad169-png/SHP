console.log("plain-test.js: Script is executing!");
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = "<h1 style='color: red'>PLAIN JS IS WORKING</h1>";
        console.log("plain-test.js: Modified DOM successfully.");
    } else {
        console.error("plain-test.js: Root not found.");
    }
});
