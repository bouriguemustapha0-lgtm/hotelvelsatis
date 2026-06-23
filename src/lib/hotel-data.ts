export const HOTEL = {
  name: "Velsatis",
  tagline: "Hôtel · Café · Restaurant",
  city: "Beni Mellal",
  country: "Morocco",
  address: "55 Boulevard Mohamed V, 23000 Beni Mellal, Morocco",
  phone: "+212 5XX-XXXXXX",
  email: "contact@hotelvelsatis.ma",
  instagram: "https://www.instagram.com/velsatis_hotel_cafe_restaurant",
  facebook: "https://www.facebook.com/",
  booking:
    "https://www.booking.com/hotel/ma/velsatis-beni-mellal.html",
  tripadvisor: "https://www.tripadvisor.com/",
  reserving:
    "https://fr.reserving.com/hotels/afrique/maroc/tadla-azilal/beni-mellal/beni-mellal/hotel-velsatis",
  rating: 7.4,
  ratingLabel: "Good",
  reviewsCount: 471,
  scores: {
    Staff: 8.6,
    Location: 8.1,
    "Value for money": 7.7,
    Comfort: 7.6,
    Cleanliness: 7.4,
    Facilities: 7.4,
  },
  airportDistance: "5.6 mi from Beni Mellal Airport",
  checkIn: "From 12:00",
  checkOut: "Until 11:30",
  license: "23000HT0836",
};

const img = (id: string, size: "max1024x768" | "max1280x900" | "max500" = "max1024x768") =>
  `https://cf.bstatic.com/xdata/images/hotel/${size}/${id}`;

export const IMAGES = {
  heroNight: img("335024411.jpg?k=e6e17054da7144e30e73d8cb0d39b64728fbdb8afea42cccdcfdfe70922b9f42&o="),
  twinRoom: img("335021360.jpg?k=75825b57f25f44ff52b2eae542f2a16c8a242caa071f373be6a5f55c8a0e4e0b&o="),
  cafe: img("335023339.jpg?k=ab1a9b07cf20cd55d532cc63f7caac52b854193dd98a950f602db9230acb1b09&o="),
  lobby: img("335023249.jpg?k=59da8338be94297c99f6066165e5b935aee15594fd1948fffd59153723eecb84&o="),
  exteriorStreet: img("203227962.jpg?k=878c9475f6e898b42b77ce727e650c49bb6503ba4d8961e79630df7acfade7d4&o="),
  twinMountain: img("653194246.jpg?k=ccbd4a4ac74ddaeee26862a24403155a6a70ac13e5b79d1296b2135bd5536760&o="),
  dining: img("335023258.jpg?k=9041224d05af8fe1008a206e6d02bd423f9f1e6e54169aa1935f26e04026f53a&o="),
  exteriorDay: img("173642021.jpg?k=a776daf1d79bedd07bceb01a065a384e7c6ef27293e86fa4ed1af98fa4448dbc&o="),
};

export const ROOMS = [
  {
    id: "single",
    name: "Single Room",
    bed: "1 twin bed",
    capacity: 1,
    price: 480,
    image: IMAGES.twinRoom,
    description:
      "An intimate refuge designed for the solo traveller. Soft linens, private balcony and the quiet rhythm of Mohamed V boulevard at dusk.",
    amenities: ["Private balcony", "Air-conditioning", "Flat-screen TV", "Free Wifi", "Wardrobe"],
  },
  {
    id: "twin",
    name: "Twin Room · Mountain View",
    bed: "2 twin beds",
    capacity: 2,
    price: 620,
    image: IMAGES.twinMountain,
    description:
      "Twin beds dressed in patterned Moroccan linens open onto a balcony framing the Middle Atlas. The light here changes hourly.",
    amenities: ["Mountain view", "Balcony", "Air-conditioning", "Private bathroom", "Free Wifi"],
  },
  {
    id: "double",
    name: "Double Room · Mountain View",
    bed: "1 queen bed",
    capacity: 2,
    price: 720,
    image: IMAGES.lobby,
    description:
      "A queen bed, warm woods and a wide private terrace. Composed for couples who prefer their cities at the foot of mountains.",
    amenities: ["Queen bed", "Mountain view", "Terrace", "Free Wifi", "TV"],
  },
  {
    id: "triple",
    name: "Triple Room · City View",
    bed: "3 twin beds",
    capacity: 3,
    price: 880,
    image: IMAGES.dining,
    description:
      "Generous space for families or friends, overlooking the textures of Beni Mellal — minarets, palms and the slow choreography of the souk.",
    amenities: ["City view", "Three beds", "Air-conditioning", "Free Wifi", "Wardrobe"],
  },
];

export const AMENITIES = [
  { name: "Free Wifi", icon: "wifi", desc: "Throughout the property" },
  { name: "Restaurant", icon: "utensils", desc: "Moroccan & international cuisine" },
  { name: "Café", icon: "coffee", desc: "Open from early morning" },
  { name: "Breakfast", icon: "croissant", desc: "Continental & à la carte" },
  { name: "24-Hour Front Desk", icon: "concierge", desc: "Always at your service" },
  { name: "Free Private Parking", icon: "car", desc: "On-site, complimentary" },
  { name: "Air Conditioning", icon: "wind", desc: "In every room" },
  { name: "Airport Transfer", icon: "plane", desc: "On request · Beni Mellal Airport" },
];

export const REVIEWS = [
  {
    name: "Yassine B.",
    country: "Morocco",
    rating: 9.2,
    text:
      "The staff went out of their way to make us feel at home. Our balcony looked over the boulevard and the mountains beyond — a quietly beautiful stay.",
  },
  {
    name: "Camille L.",
    country: "France",
    rating: 8.8,
    text:
      "Une étape parfaite entre Marrakech et Fès. La chambre était spacieuse, propre, et le café au rez-de-chaussée est un vrai bonheur le matin.",
  },
  {
    name: "Khalid R.",
    country: "United Arab Emirates",
    rating: 9.0,
    text:
      "Excellent location on Mohamed V. The restaurant served some of the best tagine I've had outside of Marrakech. Will return.",
  },
  {
    name: "Sofia M.",
    country: "Spain",
    rating: 8.6,
    text:
      "Warm welcome, comfortable bed, generous breakfast. The mountain view at sunrise is something I'll remember for a long time.",
  },
  {
    name: "Anouar T.",
    country: "Belgium",
    rating: 9.4,
    text:
      "Impeccable service from check-in to check-out. The lobby has a real character — it doesn't feel like a generic hotel at all.",
  },
  {
    name: "Hannah K.",
    country: "Germany",
    rating: 8.4,
    text:
      "Friendly team, central location, and the value is exceptional. A lovely base for exploring Ouzoud and the Middle Atlas.",
  },
];

export const GALLERY: { src: string; alt: string; category: string }[] = [
  { src: IMAGES.heroNight, alt: "Hotel facade illuminated at night", category: "Exterior" },
  { src: IMAGES.twinRoom, alt: "Twin room with balcony", category: "Rooms" },
  { src: IMAGES.cafe, alt: "Café interior", category: "Dining" },
  { src: IMAGES.lobby, alt: "Lounge with crimson chairs", category: "Interior" },
  { src: IMAGES.exteriorStreet, alt: "Velsatis building on the boulevard", category: "Exterior" },
  { src: IMAGES.twinMountain, alt: "Twin room with mountain view", category: "Rooms" },
  { src: IMAGES.dining, alt: "Restaurant dining area", category: "Dining" },
  { src: IMAGES.exteriorDay, alt: "Hotel facade by day", category: "Exterior" },
];

export const CATEGORIES = ["All", "Rooms", "Interior", "Exterior", "Dining"] as const;
