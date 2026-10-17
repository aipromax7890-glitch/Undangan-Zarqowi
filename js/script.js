/**
 * Modern Betawi Luxury Wedding Editorial 2026
 * The Wedding of Wahyu Zarqowi & Jennian Nayla (Naylun)
 * Vanilla JavaScript Engine
 * Designed & Developed by Haddad Al Farisi
 */

(function () {
  'use strict';

  // 1. Data Configuration & Official Records
  const WEDDING_CONFIG = {
    groom: {
      fullName: "Wahyu Zarqowi",
      callName: "Wahyu",
      parents: "Kel. (Alm) Bpk. Suhanda & (Almh) Ibu Ustadzah Umi Sanati"
    },
    bride: {
      fullName: "Jennian Nayla",
      callName: "Naylun",
      parents: "Kel. (Alm) Bpk. Ikhsan Bakhtiar & Ibu Ayu Lestari Suprihatin"
    },
    event: {
      dateISO: "2026-10-25T08:00:00+07:00",
      dateFormatted: "Minggu, 25 Oktober 2026",
      time: "Pukul 08.00 WIB s/d Selesai",
      locationName: "Kediaman Mempelai Wanita",
      address: "Kp. Ketapang Dongkal RT.002 RW.004, Jl. Guru Muhammad, Kel. Poris Indah, Cipondoh, Kota Tangerang",
      googleMapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Kp.+Ketapang+Dongkal+RT.002+RW.004,+Jl.+Guru+Muhammad,+Kel.+Poris+Indah,+Cipondoh,+Kota+Tangerang",
      whatsappNumber: "6281234567890" // Placeholder nomor konfirmasi mempelai
    },
    bankAccounts: [
      {
        bank: "BCA",
        accountNumber: "6825 0918 22",
        accountHolder: "Wahyu Zarqowi",
        note: "Rekening Mempelai Pria (Placeholder Resmi)"
      },
      {
        bank: "BNI",
        accountNumber: "0841 9283 11",
        accountHolder: "Jennian Nayla",
        note: "Rekening Mempelai Wanita (Placeholder Resmi)"
      }
    ]
  };

  // 2. URL Parameters Parsing (Dynamic Guest Name)
  function initGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('p') || urlParams.get('nama');
    const guestElements = document.querySelectorAll('.dynamic-guest-name');
    
    const guestName = guestNameParam ? decodeURIComponent(guestNameParam.replace(/\+/g, ' ')).trim() : 'Bapak/Ibu/Saudara/i';
    guestElements.forEach(el => {
      el.textContent = guestName;
    });

    const rsvpNameInput = document.getElementById('rsvpName');
    if (rsvpNameInput && guestNameParam) {
      rsvpNameInput.value = guestName;
    }
  }

  // 3. Audio Player & Web Audio API Zaujati Melodic Synthesizer
  let audioContext = null;
  let isWebAudioPlaying = false;
  let webAudioTimer = null;
  let isAudioPlaying = false;
  const audioElem = document.getElementById('weddingAudio');
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicWidget = document.getElementById('floatingMusicWidget');

  // Zaujati Melody Notes (Frequencies in Hz) for peaceful acoustic gambus/chime fallback
  // Melodi tema: Uhibbuki mitsla maa anti (C4, D4, E4, F4, G4, A4, B4...)
  const zaujatiMelody = [
    { freq: 261.63, dur: 0.5 }, // C4
    { freq: 293.66, dur: 0.5 }, // D4
    { freq: 329.63, dur: 0.8 }, // E4
    { freq: 293.66, dur: 0.4 }, // D4
    { freq: 261.63, dur: 0.6 }, // C4
    { freq: 246.94, dur: 0.8 }, // B3
    { freq: 220.00, dur: 0.8 }, // A3
    { freq: 246.94, dur: 0.5 }, // B3
    { freq: 261.63, dur: 0.8 }, // C4
    { freq: 293.66, dur: 0.8 }, // D4
    { freq: 261.63, dur: 1.2 }, // C4
    { freq: 0,      dur: 0.4 }, // rest
    { freq: 329.63, dur: 0.5 }, // E4
    { freq: 349.23, dur: 0.5 }, // F4
    { freq: 392.00, dur: 0.9 }, // G4
    { freq: 349.23, dur: 0.4 }, // F4
    { freq: 329.63, dur: 0.6 }, // E4
    { freq: 293.66, dur: 0.9 }, // D4
    { freq: 261.63, dur: 1.4 }, // C4
    { freq: 0,      dur: 0.6 }  // rest
  ];

  function playZaujatiSynthNote(freq, duration) {
    if (!audioContext || freq === 0) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      // Warm, acoustic soft sine-triangle tone reminiscent of traditional lute/gambus
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn("Synth note error:", e);
    }
  }

  function startZaujatiSynthLoop() {
    if (isWebAudioPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) {
        audioContext = new AudioContextClass();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      isWebAudioPlaying = true;
      let noteIndex = 0;

      function step() {
        if (!isWebAudioPlaying) return;
        const currentNote = zaujatiMelody[noteIndex];
        playZaujatiSynthNote(currentNote.freq, currentNote.dur);
        noteIndex = (noteIndex + 1) % zaujatiMelody.length;
        webAudioTimer = setTimeout(step, currentNote.dur * 1000);
      }
      step();
    } catch (err) {
      console.warn("Web Audio not available:", err);
    }
  }

  function stopZaujatiSynth() {
    isWebAudioPlaying = false;
    if (webAudioTimer) {
      clearTimeout(webAudioTimer);
      webAudioTimer = null;
    }
  }

  function toggleMusic() {
    if (isAudioPlaying) {
      // Pause
      if (audioElem && !audioElem.paused) {
        audioElem.pause();
      }
      stopZaujatiSynth();
      isAudioPlaying = false;
      if (musicBtn) {
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('title', 'Putar Musik Zaujati');
        musicBtn.innerHTML = '<i class="bi bi-disc"></i>';
      }
      showToast('Musik dijeda');
    } else {
      // Play
      let audioPromise = null;
      if (audioElem) {
        audioPromise = audioElem.play();
      }

      if (audioPromise !== null && typeof audioPromise.catch === 'function') {
        audioPromise.then(() => {
          isAudioPlaying = true;
          updateMusicBtnState(true);
        }).catch(() => {
          // Fallback to peaceful Web Audio API synthesis
          startZaujatiSynthLoop();
          isAudioPlaying = true;
          updateMusicBtnState(true);
        });
      } else {
        startZaujatiSynthLoop();
        isAudioPlaying = true;
        updateMusicBtnState(true);
      }
    }
  }

  function updateMusicBtnState(playing) {
    if (!musicBtn) return;
    if (playing) {
      musicBtn.classList.add('playing');
      musicBtn.setAttribute('title', 'Jeda Musik Zaujati');
      musicBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('title', 'Putar Musik Zaujati');
      musicBtn.innerHTML = '<i class="bi bi-disc"></i>';
    }
  }

  // 4. Invitation Cover Gate Opening
  function openInvitation() {
    const cover = document.getElementById('invitationCover');
    const bottomNav = document.getElementById('bottomNavBar');
    
    if (cover) {
      cover.classList.add('opened');
      document.body.classList.remove('cover-active');
      
      // Show floating navigation & music button
      if (musicWidget) musicWidget.style.display = 'block';
      if (bottomNav) bottomNav.style.display = 'flex';

      // Start music automatically on user intent
      toggleMusic();

      // Smooth scroll to top of main content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // 5. Countdown Timer (Target: 25 Oktober 2026 08:00 WIB)
  function initCountdown() {
    const targetDate = new Date("2026-10-25T08:00:00+07:00").getTime();
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // 6. Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('weddingToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'weddingToast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 7. Clipboard Copy Helper
  window.copyToClipboard = function (text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'Berhasil disalin ke clipboard!');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'Berhasil disalin ke clipboard!');
    } catch (err) {
      showToast('Gagal menyalin teks');
    }
    document.body.removeChild(textArea);
  }

  // 8. Add to Calendar (Google Calendar & .ICS file download)
  window.addToGoogleCalendar = function () {
    const title = encodeURIComponent("Pernikahan Wahyu Zarqowi & Jennian Nayla (Naylun)");
    const details = encodeURIComponent("Akad & Resepsi Pernikahan Wahyu & Naylun. Bertempat di Kediaman Mempelai Wanita.");
    const location = encodeURIComponent(WEDDING_CONFIG.event.address);
    // 25 Okt 2026 08:00 WIB (01:00 UTC) s.d 15:00 WIB (08:00 UTC)
    const dates = "20261025T010000Z/20261025T080000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  window.downloadIcsCalendar = function () {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Haddad Al Farisi//The Wedding of Wahyu and Naylun//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:wedding-wahyu-naylun-20261025@haddadalfarisi.dev",
      "DTSTAMP:20261013T000000Z",
      "DTSTART:20261025T010000Z",
      "DTEND:20261025T080000Z",
      "SUMMARY:The Wedding of Wahyu Zarqowi & Jennian Nayla (Naylun)",
      "DESCRIPTION:Akad Nikah dan Resepsi Pernikahan Wahyu & Naylun. Minggu, 25 Oktober 2026, Pukul 08.00 WIB s/d Selesai.",
      "LOCATION:Kp. Ketapang Dongkal RT.002 RW.004\\, Jl. Guru Muhammad\\, Kel. Poris Indah\\, Cipondoh\\, Kota Tangerang",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "undangan-wahyu-naylun.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('File kalender (.ics) berhasil diunduh!');
  };

  // 9. Lightbox Photo Gallery
  const galleryImages = [
  {
    src: "./images/reja5.jpg",
    caption: "Potret Kehangatan Mempelai - Sentuhan Klasik Modern Betawi"
  },
  {
    src: "./images/reja6.jpg",
    caption: "Janji Suci Dua Jiwa dalam Naungan Restu Keluarga Tercinta"
  },
  {
    src: "./images/reja1.jpg",
    caption: "Kemegahan Ornamen Tradisi Berpadu Harmoni Kemewahan Abadi"
  },
  {
    src: "./images/reja2.jpg",
    caption: "Langkah Menuju Hari Bahagia - 25 Oktober 2026"
  },
  {
    src: "./images/reja3.jpg",
    caption: "Momen Silaturahmi Hangat Penuh Kasih & Keberkahan"
  },
  {
    src: "./images/reja7.jpg",
    caption: "Ikrar Abadi Menuju Mahligai Rumah Tangga Sakinah Mawaddah Warahmah"
  }
];

  let currentGalleryIndex = 0;
  const lightboxModal = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  window.openLightbox = function (index) {
    if (!lightboxModal || !lightboxImg) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.nextLightbox = function () {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateLightboxContent();
  };

  window.prevLightbox = function () {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
  };

  function updateLightboxContent() {
    const item = galleryImages[currentGalleryIndex];
    if (lightboxImg && item) {
      lightboxImg.src = item.src;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
    }
  }

  // 10. RSVP Form & Live LocalStorage Guestbook
  const DEFAULT_GUESTBOOK = [
    {
      name: "Kel. Besar Pondok Pesantren Mamba'ul Ulum",
      status: "hadir",
      message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Semoga ananda Wahyu & Naylun senantiasa dilimpahi keberkahan rumah tangga yang sakinah.",
      time: "Hari ini"
    },
    {
      name: "KH. Dumiyati (Tokoh Masyarakat Ketapang Dongkal)",
      status: "hadir",
      message: "Selamat untuk kedua mempelai dan keluarga besar. Insya Allah kami turut hadir mendoakan langsung di Ketapang Dongkal.",
      time: "Kemarin"
    },
    {
      name: "Kel. Besar Kong Haji Nurhasan",
      status: "hadir",
      message: "Alhamdulillah, selamat berbahagia untuk Wahyu dan Naylun. Semoga rukun dan berkah sepanjang masa.",
      time: "2 hari lalu"
    }
  ];

  function getGuestbookWishes() {
    try {
      const stored = localStorage.getItem('wedding_wishes_wahyu_naylun');
      return stored ? JSON.parse(stored) : DEFAULT_GUESTBOOK;
    } catch (e) {
      return DEFAULT_GUESTBOOK;
    }
  }

  function saveGuestbookWishes(wishes) {
    try {
      localStorage.setItem('wedding_wishes_wahyu_naylun', JSON.stringify(wishes));
    } catch (e) {
      console.warn("Storage full or disabled");
    }
  }

  function renderGuestbook() {
    const container = document.getElementById('guestbookFeed');
    if (!container) return;
    const wishes = getGuestbookWishes();
    
    container.innerHTML = wishes.map(wish => {
      let badgeClass = 'guest-badge-hadir';
      let badgeText = 'Akan Hadir';
      if (wish.status === 'ragu') {
        badgeClass = 'guest-badge-ragu';
        badgeText = 'Masih Ragu';
      } else if (wish.status === 'absen') {
        badgeClass = 'guest-badge-absen';
        badgeText = 'Berhalangan';
      }

      return `
        <div class="guestbook-card">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0 font-serif fw-bold text-dark">${escapeHtml(wish.name)}</h6>
            <span class="${badgeClass}">${badgeText}</span>
          </div>
          <p class="mb-1 text-muted small fst-italic">"${escapeHtml(wish.message)}"</p>
          <div class="text-end text-muted" style="font-size: 0.72rem;">${escapeHtml(wish.time)}</div>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m];
    });
  }

  function handleRsvpSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('rsvpName');
    const statusInput = document.querySelector('input[name="rsvpStatus"]:checked');
    const countInput = document.getElementById('rsvpCount');
    const messageInput = document.getElementById('rsvpMessage');

    const name = nameInput ? nameInput.value.trim() : '';
    const status = statusInput ? statusInput.value : 'hadir';
    const count = countInput ? countInput.value : '1';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !message) {
      showToast('Mohon isi nama dan ucapan doa Anda.');
      return;
    }

    // Save to LocalStorage
    const currentWishes = getGuestbookWishes();
    currentWishes.unshift({
      name: name,
      status: status,
      message: message,
      time: 'Baru saja'
    });
    saveGuestbookWishes(currentWishes);
    renderGuestbook();

    showToast('Terima kasih! Ucapan & doa berhasil dikirim.');

    // Reset Form
    if (messageInput) messageInput.value = '';

    // Scroll to Guestbook Wall gently
    const feed = document.getElementById('guestbookFeed');
    if (feed) {
      feed.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  window.sendRsvpViaWhatsApp = function () {
    const nameInput = document.getElementById('rsvpName');
    const statusInput = document.querySelector('input[name="rsvpStatus"]:checked');
    const countInput = document.getElementById('rsvpCount');
    const messageInput = document.getElementById('rsvpMessage');

    const name = nameInput ? nameInput.value.trim() : 'Tamu Undangan';
    const status = statusInput ? (statusInput.value === 'hadir' ? 'Hadir' : (statusInput.value === 'ragu' ? 'Masih Ragu-ragu' : 'Belum Bisa Hadir')) : 'Hadir';
    const count = countInput ? countInput.value : '1';
    const message = messageInput ? messageInput.value.trim() : 'Barakallahu lakuma.';

    const text = `Halo Wahyu & Naylun,\n\nSaya ingin mengonfirmasi kehadiran untuk Pernikahan Wahyu Zarqowi & Jennian Nayla:\n\n*Nama:* ${name}\n*Konfirmasi:* ${status}\n*Jumlah Tamu:* ${count} orang\n*Pesan & Doa:* ${message}\n\nTerima kasih.`;
    const waUrl = `https://api.whatsapp.com/send?phone=${WEDDING_CONFIG.event.whatsappNumber}&text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // 11. Scrollspy for Floating Navigation & Back to Top Button
  function initScrollHelpers() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    const navLinks = document.querySelectorAll('.nav-dock-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      // Back to top button visibility
      if (backToTopBtn) {
        if (scrollY > 500) {
          backToTopBtn.style.display = 'flex';
        } else {
          backToTopBtn.style.display = 'none';
        }
      }

      // Active state in bottom dock
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // 12. Keyboard and Event Listeners
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });

  // 13. DOM Content Loaded Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initGuestName();
    initCountdown();
    initScrollHelpers();
    renderGuestbook();

    const openBtn = document.getElementById('btnOpenInvitation');
    if (openBtn) {
      openBtn.addEventListener('click', openInvitation);
    }

    if (musicBtn) {
      musicBtn.addEventListener('click', toggleMusic);
    }

    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
      rsvpForm.addEventListener('submit', handleRsvpSubmit);
    }

    // Lightbox backdrop click to close
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });
    }
  });

})();
