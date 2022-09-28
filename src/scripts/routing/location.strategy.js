export class LocationHashStrategy {
  getUrl() {
    return location.hash.slice(1) || '/';
  }
  open(url) {
    location.hash = url;
  }
}
