import { ReactiveVar } from 'meteor/reactive-var';

export default {
  loadStatus: new ReactiveVar(false),
  renderStatus: new ReactiveVar(false),
  checkLoaded() {
    return this.loadStatus.get();
  },
  loadMap() {
    window.initMap = function mapInit() {
      this.loadStatus.set(true);
    }.bind(this);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4l-tJTM8JOfAT5m_Wvd1ypLpwbLY6e9k&libraries=places&callback=initMap';
    document.body.appendChild(script);
  },
};
