import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';

import GMaps from 'gmaps';

import './map.html';

import mapsObj from '../../libs/maps';

// Template.Map.onCreated(function createdFunc() {
//   this.state = new ReactiveDict();
// });

Template.Map.onRendered(function renderedFunc() {
  this.autorun(function autofunc() {
    if (mapsObj.checkLoaded()) {
      this.map = new GMaps({
        el: '#load-map',
        zoom: 2,
        lat: 20,
        lng: -10,
      });
    }
  }.bind(this));// this -> template context
});
