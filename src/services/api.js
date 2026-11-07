// Base API Client with Local Fallback Mock Store for Seamless Offline Resilience
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('kle_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Authentication
  login: async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Invalid credentials');
      }
      return await res.json();
    } catch (e) {
      // Disable mock authentication fallback in production environments
      if (import.meta.env.PROD) {
        throw e;
      }
      // Mock Fallback Authentication for local evaluation (Development mode only)
      if (username === 'admin' || username === 'admin@keralaluxury.com') {
        return {
          token: 'mock-jwt-admin-token',
          userId: 1,
          username: 'admin',
          email: 'admin@keralaluxury.com',
          fullName: 'Aswathi Nair (Admin)',
          roles: ['ROLE_ADMIN'],
          expiresInMs: 86400000,
        };
      } else if (username === 'editor' || username === 'editor@keralaluxury.com') {
        return {
          token: 'mock-jwt-editor-token',
          userId: 2,
          username: 'editor',
          email: 'editor@keralaluxury.com',
          fullName: 'Rahul Menon (Editor)',
          roles: ['ROLE_EDITOR'],
          expiresInMs: 86400000,
        };
      } else if (username === 'consultant' || username === 'consultant@keralaluxury.com') {
        return {
          token: 'mock-jwt-consultant-token',
          userId: 3,
          username: 'consultant',
          email: 'consultant@keralaluxury.com',
          fullName: 'Deepa Varma (Consultant)',
          roles: ['ROLE_CONSULTANT'],
          expiresInMs: 86400000,
        };
      }
      throw e;
    }
  },

  getCurrentUser: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Not authenticated');
    return await res.json();
  },

  // Public Endpoints
  getDestinations: async () => {
    try {
      const res = await fetch(`${API_BASE}/public/destinations`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackDestinations;
  },

  getPackages: async (params = {}) => {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/public/packages?${qs}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackPackages;
  },

  getPackageBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_BASE}/public/packages/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackPackages.find(p => p.slug === slug) || fallbackPackages[0];
  },

  submitEnquiry: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      success: true,
      message: 'Your enquiry has been registered with our Fort Kochi concierge team.',
      referenceNo: 'ENQ-2026-' + Math.floor(1000 + Math.random() * 9000),
    };
  },

  getBlogs: async (category) => {
    try {
      const url = category ? `${API_BASE}/public/blogs?category=${category}` : `${API_BASE}/public/blogs`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackBlogs;
  },

  getBlogBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_BASE}/public/blogs/${slug}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackBlogs.find(b => b.slug === slug) || fallbackBlogs[0];
  },

  // Admin Endpoints
  getAdminPackages: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/packages`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackPackages;
  },

  savePackage: async (pkgData, id) => {
    const url = id ? `${API_BASE}/admin/packages/${id}` : `${API_BASE}/admin/packages`;
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(pkgData),
    });
    if (!res.ok) throw new Error('Failed to save package');
    return await res.json();
  },

  duplicatePackage: async (id) => {
    const res = await fetch(`${API_BASE}/admin/packages/${id}/duplicate`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to duplicate package');
    return await res.json();
  },

  deletePackage: async (id) => {
    const res = await fetch(`${API_BASE}/admin/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete package');
    return await res.json();
  },

  getPackageVersions: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/packages/${id}/versions`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },

  rollbackPackageVersion: async (id, versionNumber) => {
    const res = await fetch(`${API_BASE}/admin/packages/${id}/rollback/${versionNumber}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to rollback package');
    return await res.json();
  },

  // Admin Enquiry Endpoints
  getAdminEnquiries: async (status, keyword) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (keyword) params.append('keyword', keyword);
      const res = await fetch(`${API_BASE}/admin/enquiries?${params.toString()}`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackEnquiries;
  },

  saveManualEnquiry: async (data) => {
    const res = await fetch(`${API_BASE}/admin/enquiries/manual`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create manual enquiry');
    return await res.json();
  },

  updateEnquiryStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return await res.json();
  },

  addEnquiryNote: async (id, note) => {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ note }),
    });
    if (!res.ok) throw new Error('Failed to add note');
    return await res.json();
  },

  assignEnquiry: async (id, userId, notes) => {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/assign`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, notes }),
    });
    if (!res.ok) throw new Error('Failed to assign enquiry');
    return await res.json();
  },

  // AI Assistant Endpoints
  runAIAnalysis: async (id) => {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/ai-analyze`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to execute AI analysis');
    return await res.json();
  },

  reviewAIDraft: async (id, reviewData) => {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/ai-review`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error('Failed to submit AI review');
    return await res.json();
  },

  // Quotation Endpoints
  calculateQuotation: async (data) => {
    const res = await fetch(`${API_BASE}/admin/quotations/calculate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to calculate quotation');
    return await res.json();
  },

  createQuotation: async (data) => {
    const res = await fetch(`${API_BASE}/admin/quotations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create quotation');
    return await res.json();
  },

  getQuotationsForEnquiry: async (enquiryId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/quotations/enquiry/${enquiryId}`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },

  getQuotationPdfUrl: (id) => `${API_BASE}/admin/quotations/${id}/pdf`,

  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard/stats`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackDashboardStats;
  },

  // Blog CMS
  getAdminBlogs: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/blogs`, { headers: getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {}
    return fallbackBlogs;
  },

  saveBlog: async (blogData, id) => {
    const url = id ? `${API_BASE}/admin/blogs/${id}` : `${API_BASE}/admin/blogs`;
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData),
    });
    if (!res.ok) throw new Error('Failed to save blog');
    return await res.json();
  },

  deleteBlog: async (id) => {
    const res = await fetch(`${API_BASE}/admin/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete blog');
    return await res.json();
  },
};

// ==========================================
// Seed Data Placeholders for Instant Visual UI
// ==========================================
export const fallbackDestinations = [
  {
    id: 1,
    name: 'Munnar',
    slug: 'munnar',
    region: 'Central Kerala',
    tagline: 'The Emerald High Ranges & Misty Tea Estates',
    description: 'Sprawling tea gardens, mist-clad peaks, colonial bungalows, and serene mountain air situated 1,600m above sea level in the Western Ghats.',
    heroImageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'September to March',
    featured: true,
  },
  {
    id: 2,
    name: 'Alleppey',
    slug: 'alleppey',
    region: 'South Kerala',
    tagline: 'The Venice of the East & Serene Backwaters',
    description: 'An intricate labyrinth of tranquil lagoons, palm-fringed canals, and luxurious traditional Kettuvallam houseboats.',
    heroImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to February',
    featured: true,
  },
  {
    id: 3,
    name: 'Thekkady',
    slug: 'thekkady',
    region: 'Central Kerala',
    tagline: 'Spice Hills & Periyar Tiger Reserve',
    description: 'Perched in the spice-scented hills surrounding Periyar Lake, renowned for wild elephant herds and cardamom plantations.',
    heroImageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'September to April',
    featured: true,
  },
  {
    id: 4,
    name: 'Wayanad',
    slug: 'wayanad',
    region: 'North Kerala',
    tagline: 'Pristine Rainforests, Caves & Waterfalls',
    description: 'Ancient caves with Neolithic petroglyphs, mist-shrouded chembra peak, treehouse sanctuaries, and lush evergreen rainforest reserves.',
    heroImageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to May',
    featured: true,
  },
  {
    id: 5,
    name: 'Kovalam & Varkala',
    slug: 'kovalam-varkala',
    region: 'South Kerala',
    tagline: 'Dramatic Red Sandstone Cliffs & Golden Shores',
    description: 'Perched atop geological cliff formations overlooking the Arabian Sea, featuring natural mineral springs and Ayurvedic healing.',
    heroImageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'November to March',
    featured: true,
  },
  {
    id: 6,
    name: 'South India Heritage',
    slug: 'south-india-heritage',
    region: 'Tamil Nadu & Kerala Border',
    tagline: 'Madurai, Rameswaram & Kanyakumari Corridor',
    description: 'A spiritual journey through towering Dravidian temple gopurams, legendary sea bridges, and the confluence of three oceans.',
    heroImageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to March',
    featured: false,
  },
];

export const fallbackPackages = [
  {
    id: 1,
    title: 'Munnar, Thekkady and Alleppey Houseboat',
    slug: 'munnar-thekkady-alleppey-houseboat',
    subtitle: 'The Quintessential Kerala Experience: Misty Hills, Wildlife Sanctuary & Private Luxury Houseboat',
    overview: 'Embark on an unforgettable 6-day voyage through the crown jewels of Kerala. Begin amidst the rolling emerald tea plantations of Munnar, venture into the aromatic spice groves of Thekkady, and culminate in an exclusive overnight cruise aboard a private luxury houseboat gliding across Vembanad Lake in Alleppey.',
    destination: { id: 1, name: 'Munnar' },
    durationDays: 6,
    durationNights: 5,
    theme: 'Luxury Nature & Backwaters',
    status: 'PUBLISHED',
    featured: true,
    inclusions: 'Luxury private chauffeur vehicle throughout; 2 Nights 5-star mountain resort in Munnar; 1 Night spice estate villa in Thekkady; 1 Night boutique lake resort in Kumarakom; 1 Night exclusive private luxury houseboat in Alleppey with personal chef and crew; Daily gourmet buffet breakfast; All meals aboard houseboat; Guided tea museum walk & spice plantation tour; Periyar Lake boat safari tickets.',
    exclusions: 'Airfare to/from Kochi; Lunches and dinners other than specified; Camera fees; Personal expenses; 5% GST.',
    hotelInformation: 'Munnar: Fragrant Nature Resort & Spa (Valley View Room)\nThekkady: Cardamom County / Greenwoods Spice Haven\nAlleppey: Luxury 1-Bedroom Private Houseboat with Upper Sun Deck',
    termsAndConditions: 'Confirmation requires 30% advance deposit. Free cancellation up to 14 days before arrival. 5% GST applies to final billing.',
    images: [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', caption: 'Private luxury houseboat in Alleppey', primary: true },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80', caption: 'Emerald tea terraces in Munnar', primary: false },
    ],
    seasonalPrices: [
      { id: 1, seasonType: 'PEAK', pricePerPerson: 32500, childPricePerPerson: 14500, notes: 'October to March - Pristine weather & holidays' },
      { id: 2, seasonType: 'MONSOON', pricePerPerson: 24900, childPricePerPerson: 11000, notes: 'Monsoon season - Lush greenery & Ayurvedic rejuvenation' },
      { id: 3, seasonType: 'OFF_SEASON', pricePerPerson: 21500, childPricePerPerson: 9500, notes: 'Summer off-season rates' },
    ],
    itineraries: [
      { id: 1, dayNumber: 1, title: 'Arrival in Kochi & Ascent to Munnar', description: 'Scenic drive ascending into the mist-draped Western Ghats with stops at Cheeyappara and Valara waterfalls.', stayLocation: 'Munnar', mealsIncluded: 'Dinner' },
      { id: 2, dayNumber: 2, title: 'Munnar Tea Trails & Eravikulam National Park', description: 'Visit Eravikulam National Park to spot the Nilgiri Tahr. Explore heritage Tea Museum with private tasting session.', stayLocation: 'Munnar', mealsIncluded: 'Breakfast, Dinner' },
      { id: 3, dayNumber: 3, title: 'Munnar to Thekkady: Spice Hills & Periyar Lake', description: 'Winding scenic journey through cardamom hills. Wildlife boat cruise on Periyar Lake to spot wild elephant herds.', stayLocation: 'Thekkady', mealsIncluded: 'Breakfast, Dinner' },
      { id: 4, dayNumber: 4, title: 'Thekkady to Kumarakom Lake Sanctuary', description: 'Descend toward Vembanad Lake. Check into an award-winning lakefront sanctuary with sunset canoe excursion.', stayLocation: 'Kumarakom', mealsIncluded: 'Breakfast, Dinner' },
      { id: 5, dayNumber: 5, title: 'Private Luxury Houseboat Cruise in Alleppey', description: 'Board private wood-and-coir luxury houseboat. Feast on Karimeen Pollichathu prepared by personal onboard chef.', stayLocation: 'Alleppey Houseboat', mealsIncluded: 'Breakfast, Lunch, High Tea, Dinner' },
      { id: 6, dayNumber: 6, title: 'Alleppey to Cochin Airport Departure', description: 'Sunrise over tranquil backwaters. Disembark for Fort Kochi heritage walk and airport transfer.', stayLocation: 'Departure', mealsIncluded: 'Breakfast' },
    ],
  },
  {
    id: 2,
    title: 'Madurai, Rameswaram and Kanyakumari',
    slug: 'madurai-rameswaram-kanyakumari',
    subtitle: 'Sacred South India Corridor: Temple Gopurams, Pamban Sea Bridge & Lands End',
    overview: 'A grand cultural and spiritual expedition traversing Tamil Nadus most sacred heritage landmarks. Marvel at Meenakshi Amman Temple in Madurai, cross the Pamban Sea Bridge into holy Rameswaram, and behold the sunrise at Kanyakumari.',
    destination: { id: 6, name: 'South India Heritage' },
    durationDays: 5,
    durationNights: 4,
    theme: 'Heritage & Spiritual Odyssey',
    status: 'DRAFT',
    featured: false,
    inclusions: 'Air-conditioned private sedan with experienced chauffeur; 1 Night in Madurai; 2 Nights in Rameswaram; 1 Night in Kanyakumari; Daily breakfast; Pamban Bridge sightseeing and Dhanushkodi ghost town excursion.',
    exclusions: 'Temple special darshan passes; Lunch and dinner; 5% GST.',
    hotelInformation: 'Madurai: Heritage Madurai\nRameswaram: Daiwik Hotels\nKanyakumari: Annai Resorts & Spa',
    termsAndConditions: 'Draft package subject to seasonal revision.',
    images: [
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', caption: 'Meenakshi Temple gopuram', primary: true },
    ],
    seasonalPrices: [
      { id: 4, seasonType: 'PEAK', pricePerPerson: 18750, childPricePerPerson: 8500, notes: 'Standard price: ₹18,750 per person' },
      { id: 5, seasonType: 'MONSOON', pricePerPerson: 15500, childPricePerPerson: 7200, notes: 'Monsoon season rate' },
      { id: 6, seasonType: 'OFF_SEASON', pricePerPerson: 14200, childPricePerPerson: 6500, notes: 'Off-season promotional rate' },
    ],
    itineraries: [
      { id: 7, dayNumber: 1, title: 'Arrival in Madurai & Meenakshi Temple', description: 'Pickup from Madurai Airport. Evening Aarti procession at Meenakshi Temple.', stayLocation: 'Madurai', mealsIncluded: 'Breakfast' },
      { id: 8, dayNumber: 2, title: 'Madurai to Rameswaram via Pamban Bridge', description: 'Cross scenic Pamban Bridge over the sea. Visit Ramanathaswamy Temple.', stayLocation: 'Rameswaram', mealsIncluded: 'Breakfast' },
      { id: 9, dayNumber: 3, title: 'Dhanushkodi Ghost City Excursion', description: 'Drive along narrow sand strip surrounded by the ocean to Ram Setu viewpoint.', stayLocation: 'Rameswaram', mealsIncluded: 'Breakfast' },
      { id: 10, dayNumber: 4, title: 'Rameswaram to Kanyakumari Sunset', description: 'Ferry ride to Vivekananda Rock Memorial. Sunset at Triveni Sangam.', stayLocation: 'Kanyakumari', mealsIncluded: 'Breakfast' },
      { id: 11, dayNumber: 5, title: 'Sunrise & Departure via Trivandrum', description: 'Sunrise over ocean confluence. Transfer to Trivandrum Airport.', stayLocation: 'Departure', mealsIncluded: 'Breakfast' },
    ],
  },
  {
    id: 3,
    title: 'Wayanad Rainforest, Treehouses & Wildlife Haven',
    slug: 'wayanad-rainforest-treehouses-wildlife',
    subtitle: 'Untamed Western Ghats: Luxury Treehouses, Ancient Edakkal Caves & Chembra Peak',
    overview: 'Immerse in the pristine wilderness of Wayanad. Sleep in private canopy treehouses surrounded by cardamom plantations, explore prehistoric Edakkal Caves, and take an open-top jeep safari in Muthanga.',
    destination: { id: 4, name: 'Wayanad' },
    durationDays: 4,
    durationNights: 3,
    theme: 'Eco-Luxury & Adventure',
    status: 'PUBLISHED',
    featured: true,
    inclusions: '3 Nights in luxury eco-treehouse villa; All plantation organic meals; Guided plantation walk; Muthanga wildlife safari.',
    exclusions: 'Flights; Personal expenses; 5% GST.',
    hotelInformation: 'Wayanad: Vythiri Village Resort / Pepper Trail Heritage Treehouses',
    termsAndConditions: 'Advance booking required for treehouse units.',
    images: [
      { id: 4, imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80', caption: 'Misty rainforests of Wayanad', primary: true },
    ],
    seasonalPrices: [
      { id: 7, seasonType: 'PEAK', pricePerPerson: 22000, childPricePerPerson: 9800, notes: 'Peak winter season' },
      { id: 8, seasonType: 'MONSOON', pricePerPerson: 17500, childPricePerPerson: 7800, notes: 'Monsoon special' },
      { id: 9, seasonType: 'OFF_SEASON', pricePerPerson: 15800, childPricePerPerson: 6900, notes: 'Summer retreat' },
    ],
    itineraries: [
      { id: 12, dayNumber: 1, title: 'Arrival at Calicut & Ascent to Wayanad', description: 'Scenic drive through 9 hairpin curves. Check in to secluded treehouse.', stayLocation: 'Wayanad', mealsIncluded: 'Dinner' },
      { id: 13, dayNumber: 2, title: 'Edakkal Caves & Soochipara Falls', description: 'Trek to prehistoric rock shelters and take a dip at tiered waterfalls.', stayLocation: 'Wayanad', mealsIncluded: 'Breakfast, Dinner' },
      { id: 14, dayNumber: 3, title: 'Muthanga Safari & Bamboo Rafting', description: 'Open-top jeep safari in Muthanga Sanctuary and bamboo rafting on Kuruva Island.', stayLocation: 'Wayanad', mealsIncluded: 'Breakfast, Dinner' },
      { id: 15, dayNumber: 4, title: 'Banasura Sagar Dam & Departure', description: 'Speedboat ride on earthen dam reservoir and drop-off at Calicut Airport.', stayLocation: 'Departure', mealsIncluded: 'Breakfast' },
    ],
  },
];

export const fallbackBlogs = [
  {
    id: 1,
    title: 'Navigating the Silent Waters: The Ultimate Guide to Alleppey Houseboats',
    slug: 'ultimate-guide-alleppey-houseboats',
    summary: 'Everything you need to know about chartering a private luxury houseboat through Keralas tranquil Vembanad waterways.',
    content: `Cruising along the backwaters of Alleppey (Alappuzha) in a traditional converted rice barge—locally termed a Kettuvallam—ranks among the world's most mesmerizing travel experiences. Handcrafted from Anjili wood and coconut coir without a single steel nail, these floating suites now boast air-conditioned master bedrooms, private sun decks, and dedicated onboard chefs who grill fresh Karimeen fish right before your eyes.\n\n### Choosing Between Day Cruise and Overnight Stays\nAn overnight voyage allows you to witness the enchanting hour when tourist boats moor and the backwaters return to their gentle rhythm: migratory ducks skim the water, church bells chime across canals, and starlight reflects on the mirror-like lagoon.\n\n### The Gastronomic Highlight\nFrom steaming appams with vegetable stew at sunrise to spicy coconut fish curry served on fresh plantain leaves, dining on the waters is unmatched.`,
    featuredImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    category: { name: 'Backwater Experiences', slug: 'backwater-experiences' },
    readTimeMinutes: 6,
    tags: 'Houseboat, Alleppey, Backwaters, Luxury',
    createdAt: '2026-10-25T10:00:00',
  },
  {
    id: 2,
    title: 'Secrets of Munnar: Tea Heritage, High Peaks & Shola Forests',
    slug: 'secrets-of-munnar-tea-heritage-peaks',
    summary: 'Unveiling the colonial history, hiking routes, and biodiversity hidden within Keralas emerald tea hills.',
    content: `Perched at an elevation of 1,600 meters in the Idukki district, Munnar is where three mountain streams—Mudrapuzha, Nallathanni, and Kundala—coalesce. While most visitors admire the manicured tea carpets from roadside viewpoints, true magic lies in the high-altitude Shola forests and mist-veiled trekking ridges.\n\n### The Rare Nilgiri Tahr\nAt Eravikulam National Park, endangered Nilgiri Tahrs graze peacefully along cliffs carpeted with wildflowers. Every twelve years, the mass blooming of Neelakurinji transforms these hills into an ocean of purplish-blue.\n\n### Artisanal Tea Tasting\nStep inside century-old processing factories where orthodox leaf tea is rolled and dried according to traditions established by early Scottish planters.`,
    featuredImageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    category: { name: 'Culture & Heritage', slug: 'culture-heritage' },
    readTimeMinutes: 5,
    tags: 'Munnar, Tea Gardens, Hiking, Nature',
    createdAt: '2026-10-20T14:30:00',
  },
];

export const fallbackEnquiries = [
  {
    id: 1,
    referenceNo: 'ENQ-2026-001',
    fullName: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98200 45678',
    destinationInterest: 'Kerala',
    preferredTravelDate: '2026-12-15',
    adultsCount: 2,
    childrenCount: 1,
    budget: 120000,
    specialRequirements: 'Family holiday, luxury houseboat, vegetarian food preferences.',
    dpdpConsent: true,
    source: 'WEBSITE',
    status: 'QUALIFIED',
    rawCustomerMessage: 'Hello, I want to visit Kerala in December for 6 days with my wife and child. My budget is 1.2 lakh.',
    createdAt: '2026-11-02T11:20:00',
    aiExtractionId: 1,
    extractedDestination: 'Kerala (Munnar & Alleppey)',
    extractedDurationDays: 6,
    extractedMonth: 'December',
    extractedAdults: 2,
    extractedChildren: 1,
    extractedBudget: 120000,
    confidenceScore: 98.5,
    matchingRationales: '1. Perfect Duration Match: 6 Days package matches requested 6 days exactly.\n2. Peak Season Pricing: For 2 Adults + 1 Child in December (Peak Season), total package cost is ₹32,500 × 2 + ₹14,500 = ₹79,500 + 5% GST (₹3,975) = ₹83,475, which sits comfortably within customer budget of ₹1,20,000.\n3. Destination alignment: Combines Munnar tea hills and luxury Alleppey houseboat.',
    suggestedPackageIds: '[1, 3]',
    aiGeneratedReplyDraft: `Dear Mr. Vikram Malhotra,\n\nGreetings from Kerala Luxury Escapes!\n\nThank you for reaching out to us. We would be delighted to host you, your wife, and your child for a magical 6-day holiday in Kerala this December.\n\nBased on your requested duration and preferences, our signature package "Munnar, Thekkady and Alleppey Houseboat" (6 Days / 5 Nights) is the ideal match. In December (Peak Season), the complete all-inclusive package for 2 Adults and 1 Child is ₹79,500 plus 5% GST (Total ₹83,475), leaving you with plenty of room within your ₹1,20,000 budget.\n\nKey highlights include:\n- 2 Nights in a luxury mountain retreat in Munnar\n- 1 Night in a spice plantation villa in Thekkady\n- 1 Night lakefront resort in Kumarakom\n- 1 Night exclusive private luxury houseboat cruise in Alleppey with all gourmet meals & pure vegetarian delicacies\n- Private air-conditioned chauffeur vehicle throughout\n\nWould you like us to generate a personalized PDF quotation with your preferred December travel dates?\n\nWarm regards,\nKerala Luxury Escapes Concierge Team`,
    aiReviewStatus: 'PENDING',
    assignedToName: 'Deepa Varma',
    assignedToId: 3,
    notes: [
      { id: 1, note: 'Spoke with Mr. Vikram. He prefers pure vegetarian food and valley view rooms.', authorName: 'Deepa Varma', createdAt: '2026-11-02T14:00:00' }
    ]
  },
  {
    id: 2,
    referenceNo: 'ENQ-2026-002',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@travelworld.co.uk',
    phone: '+44 7700 900123',
    destinationInterest: 'Munnar & Alleppey',
    preferredTravelDate: '2026-11-20',
    adultsCount: 2,
    childrenCount: 0,
    budget: 75000,
    specialRequirements: 'Anniversary trip, need scenic valley view rooms and candlelight dinner.',
    dpdpConsent: true,
    source: 'MANUAL_WHATSAPP',
    status: 'NEW',
    rawCustomerMessage: 'Hi, we are looking for a romantic 5-6 day Kerala trip in November. Focus on tea gardens and quiet backwaters.',
    createdAt: '2026-11-03T09:15:00',
    notes: []
  }
];

export const fallbackDashboardStats = {
  totalEnquiries: 2,
  newEnquiries: 1,
  confirmedBookings: 0,
  totalPackages: 3,
  publishedPackages: 2,
  draftPackages: 1,
  totalBlogs: 2,
  enquiriesByStatus: {
    NEW: 1,
    CONTACTED: 0,
    QUALIFIED: 1,
    QUOTATION_SENT: 0,
    CONFIRMED: 0,
    LOST: 0,
  },
  recentEnquiries: fallbackEnquiries,
  recentActivities: [
    { id: 1, userName: 'Aswathi Nair', action: 'USER_LOGIN', entityType: 'USER', entityId: 1, details: 'User logged in successfully', timestamp: '03-Nov 23:45' },
    { id: 2, userName: 'System', action: 'AI_ANALYSIS_EXECUTED', entityType: 'ENQUIRY', entityId: 1, details: 'Extracted attributes and matched 2 packages', timestamp: '02-Nov 11:21' }
  ]
};
