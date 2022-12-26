export function setupNotifications() {
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission((status) => {
      console.log(`requestPermission=${status}`);
    });
  }
}
