export class LocationHashStrategy {
  getUrl() {
    return
  }
  open(url) {
    location.hash = url;
  }
}
