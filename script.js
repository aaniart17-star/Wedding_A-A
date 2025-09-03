// Modern Wedding Invitation JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
});

// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
});

// Countdown Timer with improved animations
const countdownDate = new Date("Oct 9, 2025 14:30:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Animate number changes
  animateNumber('days', days);
  animateNumber('hours', hours);
  animateNumber('minutes', minutes);
  animateNumber('seconds', seconds);

  if (distance < 0) {
    clearInterval(countdownTimer);
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer) {
      countdownContainer.innerHTML = `
        <div class="event-started" data-aos="fade-up">
          <h2>Միջոցառումը սկսվել է</h2>
          <div class="celebration">🎉</div>
        </div>
      `;
    }
  }
}

function animateNumber(elementId, newValue) {
  const element = document.getElementById(elementId);
  if (element) {
    const currentValue = parseInt(element.textContent);
    
    if (currentValue !== newValue) {
      element.style.transform = 'scale(1.2)';
      element.style.color = '#a06455';
      
      setTimeout(() => {
        element.textContent = newValue.toString().padStart(2, '0');
        element.style.transform = 'scale(1)';
        element.style.color = '';
      }, 150);
    }
  }
}

const countdownTimer = setInterval(updateCountdown, 1000);

// Calendar Generation with improved styling
const year = 2025;
const month = 9; // October (0-based)
const daysInMonth = 31;

const weekdays = ['Երկ', 'Երք', 'Չրք', 'Հնգ', 'Ուրբ', 'Շբթ', 'Կիր'];

function generateCalendar() {
  const calendarBody = document.getElementById('calendar-body');
  if (!calendarBody) return;
  
  calendarBody.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const startDay = (firstDay === 0) ? 6 : firstDay - 1;

  let date = 1;
  for (let row = 0; row < 6; row++) {
    let tr = document.createElement('tr');
    for (let col = 0; col < 7; col++) {
      let td = document.createElement('td');
      
      if (row === 0 && col < startDay) {
        td.innerHTML = '';
      } else if (date > daysInMonth) {
        td.innerHTML = '';
      } else {
        td.textContent = date;
        
        // Highlight wedding day (9th)
        if (date === 9) {
          td.classList.add('today');
          td.innerHTML = `${date}<i class="fas fa-heart" style="font-size: 0.5rem; margin-left: 2px; color: #a06455;"></i>`;
        }
        
        // Highlight Sundays
        if (col === 6) {
          td.classList.add('sunday');
        }
        
        // Add hover effect
        td.addEventListener('mouseenter', () => {
          if (!td.classList.contains('today')) {
            td.style.transform = 'scale(1.1)';
          }
        });
        
        td.addEventListener('mouseleave', () => {
          if (!td.classList.contains('today')) {
            td.style.transform = 'scale(1)';
          }
        });
        
        date++;
      }
      tr.appendChild(td);
    }
    calendarBody.appendChild(tr);
    if (date > daysInMonth) break;
  }
}

generateCalendar();

// Enhanced Guest Management
function addGuest() {
  const container = document.getElementById("guests-container");
  if (!container) return;
  
  const wrapper = document.createElement("div");
  wrapper.className = "guest-input-wrapper";
  wrapper.style.animation = "fadeInUp 0.3s ease-out";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "guests[]";
  input.placeholder = "Հյուրի անունը";
  input.className = "guest-input";
  input.required = true;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-guest-btn";
  removeBtn.innerHTML = '<i class="fas fa-times"></i>';
  
  removeBtn.addEventListener('click', () => {
    wrapper.style.animation = "fadeOut 0.3s ease-out";
    setTimeout(() => {
      if (container.contains(wrapper)) {
        container.removeChild(wrapper);
      }
    }, 300);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);
  container.appendChild(wrapper);
  
  // Focus on the new input
  input.focus();
}

// Enhanced Form Submission with better UX
async function submitForm() {
  const submitBtn = document.querySelector('.btn-submit');
  if (!submitBtn) return;
  
  const originalText = submitBtn.querySelector('.btn-text');
  const originalHTML = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ուղարկվում է...';
  submitBtn.disabled = true;

  const name = document.querySelector('input[name="name"]')?.value || '';
  const guests = Array.from(document.querySelectorAll('input[name="guests[]"]'))
    .map(input => input.value)
    .filter(value => value.trim() !== '');
  const invitedBy = Array.from(document.querySelectorAll('input[name="invited_by"]:checked'))
    .map(input => input.value);
  const attending = document.querySelector('input[name="check"]:checked')?.value || '';

  const data = { 
    name: name, 
    attending: attending, 
    guests: guests, 
    invitedBy: invitedBy 
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxx8Pb1uuCUsq50BVeNcfP5C1TWYcENRrWq2cU9Vd5RTaneoISkz10HDCQiROqoMyTtRA/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    
    if (result.result === "success") {
      showNotification("Տվյալները հաջողությամբ պահպանվել են!", "success");
      // Reset form
      const form = document.querySelector('.rsvp-form');
      if (form) {
        form.reset();
        document.getElementById('guests-container').innerHTML = '';
      }
    } else {
      showNotification("Սխալ գրանցման ժամանակ: " + JSON.stringify(result), "error");
    }
  } catch (err) {
    showNotification("Չհաջողվեց կապ հաստատել սերվերի հետ: " + err, "error");
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
  }
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    max-width: 300px;
    font-family: 'Inter', sans-serif;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.event-card, .calendar-wrapper, .rsvp-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.rsvp-form');
  if (form) {
    form.addEventListener('input', (e) => {
      const input = e.target;
      const field = input.closest('.form-group');
      
      if (input.type === 'text' && input.value.trim() !== '') {
        field?.classList.add('valid');
      } else if (input.type === 'text') {
        field?.classList.remove('valid');
      }
    });
  }
});

// Add CSS for additional animations
const additionalStyles = `
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-group.valid .input-field input {
    border-bottom-color: #4CAF50;
  }
  
  .event-started {
    text-align: center;
    padding: 2rem;
  }
  
  .celebration {
    font-size: 4rem;
    margin-top: 1rem;
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add hover effects to event cards
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add click effects to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple);
        }
      }, 600);
    });
  });
});

// Add ripple animation
const rippleStyles = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

//audio
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = playPauseBtn.querySelector('.play-icon');

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playPauseBtn.prepend(playIcon);
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playPauseBtn.prepend(playIcon);
    }
});