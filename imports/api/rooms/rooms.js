import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
import SimpleSchema from 'simpl-schema';
import faker from 'faker';

class RoomsCollection extends Mongo.Collection {
  insert(doc, callback) {
    // const ourDoc = doc;
    return super.insert(doc, callback);
  }
  update(selector, modifier) {
    return super.update(selector, modifier);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

const Rooms = new RoomsCollection('rooms');

// Deny all client-side updates since we will be using methods to manage this collection
Rooms.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const GeoSchema = new SimpleSchema({
  lat: {
    type: Number,
    min: -90,
    max: 90,
  },
  lng: {
    type: Number,
    min: -180,
    max: 180,
  },
});

Rooms.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  coordinates: {
    type: GeoSchema,
  },
  rent: {
    type: Number,
  },
});

Rooms.attachSchema(Rooms.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Rooms.publicFields = {
  coordinates: 1,
  rent: 1,
};

Factory.define('room', Rooms, {
  coordinates: () => ({ lat: faker.address.latitude(), lng: faker.address.longitude() }),
  rent: () => faker.commerce.price(),
});

// Rooms.helpers({
//   list() {
//     return Lists.findOne(this.listId);
//   },
//   editableBy(userId) {
//     return this.list().editableBy(userId);
//   },
// });

export default Rooms;
