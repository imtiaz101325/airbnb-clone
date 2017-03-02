import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './search.html';

import mapsObj from '../../libs/maps';

// Template.Search.onCreated(function createdFunc() {
//
// });

Template.Search.onRendered(function renderedFunc() {
  this.autorun(function autofunc() {
    if (mapsObj.checkLoaded()) {
      this.search = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'));
      this.search.addListener('place_changed', () => {
        const place = this.search.getPlace();
        let addressParam;
        if (!place.address_components) {
          addressParam = place.name;
        } else {
          addressParam = place.address_components.map(
            ({ long_name }) => long_name.split(' ').join('-'),
          ).join('--');
        }

        if (addressParam) {
          FlowRouter.go('/s/'+addressParam);
        }
      })
    }
  }.bind(this));
});
