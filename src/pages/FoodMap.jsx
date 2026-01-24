import React, { useState, useMemo, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import ReactMarkdown from 'react-markdown'
import { Star, MapPin, Navigation, Search, Filter, X, Phone, Clock, UtensilsCrossed, Crosshair, Wind, CalendarCheck, Flame, Camera, Utensils, Coffee, Moon, Gift } from 'lucide-react'
import { foodPlaces, foodCategories } from '../data/places'
import { generateReviews } from '../data/reviews'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet Icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create colored icons using CSS filters
// Removed createColorIcon function as markers are no longer used on the map

const iconMap = {
  "Star": Star,
  "Flame": Flame,
  "Camera": Camera,
  "MapPin": MapPin,
  "Utensils": Utensils,
  "Coffee": Coffee,
  "Moon": Moon,
  "Gift": Gift,
  "UtensilsCrossed": UtensilsCrossed
};

const MapUpdater = ({ center, zoom }) => {
  const map = useMap()
  useEffect(() => {
    if (center) {
        map.flyTo(center, zoom || 16, { duration: 1.5 })
    }
  }, [center, zoom, map])
  return null
}

const FoodMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null) // Change initial state to null
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeArea, setActiveArea] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileListOpen, setIsMobileListOpen] = useState(true)
  const [userLocation, setUserLocation] = useState(null)

  // Get unique areas from foodPlaces
  const uniqueAreas = useMemo(() => {
    if (!foodPlaces) return [];
    const areas = new Set(foodPlaces.map(p => p.area));
    return Array.from(areas).sort();
  }, []);

  // Generate reviews for selected place
  const placeReviews = useMemo(() => {
    if (!selectedPlace) return [];
    return generateReviews(selectedPlace.id, selectedPlace.category, selectedPlace.name);
  }, [selectedPlace]);

  // Create category map for O(1) lookup
  const categoryMap = useMemo(() => {
    return foodCategories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {});
  }, []);

  // Set initial selected place safely
  useEffect(() => {
    if (foodPlaces && foodPlaces.length > 0 && !selectedPlace) {
        setSelectedPlace(foodPlaces[0])
    }
  }, [foodPlaces])

  const sanitizeDescription = (text) => {
    if (!text) return '';
    const sentences = text.split('。');
    const locationKeywords = [
      '位於',
      '就在',
      '緊鄰',
      '路口',
      '路上',
      '街上',
      '巷口',
      '巷弄',
      '對面',
      '旁邊',
      '附近',
      '老街',
      '沙灘',
      '海邊',
      '碼頭',
      '港口',
      '公園',
      '景點',
      '宮',
      '廟'
    ];
    const filtered = sentences.filter((raw) => {
      const s = raw.trim();
      if (!s) return false;
      if (locationKeywords.some((kw) => s.includes(kw))) return false;
      return true;
    });
    return filtered.join('。');
  };

  const buildLongDescription = (place) => {
    if (!place) return '';

    const cleanDesc = sanitizeDescription(place.desc || '');
    const parts = [];

    if (place.mustEat && place.mustEat.length > 0) {
      const foods = place.mustEat.join('、');
      parts.push(`必點推薦：${foods}，每一口都吃得到用料紮實與鮮明風味。`);
    }

    if (place.tags && place.tags.length > 0) {
      const tags = place.tags.slice(0, 2).join('、');
      parts.push(`整體氛圍偏向${tags}，適合慢慢品嚐，享受放鬆用餐時光。`);
    }

    if (!parts.length && cleanDesc) {
      parts.push(cleanDesc);
    }

    let full = parts.join('');

    if (full.length < 50) {
      full += '用料實在、口感層次豐富，是到澎湖時很值得安排的一站。';
    }

    if (full.length > 100) {
      full = full.slice(0, 100);
    }

    return full;
  };


  // Filter Logic
  const filteredPlaces = useMemo(() => {
    // 1. Get raw data (with fallback)
    const rawData = (foodPlaces && Array.isArray(foodPlaces)) ? foodPlaces : [];
    
    if (rawData.length === 0) {
        console.warn('FoodMap: No data available');
        return [];
    }

    // 2. Filter
    return rawData.filter(place => {
      if (!place) return false;
      if (place.hidden) return false;
      
      const matchesCategory = activeCategory === 'all' || place.category === activeCategory
      const matchesArea = activeArea === 'all' || place.area === activeArea
      const matchesSearch = (place.name && place.name.includes(searchQuery)) || 
                            (place.tags && place.tags.some(t => t.includes(searchQuery))) ||
                            (place.mustEat && place.mustEat.some(f => f.includes(searchQuery)))
      return matchesCategory && matchesSearch && matchesArea
    })
  }, [activeCategory, activeArea, searchQuery]) // Removed foodPlaces from dependency array as it is imported constant

  // Mobile toggle logic
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 768) setIsMobileListOpen(false);
        else setIsMobileListOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get User Location
  const handleLocateMe = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
                // Create a temporary "My Location" place object to center map
                // Note: We don't change selectedPlace to avoid showing the detail card for user location
            },
            () => alert("無法取得您的位置，請確認瀏覽器權限。")
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col md:flex-row h-screen overflow-hidden relative">
      
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden absolute top-24 left-4 z-[999] bg-white p-3 rounded-full shadow-lg text-slate-700 border border-slate-200"
        onClick={() => setIsMobileListOpen(!isMobileListOpen)}
      >
        {isMobileListOpen ? <X size={24} /> : <Filter size={24} />}
      </button>

      {/* Sidebar List */}
      <div className={`
        absolute md:relative inset-y-0 left-0 z-[900] md:z-10
        w-[85%] md:w-[420px] bg-white border-r border-slate-200 flex flex-col h-full shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out
        ${isMobileListOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-100 bg-white space-y-4 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="text-ocean-blue" /> 必吃名單，一鍵導航
            </h2>
            <p className="text-xs text-slate-500 mt-1">澎湖在地美食攻略</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="找海鮮、燒餅、仙人掌冰..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-blue/50 transition-all"
            />
          </div>

          {/* Area Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
             <button
                onClick={() => setActiveArea('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                activeArea === 'all' 
                    ? 'bg-slate-700 text-white border-slate-700' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
            >
                全區
            </button>
            {uniqueAreas.map(area => (
                <button
                    key={area}
                    onClick={() => setActiveArea(area)}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                    activeArea === area 
                        ? 'bg-ocean-blue text-white border-ocean-blue' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    {area}
                </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {foodCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                  activeCategory === cat.id 
                    ? `${cat.color} text-white border-transparent` 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Place List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          <p className="text-xs text-slate-400 font-bold mb-2 flex justify-between">
            <span>共 {filteredPlaces.length} 家精選</span>
            <span className="text-ocean-blue cursor-pointer hover:underline" onClick={() => setSelectedPlace(filteredPlaces[0])}>顯示最近</span>
          </p>
          {filteredPlaces.map(place => {
            if (!place || !place.id) return null;
            const IconComponent = iconMap[place.icon] || UtensilsCrossed;
            return (
            <div 
              key={place.id}
              onClick={() => {
                setSelectedPlace(place);
                if (window.innerWidth < 768) setIsMobileListOpen(false);
              }}
              className={`p-3 rounded-xl border bg-white transition-all cursor-pointer flex gap-3 hover:shadow-md group ${
                selectedPlace?.id === place.id 
                  ? 'border-ocean-blue ring-1 ring-ocean-blue shadow-md bg-blue-50/30' 
                  : 'border-slate-100'
              }`}
            >
              <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-200">
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
                  place.gradient || (
                    place.category === 'seafood' ? 'from-blue-100 to-cyan-200' :
                    place.category === 'snack' ? 'from-orange-100 to-yellow-200' :
                    place.category === 'dessert' ? 'from-pink-100 to-rose-200' :
                    'from-slate-100 to-slate-200'
                  )
                } transition-transform group-hover:scale-105`}>
                   <IconComponent className="text-white/50" size={32} />
                </div>
                <div className={`absolute top-1 left-1 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm ${categoryMap[place.category]?.color || 'bg-slate-500'}`}>
                    {categoryMap[place.category]?.name || place.category}
                </div>
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 truncate text-sm">{place.name}</h3>
                </div>
                
                <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className="flex items-center text-xs font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
                        {place.rating} <Star size={10} className="fill-orange-500 ml-0.5" />
                    </span>
                    <span className="text-xs text-slate-500">({place.reviews})</span>
                    <span className="text-xs text-slate-400 font-medium">· {place.price}</span>
                </div>

                <div className="mt-auto">
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mb-1 truncate">
                        <UtensilsCrossed size={10} /> 必吃: {place.mustEat.join('、')}
                    </p>
                    <div className="flex gap-1 overflow-hidden">
                        {place.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded whitespace-nowrap">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative h-full bg-slate-200">
        <MapContainer 
          center={[23.5695, 119.5665]} 
          zoom={15} 
          className="w-full h-full z-0"
        >
          {/* Use CartoDB Voyager for a cleaner, Google-Maps-like look */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <MapUpdater center={userLocation || (selectedPlace ? [selectedPlace.lat, selectedPlace.lng] : [23.5695, 119.5665])} zoom={16} />
          
          {/* User Location Marker */}
          {userLocation && (
             <Marker position={userLocation} icon={L.divIcon({
                 className: 'user-marker',
                 html: '<div style="width: 16px; height: 16px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 0 2px #3b82f6;"></div>',
                 iconSize: [16, 16]
             })}>
                 <Popup>您的位置</Popup>
             </Marker>
          )}

          {/* Place markers removed as per request for clean map */}
        </MapContainer>

        {/* Locate Me Button */}
        <button 
            onClick={handleLocateMe}
            className="absolute bottom-6 right-4 md:right-6 md:bottom-8 z-[800] bg-white p-3 rounded-full shadow-lg text-slate-700 hover:bg-slate-50 border border-slate-200"
            title="定位我的位置"
        >
            <Crosshair size={24} />
        </button>

        {/* Floating Detail Card */}
        {selectedPlace && (
          <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-6 md:top-6 md:bottom-auto md:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl z-[800] border border-slate-200 flex flex-col max-h-[50vh] md:max-h-[85vh] overflow-hidden transition-all duration-300">
            {/* Card Header Image */}
            <div className="relative h-32 md:h-48 bg-slate-200 shrink-0">
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
                  selectedPlace.gradient || (
                    selectedPlace.category === 'seafood' ? 'from-blue-100 to-cyan-200' :
                    selectedPlace.category === 'snack' ? 'from-orange-100 to-yellow-200' :
                    selectedPlace.category === 'dessert' ? 'from-pink-100 to-rose-200' :
                    'from-slate-100 to-slate-200'
                  )
                }`}>
                   {React.createElement(iconMap[selectedPlace.icon] || UtensilsCrossed, { className: "text-white/50", size: 64 })}
                </div>
                <button 
                    onClick={() => setSelectedPlace(null)} 
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 md:hidden"
                >
                    <X size={16} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{selectedPlace.name}</h2>
                    <div className="flex items-center gap-2 text-white/90 text-xs mt-1">
                        <span className="bg-orange-500 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                            {selectedPlace.rating} <Star size={10} className="fill-white" />
                        </span>
                        <span>({selectedPlace.reviews} 評論)</span>
                        <span>•</span>
                        <span>{categoryMap[selectedPlace.category]?.name || selectedPlace.category}</span>
                    </div>
                </div>
            </div>

            {/* Card Content (Scrollable) */}
            <div className="p-5 overflow-y-auto custom-scrollbar">
                {/* Info Row */}
                <div className="flex flex-col gap-2 text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-start gap-2">
                         <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.name}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 bg-ocean-blue text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors w-full justify-center mb-1"
                        >
                            <Navigation size={14} /> Google Maps 精準導航
                        </a>
                    </div>
                    
                    {/* Service Tags */}
                    {(selectedPlace.service?.air_con || selectedPlace.service?.reservation) && (
                        <div className="flex items-center gap-3 py-1 border-b border-slate-200 mb-1">
                             {selectedPlace.service.air_con && (
                                <span className="flex items-center gap-1 text-xs text-slate-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                    <Wind size={12} className="text-blue-500" /> 冷氣開放
                                </span>
                             )}
                             {selectedPlace.service.reservation && (
                                <span className="flex items-center gap-1 text-xs text-slate-600 bg-green-100 px-2 py-0.5 rounded-full">
                                    <CalendarCheck size={12} className="text-green-600" /> 建議訂位
                                </span>
                             )}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-ocean-blue shrink-0" />
                        <span className="text-green-600 font-bold">{selectedPlace.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-ocean-blue shrink-0" />
                        <span>{selectedPlace.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-ocean-blue shrink-0" />
                        <span>{selectedPlace.address}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPlace.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-ocean-blue bg-blue-50 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
                
                {/* Description */}
                <div className="prose prose-sm prose-slate mb-6">
                   <ReactMarkdown>{buildLongDescription(selectedPlace)}</ReactMarkdown>
                </div>

                {/* Must Eat */}
                <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1">
                        <UtensilsCrossed size={16} className="text-orange-500" /> 必點推薦
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedPlace.mustEat.map(food => (
                            <span key={food} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">
                                {food}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action (Removed as per request, moved to address location) */}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodMap
