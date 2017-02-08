navigator.serviceWorker.register('sw.js', {scope: './'});

function showNotification () {
  navigator.serviceWorker.ready.then(function(registration) {
    registration.showNotification('Notification with ServiceWorker');
  });
}

function notifyMe() {
  if (!("Notification" in window)) {
    alert("This browser does not support notification");
  } else if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
}
