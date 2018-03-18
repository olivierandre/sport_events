import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'

var mock = new MockAdapter(axios);

var users = [
  {
    id: 1,
    birthday: '23/11/1990',
    name: 'John Doe',
    address: '8 Rue des rues',
    town: 'Paris'
  }
];
var events = [
  {
    id: 1,
    date: '17/03/2018',
    name: 'Match de foot entre copains',
    user: 'John Smith',
    address: '8 Rue Smith & Bobby, Paris',
    sport: 'Football'
  }, {
    id: 2,
    date: '19/03/2018',
    name: 'Courir en mangeant',
    user: 'Alan Smithee',
    address: "Bois de Vincennes",
    sport: 'Running'
  }
];
var id = [events.length]
var sports = [
  {
    id: 1,
    name: "Football"
  }, {
    id: 2,
    name: "Tennis"
  }, {
    id: 3,
    name: "Running"
  }, {
    id: 4,
    name: "Rugby"
  }
]
mock.onGet('/api/events').reply(200, {events: events, id: id});
mock.onGet('/api/events/id').reply(200, {id: id});
mock.onPost('/api/events').reply(function(config) {
  events.push(JSON.parse(config.data))
  id[0] = events.length;
  return [
    200, {
      events: events
    }
  ];
})

mock.onGet('/api/profile').reply(200, {users: users});
mock.onPut('/api/profile').reply(function(config) {
  users[0] = JSON.parse(config.data)
  return [
    200, {
      users: users
    }
  ];
})

mock.onGet('/api/sports').reply(200, {sports: sports})
