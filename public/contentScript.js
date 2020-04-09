chrome.runtime.onMessage.addListener((request, sender, respond) => {
    if (request.run) {
        window.eval(request.run);
    }
});
