function toggleCard(card) {
  card.classList.toggle('expanded');
}

function showContactInfo(info) {
  document.getElementById('contact-info-box').innerText = info || "Click an icon to view contact details.";
}

function toggleEvent(element) {
  element.classList.toggle('expanded');
  const arrow = element.querySelector('.event-arrow');
  if (element.classList.contains('expanded')) {
    arrow.textContent = '▼';
  } else {
    arrow.textContent = '▶';
  }
}

// Automatically categorize events by date
document.addEventListener('DOMContentLoaded', function() {
  const allEventsData = document.getElementById('all-events-data');
  if (!allEventsData) return; // Only run if the events section exists
  
  const upcomingList = document.getElementById('upcoming-events');
  const pastList = document.getElementById('past-events');
  
  // Get current date in Pacific Time (PST/PDT) as YYYY-MM-DD string
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const todayStr = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  
  const events = Array.from(allEventsData.querySelectorAll('.event-item'));
  
  // Sort events by date (newest first for past, oldest first for upcoming)
  events.sort((a, b) => {
    const dateA = a.getAttribute('data-date');
    const dateB = b.getAttribute('data-date');
    return dateA.localeCompare(dateB);
  });
  
  events.forEach(event => {
    // Get event date string (YYYY-MM-DD format)
    const eventDateStr = event.getAttribute('data-date');
    
    // Clone the event and add click handler
    const clonedEvent = event.cloneNode(true);
    clonedEvent.onclick = function() { toggleEvent(this); };
    
    // Events on or after today are upcoming (including today)
    // Compare date strings directly (YYYY-MM-DD format allows string comparison)
    if (eventDateStr >= todayStr) {
      upcomingList.appendChild(clonedEvent);
    } else {
      pastList.insertBefore(clonedEvent, pastList.firstChild); // Insert at beginning for newest first
    }
  });
  
  // Hide the data container
  allEventsData.style.display = 'none';
});