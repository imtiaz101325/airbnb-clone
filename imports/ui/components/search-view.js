import { Template } from 'meteor/templating';

import './search-view.html';

import './toolbar';
import './listview';
import './map';

import mapsObj from '../../libs/maps';

Template.Search_view.onCreated(function createdFunc() {
  if (!mapsObj.checkLoaded()) {
    mapsObj.load();
  }
});
