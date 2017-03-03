import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './search-view.html';

import './toolbar';
import './listview';
import './map';

import Rooms from '../../api/rooms/rooms';

Template.Search_view.onCreated(function createdFunc() {
  this.subscribe('rooms.all');

  this.state = new ReactiveDict();
});

Template.Search_view.onRendered(function autoFunc() {
  this.autorun(() => {
    FlowRouter.watchPathChange();//reactively get url state

    const context = FlowRouter.current();
    this.state.set('params', context.params);
    this.state.set('query', context.queryParams);
    // this.state.set('route', context.route);
  });
});

Template.Search_view.helpers({
  rooms() {
    const instance = Template.instance();
    const params = instance.state.get('params');

    // if(params.address){
    //
    // }
  },
});
