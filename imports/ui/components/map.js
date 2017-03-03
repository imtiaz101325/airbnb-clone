import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './map.html';

import mapsObj from '../../libs/maps';

Template.Map.onCreated(function createdFunc() {
  this.state = new ReactiveDict();
});

Template.Map.onRendered(function renderedFunc() {
  this.autorun(() => {
    FlowRouter.watchPathChange();// reactively get url state

    if (mapsObj.checkLoaded()) {
      if (!this.map) {
        this.map = new window.google.maps.Map(document.getElementById('load-map'), {
          center: { lat: 20, lng: -10 },
          zoom: 2,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
        });
      }

      const context = FlowRouter.current();
      const geocoder = new window.google.maps.Geocoder();

      if (context.queryParams.place_id) {
        geocoder.geocode({ placeId: context.queryParams.place_id }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.map.setZoom(11);
              this.map.setCenter(results[0].geometry.location);
            } else {
              // Meteor Err
            }
          } else {
            // window.alert('Geocoder failed due to: ' + status);
            FlowRouter.go('/s');
          }
        });
      }

      if (!context.queryParams.place_id && context.params.address) {
        geocoder.geocode({ address: context.params.address }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.map.setZoom(11);
              this.map.setCenter(results[0].geometry.location);
            } else {
              // Meteor Err
            }
          } else {
            console.log('wrong wrong');
            FlowRouter.go('/s');
          }
        });
      }

      // this.map.addListener('bounds_changed', () => {
      //   console.log(this.map.getBounds());
      // });

      // const marker = new window.google.maps.Marker({
      //   position: { lat: 20, lng: -10 },
      //   map: this.map,
      //   label: {
      //     text: '$12',
      //     color: 'white',
      //     fontWeight: '600',
      //     fontSize: '16px',
      //   },
      //   icon: {
      //     path: 'M22-48h-44v43h16l6 5 6-5h16z',
      //     fillColor: '#EB6864',
      //     fillOpacity: 1,
      //     labelOrigin: new window.google.maps.Point(0, -25),
      //     anchor: new window.google.maps.Point(0, 0),
      //     scale: 0.7,
      //   },
      // });

      // const infowindow = new window.google.maps.InfoWindow({
      //   content: 'wow content',
      // });

      // let openState = false;
      //
      // marker.addListener('click', () => {
      //   openState = true;
      //   infowindow.open(this.map, marker);
      //   console.log(window.google.maps.SymbolPath);
      // });

      // this.map.addListener('click', () => {
      //   if (openState) {
      //     openState = false;
      //     infowindow.close(this.map, marker);
      //   }
      // });
    }
  });
});
