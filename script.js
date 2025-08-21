document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
            searchContainer.classList.remove('active');
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' && linkPage === 'index.html') || 
            (currentPage !== 'index.html' && linkPage !== 'index.html' && currentPage === linkPage)) {
            link.classList.add('active');
        }
    });

    // Marketplace Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.market-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Shopping Cart Functionality
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    // Update cart count on page load
    cartCount.textContent = cartItems.length;

    // Add to Cart Functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-cart')) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.image-placeholder').cloneNode(true);
            
            // Add item to cart
            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage.outerHTML
            });
            
            // Update cart count
            cartCount.textContent = cartItems.length;
            
            // Show confirmation
            showNotification(`${productName} added to cart!`);
            
            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    });

    // Weather functionality for horizontal layout
    const weatherRefresh = document.getElementById('weatherRefresh');
    const weatherIcon = document.getElementById('weatherIcon');
    const currentTemp = document.getElementById('currentTemp');
    const weatherDesc = document.getElementById('weatherDesc');
    const windSpeed = document.getElementById('windSpeed');
    const humidity = document.getElementById('humidity');
    const precipitation = document.getElementById('precipitation');
    const locationElement = document.getElementById('location');
    const updateTime = document.getElementById('updateTime');

    // Sample weather data
    const weatherData = {
        current: {
            temp: 24,
            description: "Sunny",
            icon: "fa-sun",
            wind: 12,
            humidity: 65,
            precipitation: 10
        },
        forecast: [
            { day: "Today", icon: "fa-sun", temp: 24 },
            { day: "Tomorrow", icon: "fa-cloud-sun", temp: 22 },
            { day: "Wed", icon: "fa-cloud-showers-heavy", temp: 19 }
        ],
        location: "Green Acres Farm",
        lastUpdated: new Date()
    };

    function updateWeatherUI(data) {
        weatherIcon.className = `fas ${data.current.icon}`;
        currentTemp.textContent = `${data.current.temp}°C`;
        weatherDesc.textContent = data.current.description;
        windSpeed.textContent = `${data.current.wind} km/h`;
        humidity.textContent = `${data.current.humidity}%`;
        precipitation.textContent = `${data.current.precipitation}%`;
        locationElement.textContent = data.location;
        updateTime.textContent = "Just now";
        
        // Update forecast
        const forecastDays = document.querySelectorAll('.forecast-day');
        data.forecast.forEach((day, index) => {
            if (forecastDays[index]) {
                forecastDays[index].querySelector('i').className = `fas ${day.icon}`;
                forecastDays[index].querySelector('span:last-child').textContent = `${day.temp}°C`;
            }
        });
    }

    function simulateWeatherUpdate() {
        weatherRefresh.classList.add('loading');
        
        setTimeout(() => {
            const newData = {
                ...weatherData,
                current: {
                    ...weatherData.current,
                    temp: Math.round(weatherData.current.temp + (Math.random() * 2 - 1)),
                    wind: Math.max(5, Math.round(weatherData.current.wind + (Math.random() * 4 - 2))),
                    humidity: Math.max(30, Math.min(90, Math.round(weatherData.current.humidity + (Math.random() * 10 - 5)))),
                    precipitation: Math.max(0, Math.min(100, Math.round(weatherData.current.precipitation + (Math.random() * 5 - 2.5))))
                },
                lastUpdated: new Date()
            };
            
            updateWeatherUI(newData);
            weatherRefresh.classList.remove('loading');
            showNotification('Weather data updated!');
        }, 1500);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event listeners
    weatherRefresh.addEventListener('click', simulateWeatherUpdate);

    // Initialize weather
    updateWeatherUI(weatherData);

    // Auto-refresh weather every 5 minutes
    setInterval(simulateWeatherUpdate, 5 * 60 * 1000);
});

 const useMock = true; // flip to false when your backend endpoints are ready

  // Optional: map sensor -> mock generator for demo
  const mockReaders = {
    soilMoisture: () => (Math.random() * 40 + 20).toFixed(0), // 20–60 %
    temperature: () => (Math.random() * 8 + 20).toFixed(1),   // 20–28 °C
    humidity: () => (Math.random() * 30 + 50).toFixed(0),     // 50–80 %
    light: () => (Math.random() * 7000 + 1000).toFixed(0),    // 1k–8k lux
  };

  async function readSensor(card) {
    const valueEl = card.querySelector('.sensor-value');
    const btn = card.querySelector('.sensor-read');
    const sensor = card.dataset.sensor;
    const unit = card.dataset.unit || '';
    const endpoint = card.dataset.endpoint;

    card.classList.add('loading');
    btn.disabled = true;
    const oldText = valueEl.textContent;
    valueEl.textContent = 'Reading…';

    try {
      let value;
      if (useMock) {
        // Simulate latency
        await new Promise(res => setTimeout(res, 600));
        value = mockReaders[sensor] ? mockReaders[sensor]() : '—';
      } else {
        // Replace with your real API. Example expects { value: number }
        const res = await fetch(endpoint, { method: 'GET' });
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        value = data.value;
      }
      valueEl.textContent = `${value}${unit ? ' ' + unit : ''}`;
    } catch (err) {
      console.error(err);
      valueEl.textContent = 'Error';
      // brief revert after error
      setTimeout(() => { valueEl.textContent = oldText || '—'; }, 1800);
    } finally {
      card.classList.remove('loading');
      btn.disabled = false;
    }
  }

  // Wire up all cards
  document.querySelectorAll('.sensor-card').forEach(card => {
    card.querySelector('.sensor-read').addEventListener('click', () => readSensor(card));
  });

  const useMock = true;

// Mock values
const mock = {
  soilMoisture:()=> (20+Math.random()*40).toFixed(0),
  temperature:()=> (20+Math.random()*8).toFixed(1),
  humidity:()=> (50+Math.random()*30).toFixed(0),
  light:()=> (1000+Math.random()*7000).toFixed(0)
};

async function readSensor(card){
  const v=card.querySelector('.value'); v.textContent="…"; 
  if(useMock){await new Promise(r=>setTimeout(r,500)); v.textContent=mock[card.dataset.sensor]()+card.dataset.unit; }
  else { const r=await fetch(card.dataset.endpoint); const d=await r.json(); v.textContent=d.value+card.dataset.unit; }
}

async function toggleActuator(card){
  const btn=card.querySelector('.toggle'); const stateEl=card.querySelector('.state');
  const cur=card.dataset.state, next=cur==="on"?"off":"on";
  btn.disabled=true; card.dataset.state=next; stateEl.textContent=next==="on"?"On":"Off";
  btn.textContent=btn.textContent.includes("On")?"Turn Off":"Turn On";
  btn.setAttribute("aria-pressed",next==="on");
  if(useMock){ await new Promise(r=>setTimeout(r,500)); }
  else { await fetch(card.dataset.endpoint,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({state:next})}); }
  btn.disabled=false;
}

// Bind
document.querySelectorAll('.read').forEach(b=>b.onclick=()=>readSensor(b.closest('.sensor')));
document.querySelectorAll('.toggle').forEach(b=>b.onclick=()=>toggleActuator(b.closest('.actuator')));