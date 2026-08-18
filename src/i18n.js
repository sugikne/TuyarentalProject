import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navbar & Nav
      "nav_home": "Home",
      "nav_packages": "Packages",
      "nav_rental": "Rental",
      "nav_blog": "Blog",
      "nav_about": "About",
      "nav_contact": "Contact",
      "nav_book": "Book Trip Now",

      // Hero
      "hero_tag": "PREMIUM ISLAND ADVENTURE",
      "hero_title": "Explore Nusa Penida By Car & Motorbike",
      "hero_desc": "Experience hidden beaches, limestone cliffs, and turquoise waters with our private AC cars or premium scooter fleet.",
      "hero_cta": "View All Packages",

      // Packages Page
      "pkg_tag": "TRANSPORTATION & TOUR OPTIONS",
      "pkg_title": "Nusa Penida Tours & Rentals",
      "pkg_subtitle": "Select your ideal trip: Private AC Car Tour, Guided Motorbike Ride, or Independent Daily Rental.",
      "tab_all_services": "All Services",
      "tab_car_package": "Car Package",
      "tab_motor_package": "Motorbike Package",
      "tab_scooter_rental": "Scooter Rental",
      "tab_all_destinations": "All Destinations",
      "showing_results": "Showing {{count}} options",
      "book_trip": "Book Trip",
      "rent_bike": "Rent Bike",
      "price_package": "Package Price",
      "price_per_day": "Price / Day",
      "route_details": "Route Details",
      "car_tour_badge": "Car Package",
      "motor_tour_badge": "Motorbike Package",
      "rental_badge": "Scooter Rental",
      "reset_filters": "Reset Filters",
      "no_results": "No options found",
      "no_results_desc": "Try adjusting your vehicle or destination filter.",

      // Rental Page
      "rental_tag": "Independent Scooter Rental",
      "rental_title": "Daily Motorbike Rental",
      "rental_subtitle": "Top-quality scooters for independent Nusa Penida exploration. Includes SNI helmets, raincoats, and 24/7 roadside assist.",
      "rent_this_bike": "Rent This Bike",
      "per_day": "/ day",
      "rental_req_title": "Rental Requirements",
      "rental_req_desc": "Please make sure you have the following ready before booking your rental.",
      "valid_license": "Valid License",
      "valid_license_desc": "International or local motorcycle license required.",
      "id_verification": "ID Verification",
      "id_verification_desc": "We require a copy of your passport or ID card.",
      "safety_first": "Safety First",
      "safety_first_desc": "Always wear a helmet. Riding in Penida requires focus.",
      "deposit": "Deposit",
      "deposit_desc": "A small refundable security deposit is needed.",

      // Home Page Sections
      "why_us_title": "Why Travel With Us?",
      "safety_title": "Safety First",
      "safety_desc": "Premium helmets & pristine vehicle fleet",
      "hidden_title": "Hidden Gems",
      "hidden_desc": "Guides who know secret cliffs & photo spots",
      "popular_tours": "Popular Car & Motor Tours",
      "view_all": "View All Packages",
      "fleet_title": "Motor Rental Fleet",
      "explore_fleet": "Explore Full Fleet",

      // Package Detail
      "duration": "Duration",
      "destinations": "Destinations",
      "rating": "Rating",
      "plan_highlights": "Plan Highlights",
      "trip_itinerary": "Trip Itinerary",
      "whats_included": "What's Included",
      "price_per_adult": "Price per adult",
      "all_inclusive": "All-inclusive",
      "book_now": "Book Now",
      "back_to_packages": "Back to all packages",
      "free_cancel": "Free cancellation up to 24 hours before your trip starts.",

      // About Page
      "about_story_tag": "OUR STORY",
      "about_title": "Empowering Your Nusa Penida Adventure",
      "about_p1": "Founded in 2018, Nusa Penida Motor Trip started with a simple mission: to provide travelers with the freedom to explore the island's most breathtaking spots safely and affordably.",
      "about_p2": "What began with a fleet of 5 scooters has grown into the island's premier motor trip service, known for our local expertise and commitment to unforgettable visitor experiences.",
      "happy_adventurers": "Happy Adventurers",
      "mission_title": "Our Mission",
      "mission_desc": "To make Nusa Penida's beauty accessible to everyone through safe motor tours.",
      "passion_title": "Passion",
      "passion_desc": "We love our island and we love sharing its secrets with you.",
      "quality_title": "Quality",
      "quality_desc": "From our bikes to our guides, we never compromise on quality.",
      "community_title": "Community",
      "community_desc": "We support local families and preserve our environment.",

      // Blog Page
      "blog_title": "Travel Blog",
      "blog_subtitle": "Insights, guides, and stories from the heart of Nusa Penida.",
      "blog_sub_title": "Get Insider Tips",
      "blog_sub_desc": "Subscribe to our newsletter for hidden gems and exclusive offers delivered to your inbox.",
      "subscribe": "Subscribe",
      "email_placeholder": "Your email address",

      // Contact Page
      "contact_title": "Get in Touch",
      "contact_subtitle": "Have questions about our packages or rentals? We're here to help you plan the perfect trip.",
      "phone_wa": "Phone / WhatsApp",
      "email_lbl": "Email",
      "location_lbl": "Location",
      "send_msg_title": "Send us a message",
      "full_name": "Full Name",
      "subject": "Subject",
      "message": "Message",
      "send_btn": "Send Message",

      // Booking Success
      "trip_confirmed": "Trip Confirmed!",
      "ready_adv": "Get ready for an unforgettable adventure in Nusa Penida.",
      "booking_ref": "Booking Reference",
      "travel_date": "Travel Date",
      "meeting_point": "Meeting Point",
      "whats_next": "What's Next?",
      "step1": "Check your email for full itinerary",
      "step2": "We'll contact you via WhatsApp shortly",
      "step3": "No payment needed until arrival",
      "step4": "Present booking ID at the meeting point",
      "back_to_home": "Back to Home",
      "need_changes": "Need to make changes? Call us at",

      // Footer
      "footer_desc": "Your trusted partner for exploring the hidden gems of Nusa Penida. Quality motorbikes, AC cars, and professional local guides for an unforgettable adventure.",
      "nav_header": "Navigation",
      "support_header": "Support",
      "contact_header": "Contact Info",
      "booking_guide": "Booking Guide",
      "terms": "Terms & Conditions",
      "privacy": "Privacy Policy",
      "faq": "FAQ",
      "accepted_payments": "ACCEPTED PAYMENTS"
    }
  },
  id: {
    translation: {
      // Navbar & Nav
      "nav_home": "Beranda",
      "nav_packages": "Paket Tour",
      "nav_rental": "Sewa Motor",
      "nav_blog": "Blog",
      "nav_about": "Tentang",
      "nav_contact": "Kontak",
      "nav_book": "Pesan Sekarang",

      // Hero
      "hero_tag": "PETUALANGAN PULAU PREMIUM",
      "hero_title": "Jelajahi Nusa Penida Dengan Mobil & Motor",
      "hero_desc": "Nikmati pantai tersembunyi, tebing megah, dan laut biru dengan Mobil AC Private atau Armada Motor Matic kami.",
      "hero_cta": "Lihat Semua Paket",

      // Packages Page
      "pkg_tag": "PILIHAN TRANSPORTASI & PAKET",
      "pkg_title": "Tour & Rental Nusa Penida",
      "pkg_subtitle": "Pilih kenyamanan liburan Anda: Paket Tour Mobil AC Private, Paket Riding Motor, atau Sewa Motor Harian.",
      "tab_all_services": "Semua Layanan",
      "tab_car_package": "Paket Mobil",
      "tab_motor_package": "Paket Motor",
      "tab_scooter_rental": "Sewa Motor",
      "tab_all_destinations": "Semua Destinasi",
      "showing_results": "Menampilkan {{count}} pilihan",
      "book_trip": "Pesan Tour",
      "rent_bike": "Sewa Motor",
      "price_package": "Harga Paket",
      "price_per_day": "Harga / Hari",
      "route_details": "Detail Rute",
      "car_tour_badge": "Paket Tour Mobil",
      "motor_tour_badge": "Paket Tour Motor",
      "rental_badge": "Penyewaan Motor",
      "reset_filters": "Reset Filter",
      "no_results": "Tidak ada hasil ditemukan",
      "no_results_desc": "Coba ganti filter atau pilih opsi kendaraan lain.",

      // Rental Page
      "rental_tag": "SEWA MOTOR MANDIRI",
      "rental_title": "Penyewaan Motor Harian",
      "rental_subtitle": "Motor matic berkondisi prima untuk eksplorasi Nusa Penida secara mandiri. Sudah termasuk helm SNI, jas hujan, dan bantuan darurat 24 jam.",
      "rent_this_bike": "Sewa Motor Ini",
      "per_day": "/ hari",
      "rental_req_title": "Persyaratan Sewa",
      "rental_req_desc": "Pastikan Anda menyiapkan dokumen berikut sebelum memesan sewa motor.",
      "valid_license": "SIM Valid",
      "valid_license_desc": "SIM C Indonesia atau SIM Internasional.",
      "id_verification": "Verifikasi Identitas",
      "id_verification_desc": "Kami memerlukan salinan KTP atau Paspor Anda.",
      "safety_first": "Utamakan Keselamatan",
      "safety_first_desc": "Gunakan helm selalu. Jalanan di Penida membutuhkan fokus.",
      "deposit": "Deposit",
      "deposit_desc": "Deposit jaminan kecil yang dapat dikembalikan.",

      // Home Page Sections
      "why_us_title": "Mengapa Memilih Kami?",
      "safety_title": "Utamakan Keselamatan",
      "safety_desc": "Helm SNI & armada kendaraan selalu terawat",
      "hidden_title": "Spot Tersembunyi",
      "hidden_desc": "Pemandu lokal paham tebing & spot foto terbaik",
      "popular_tours": "Tour Mobil & Motor Populer",
      "view_all": "Lihat Semua Paket",
      "fleet_title": "Armada Sewa Motor",
      "explore_fleet": "Lihat Semua Armada",

      // Package Detail
      "duration": "Durasi",
      "destinations": "Destinasi",
      "rating": "Rating",
      "plan_highlights": "Keunggulan Paket Ini",
      "trip_itinerary": "Rencana Perjalanan",
      "whats_included": "Fasilitas Termasuk",
      "price_per_adult": "Harga per orang",
      "all_inclusive": "Serba ada",
      "book_now": "Pesan Sekarang",
      "back_to_packages": "Kembali ke semua paket",
      "free_cancel": "Bebas pembatalan hingga 24 jam sebelum perjalanan.",

      // About Page
      "about_story_tag": "CERITA KAMI",
      "about_title": "Mewujudkan Petualangan Nusa Penida Anda",
      "about_p1": "Didirikan pada tahun 2018, Nusa Penida Motor Trip bermula dengan misi sederhana: memberikan kebebasan bagi wisatawan untuk menjelajahi keindahan pulau dengan aman dan terjangkau.",
      "about_p2": "Berawal dari 5 unit motor, kini berkembang menjadi layanan perjalanan terdepan di Nusa Penida yang dikenal dengan keramahan lokal dan komitmen pada pengalaman wisatawan.",
      "happy_adventurers": "Wisatawan Puas",
      "mission_title": "Misi Kami",
      "mission_desc": "Membuat keindahan Nusa Penida dapat dinikmati semua orang melalui tour aman.",
      "passion_title": "Dedikasi",
      "passion_desc": "Kami mencintai pulau ini dan senang berbagi keindahannya dengan Anda.",
      "quality_title": "Kualitas",
      "quality_desc": "Dari armada kendaraan hingga pemandu, kami selalu menjaga kualitas terbaik.",
      "community_title": "Komunitas",
      "community_desc": "Kami mendukung keluarga lokal dan menjaga kelestarian lingkungan.",

      // Blog Page
      "blog_title": "Blog Perjalanan",
      "blog_subtitle": "Panduan, wawasan, dan cerita menarik dari Nusa Penida.",
      "blog_sub_title": "Dapatkan Tips Terbaik",
      "blog_sub_desc": "Berlangganan buletin kami untuk info spot tersembunyi dan penawaran eksklusif.",
      "subscribe": "Berlangganan",
      "email_placeholder": "Alamat email Anda",

      // Contact Page
      "contact_title": "Hubungi Kami",
      "contact_subtitle": "Ada pertanyaan tentang paket tour atau sewa motor? Kami siap membantu merencanakan liburan Anda.",
      "phone_wa": "Telepon / WhatsApp",
      "email_lbl": "Email",
      "location_lbl": "Lokasi",
      "send_msg_title": "Kirim Pesan",
      "full_name": "Nama Lengkap",
      "subject": "Subjek",
      "message": "Pesan",
      "send_btn": "Kirim Pesan",

      // Booking Success
      "trip_confirmed": "Pesanan Dikonfirmasi!",
      "ready_adv": "Bersiaplah untuk petualangan seru di Nusa Penida.",
      "booking_ref": "Referensi Pemesanan",
      "travel_date": "Tanggal Perjalanan",
      "meeting_point": "Titik Kumpul",
      "whats_next": "Langkah Selanjutnya",
      "step1": "Periksa email Anda untuk rincian jadwal",
      "step2": "Kami akan segera menghubungi via WhatsApp",
      "step3": "Tidak perlu pembayaran hingga tiba di lokasi",
      "step4": "Tunjukkan ID pemesanan saat di titik kumpul",
      "back_to_home": "Kembali ke Beranda",
      "need_changes": "Perlu perubahan? Hubungi kami di",

      // Footer
      "footer_desc": "Mitra terpercaya untuk menjelajahi keindahan Nusa Penida. Armada motor & mobil AC prima dengan pemandu lokal profesional.",
      "nav_header": "Navigasi",
      "support_header": "Bantuan",
      "contact_header": "Info Kontak",
      "booking_guide": "Panduan Pemesanan",
      "terms": "Syarat & Ketentuan",
      "privacy": "Kebijakan Privasi",
      "faq": "FAQ",
      "accepted_payments": "PEMBAYARAN DITERIMA"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
