import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './search.html';

import mapsObj from '../../libs/maps';

// Template.Search.onCreated(function createdFunc() {
//
// });

Template.Search.onRendered(function renderedFunc() {
  this.autorun(() => {
    if (mapsObj.checkLoaded()) {
      this.search = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'));
      this.search.addListener('place_changed', () => {
        const place = this.search.getPlace();
        const params = {};
        const query = {};

        if (!place.address_components && place.name) {
          params.address = place.name;
        } else {
          const addressParam = place.address_components.map(
            ({ long_name }) => long_name.split(' ').join('-'),
          ).join('--');

          params.address = addressParam;
        }

        if (place.place_id) {
          query.place_id = place.place_id;
        }

        FlowRouter.go('/s/:address', params, query);
      });
    }
  });
});
