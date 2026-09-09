export const packages = [
  {
    id: 'car-west',
    name: 'West Nusa Penida Private Car Tour',
    description: 'Explore Kelingking Beach, Broken Beach, & Angel Billabong with a private AC car and experienced local driver.',
    description_id: 'Jelajahi Kelingking Beach, Broken Beach, & Angel Billabong dengan mobil AC private & driver berpengalaman.',
    price: 700000,
    duration: '1 Day',
    duration_id: '1 Hari',
    destinations: ['Kelingking Beach', 'Broken Beach', 'Angel Billabong', 'Crystal Bay'],
    rating: 4.9,
    image: '/img/west.jpg',
    category: 'west',
    cardType: 'car',
    badgeLabel: 'Private Car Tour',
    vehicleName: 'Private AC Car (Avanza / Xenia)',
    vehicleName_id: 'Mobil AC Private (Avanza / Xenia)',
    capacity: 'Up to 6 Passengers',
    itinerary: [
      { time: '08:00 AM', activity: 'Meet at Sanur Harbor & Fast Boat to Nusa Penida' },
      { time: '09:00 AM', activity: 'Arrive at Nusa Penida & Private Car Pickup' },
      { time: '10:30 AM', activity: 'Kelingking Beach Cliff Photo Spot' },
      { time: '12:30 PM', activity: 'Lunch at Local Restaurant' },
      { time: '01:30 PM', activity: 'Broken Beach (Pasih Uug) Visit' },
      { time: '02:30 PM', activity: 'Angel\'s Billabong Natural Pool' },
      { time: '04:00 PM', activity: 'Return to Harbor & Fast Boat back to Sanur' }
    ],
    inclusions: [
      'Round-trip Fast Boat Tickets (Sanur - Nusa Penida)',
      'Private AC Car + Fuel (BBM)',
      'Personal Driver acting as Local Guide & Photographer',
      'Entrance Fees & Destination Tickets',
      'Lunch at Local Restaurant',
      'Chilled Mineral Water'
    ],
    highlights: [
      'Comfortable private AC car trip without midday heat',
      'Ideal for families and groups',
      'Friendly driver ready to capture beautiful photos'
    ]
  },
  {
    id: 'car-east',
    name: 'East Nusa Penida Private Car Tour',
    description: 'Discover Diamond Beach stairs, Atuh Beach cliffs & Tree House with a comfortable private car.',
    description_id: 'Nikmati keindahan Diamond Beach, Atuh Beach & Rumah Pohon Molenteng menggunakan mobil AC nyaman.',
    price: 800000,
    duration: '1 Day',
    duration_id: '1 Hari',
    destinations: ['Diamond Beach', 'Atuh Beach', 'Molenteng Tree House', 'Raja Lima'],
    rating: 4.9,
    image: '/img/east.jpg',
    category: 'east',
    cardType: 'car',
    badgeLabel: 'Private Car Tour',
    vehicleName: 'Private AC Car (Avanza / APV)',
    vehicleName_id: 'Mobil AC Private (Avanza / APV)',
    capacity: 'Up to 6 Passengers',
    itinerary: [
      { time: '08:00 AM', activity: 'Meet at Sanur Harbor & Fast Boat to Nusa Penida' },
      { time: '09:00 AM', activity: 'Private Car Pickup at Nusa Penida Harbor' },
      { time: '10:30 AM', activity: 'Explore Iconic Stairs at Diamond Beach' },
      { time: '11:30 AM', activity: 'Atuh Beach Cliff Viewpoint' },
      { time: '12:30 PM', activity: 'Lunch at Local Restaurant' },
      { time: '01:30 PM', activity: 'Photos at Molenteng Tree House' },
      { time: '04:00 PM', activity: 'Return to Harbor' }
    ],
    inclusions: [
      'Round-trip Fast Boat Tickets (Sanur - Nusa Penida)',
      'Private AC Car + Driver + Fuel',
      'All Attraction Entrance Fees',
      'Lunch at Local Restaurant',
      'Photo Assistance by Driver'
    ],
    highlights: [
      'Iconic cliffside view of Diamond Beach',
      'Full comfort with 4-wheel vehicle',
      'All tickets and lunch included'
    ]
  },
  {
    id: 'motor-west',
    name: 'West Nusa Penida Motor Trip',
    description: 'An exciting scooter trip around West Nusa Penida highlights with automatic scooter, fuel, and guide.',
    description_id: 'Sensasi seru keliling destinasi barat Nusa Penida menggunakan motor matic lengkap dengan bensin & guide.',
    price: 350000,
    duration: '1 Day',
    duration_id: '1 Hari',
    destinations: ['Kelingking Beach', 'Broken Beach', 'Angel Billabong'],
    rating: 4.8,
    image: '/img/west.jpg',
    category: 'west',
    cardType: 'motorcycle',
    badgeLabel: 'Motorbike Tour',
    vehicleName: 'Automatic Scooter + Helmet + Fuel',
    vehicleName_id: 'Motor Scooter Matic + Helm + BBM',
    capacity: '1 Scooter per Rider / Couple',
    itinerary: [
      { time: '08:00 AM', activity: 'Fast Boat Transfer from Sanur' },
      { time: '09:00 AM', activity: 'Scooter Handover & Safety Briefing' },
      { time: '10:30 AM', activity: 'Riding to Kelingking Beach' },
      { time: '12:30 PM', activity: 'Lunch at Local Restaurant' },
      { time: '01:30 PM', activity: 'Broken Beach & Angel Billabong' },
      { time: '04:00 PM', activity: 'Return to Nusa Penida Harbor' }
    ],
    inclusions: [
      'Round-trip Fast Boat Tickets',
      'Automatic Scooter (Vario/Scoopy) + Full Fuel',
      'Clean Helmets & Raincoats',
      'Local Motorbike Guide (Route & Photos)',
      'Entrance Tickets & Lunch'
    ],
    highlights: [
      'Flexible riding avoiding traffic bottlenecks',
      'Fun and immersive outdoor adventure',
      'Budget-friendly for solo riders and couples'
    ]
  },
  {
    id: 'motor-east',
    name: 'East Nusa Penida Motor Adventure',
    description: 'Scenic coastal motorbike ride exploring East Nusa Penida cliffs, pristine beaches, and tree house.',
    description_id: 'Petualangan menyusuri pesisir timur Nusa Penida dengan sepeda motor melintasi bukit & pantai indah.',
    price: 400000,
    duration: '1 Day',
    duration_id: '1 Hari',
    destinations: ['Diamond Beach', 'Atuh Beach', 'Tree House Molenteng'],
    rating: 4.9,
    image: '/img/east.jpg',
    category: 'east',
    cardType: 'motorcycle',
    badgeLabel: 'Motorbike Tour',
    vehicleName: 'Automatic Scooter + Helmet + Fuel',
    vehicleName_id: 'Motor Scooter Matic + Helm + BBM',
    capacity: '1 Scooter per Rider',
    itinerary: [
      { time: '08:00 AM', activity: 'Depart from Sanur Harbor' },
      { time: '09:00 AM', activity: 'Pick Up Scooter at Penida Harbor' },
      { time: '10:30 AM', activity: 'Diamond Beach Stairs Viewpoint' },
      { time: '12:30 PM', activity: 'Lunch Break' },
      { time: '01:30 PM', activity: 'Molenteng Tree House' },
      { time: '04:00 PM', activity: 'Return to Harbor' }
    ],
    inclusions: [
      'Round-trip Fast Boat Tickets',
      'Automatic Scooter + Full Fuel',
      'Helmets & Raincoats',
      'Route Pacesetter & Entry Tickets',
      'Lunch Included'
    ],
    highlights: [
      'Easy access to Eastern scenic spots',
      'Scenic riding along turquoise coastal roads',
      'Guided by experienced local riders'
    ]
  },
  {
    id: 'car-full',
    name: 'Full Island 2-Day Private Car Tour',
    description: 'Complete 2-day 1-night tour exploring both West & East sides in a private AC car with hotel stay.',
    description_id: 'Paket lengkap 2 hari 1 malam menjelajahi seluruh destinasi Barat & Timur dengan Mobil AC Private.',
    price: 1200000,
    duration: '2 Days',
    duration_id: '2 Hari',
    destinations: ['Kelingking', 'Broken Beach', 'Diamond Beach', 'Tree House', 'Crystal Bay'],
    rating: 5.0,
    image: '/img/2.jpg',
    category: 'Full Island',
    cardType: 'car',
    badgeLabel: 'Private Car Tour',
    vehicleName: 'Private AC Car (2 Days)',
    vehicleName_id: 'Mobil AC Private 2 Hari',
    capacity: 'Up to 6 Passengers',
    itinerary: [
      { time: 'Day 1', activity: 'West Side Tour (Kelingking & Broken Beach) + Hotel Check-in' },
      { time: 'Day 2', activity: 'Sunrise & East Side Tour (Diamond Beach) + Return to Sanur' }
    ],
    inclusions: [
      'All Round-trip Fast Boat Tickets',
      'Private AC Car + Driver + Fuel for 2 Days',
      '1 Night Hotel Accommodation with Breakfast',
      'Lunch for 2 Days at Local Restaurants',
      'All Destination Entrance Fees'
    ],
    highlights: [
      'Unrushed pace with sunrise & sunset views',
      'Maximum AC comfort for 2 full days',
      'All-inclusive hassle-free package'
    ]
  },
  {
    id: 'motor-sunset',
    name: 'Nusa Penida Sunset Scooter Special',
    description: 'Late afternoon riding tour to catch the golden sunset at Kelingking Beach & Crystal Bay.',
    description_id: 'Tour sore menikmati sunset Kelingking Beach & Crystal Bay dengan motor tanpa antrean ramai.',
    price: 320000,
    duration: '6 Hours',
    duration_id: '6 Jam',
    destinations: ['Kelingking Beach', 'Crystal Bay Sunset'],
    rating: 4.7,
    image: '/img/sunset special.jpg',
    category: 'Sunset',
    cardType: 'motorcycle',
    badgeLabel: 'Motorbike Tour',
    vehicleName: 'Automatic Scooter + Helmet',
    vehicleName_id: 'Motor Scooter Matic + Helm',
    capacity: '1 Scooter per Rider',
    itinerary: [
      { time: '01:00 PM', activity: 'Depart from Sanur Harbor' },
      { time: '02:30 PM', activity: 'Kelingking Beach Viewpoint' },
      { time: '05:30 PM', activity: 'Golden Hour Sunset at Crystal Bay' },
      { time: '07:00 PM', activity: 'Evening Fast Boat back to Sanur' }
    ],
    inclusions: [
      'Round-trip Fast Boat Tickets',
      'Scooter + Fuel Included',
      'Helmet & Local Guide',
      'Sunset Refreshment Drinks at Crystal Bay'
    ],
    highlights: [
      'Avoid midday heat & peak crowds',
      'Breathtaking sunset at Crystal Bay',
      'Perfect for late afternoon departures'
    ]
  }
];

export const motorbikes = [
  {
    id: 'vario-125',
    name: 'Honda Vario 125cc',
    specs: '125cc, Automatic, Fuel Efficient',
    pricePerDay: 150000,
    image: '/img/vario.jpeg',
    cardType: 'rental',
    badgeLabel: 'Motorbike Rental',
    vehicleName: 'Daily Scooter Rental',
    vehicleName_id: 'Sewa Motor Mandiri',
    inclusions: ['2 SNI Approved Helmets', '2 Raincoats Included', 'Starting Fuel Tank', '24/7 Roadside Assistance']
  },
  {
    id: 'scoopy-110',
    name: 'Honda Scoopy Stylish',
    specs: '110cc, Retro Aesthetic, Remote Key',
    pricePerDay: 100000,
    image: '/img/scoopy.jpeg',
    cardType: 'rental',
    badgeLabel: 'Motorbike Rental',
    vehicleName: 'Daily Scooter Rental',
    vehicleName_id: 'Sewa Motor Mandiri',
    inclusions: ['2 Stylish Helmets', 'Raincoat Included', 'Top Engine Condition', 'Harbor Delivery & Pickup']
  },

];
