import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'

var mock = new MockAdapter(axios);

var users = [
  {
    id: 1,
    birthday: '23/11/1990',
    name: 'John Doe',
    address: '8 Rue des rues',
    town: 'Paris',
    games: {
      played: 14,
      organized: 5,
      favorite: {
        sport: 1,
        average: 7.2
      }
    },
    available: {
      day: [0, 2, 3, 4],
      time: '19h-23h'
    },
    favorite_spots: ['UrbanSoccer Créteil', 'Le Five Paris']
  }
];
var events = [
  {
    id: 1,
    date: '17/03/2018',
    name: 'Soccer 5 vs 5',
    user: 'John Smith',
    price: '8',
    duration: '5400',
    meetingTime: '15h30',
    sport: 1,
    freePlace: 3,
    tags: [
      '5vs5', 'Football'
    ]
  }, {
    id: 2,
    date: '17/03/2018',
    name: 'Bois de Vincennes',
    user: 'John Doe',
    price: '8',
    duration: '5400',
    meetingTime: '9h00',
    sport: 3,
    freePlace: 0,
    tags: ['Bois', 'Vincennes', 'course']
  },{
    id: 3,
    date: '19/03/2018',
    name: '3 vs 3',
    user: 'Paulo',
    price: '8',
    duration: '3600',
    meetingTime: '19h',
    sport: 5,
    freePlace: 6,
    tags:['Paulo', 'Basket']
  },
  {
    id: 4,
    date: '20/03/2018',
    name: 'Court Niox',
    user: 'Albert',
    price: '8',
    duration: '7200',
    meetingTime: '15h30',
    sport: '2',
    freePlace: 1,
    tags: []
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
  },
  {
    id: 5,
    name: "Basket"
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
