function toggleCard(card) {
  card.classList.toggle('expanded');
}

function showContactInfo(info) {
  document.getElementById('contact-info-box').innerText = info || "Click an icon to view contact details.";
}

// Tab switching functionality for seasons page
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Check URL hash on page load
  const hash = window.location.hash.substring(1);
  if (hash === 'fll' || hash === 'ftc') {
    switchTab(hash);
  }
  
  // Add click handlers to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
      // Update URL hash
      window.location.hash = tabName;
    });
  });
  
  function switchTab(tabName) {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected button and content
    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-content`);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
  }
  
  // Listen for hash changes
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash === 'fll' || hash === 'ftc') {
      switchTab(hash);
    }
  });
  
  // Sub-tab switching functionality
  const subTabButtons = document.querySelectorAll('.sub-tab-button');
  const subTabContents = document.querySelectorAll('.sub-tab-content');
  
  subTabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const subTabName = this.getAttribute('data-sub-tab');
      switchSubTab(subTabName);
    });
  });
  
  function switchSubTab(subTabName) {
    // Remove active class from all sub-tab buttons and contents
    subTabButtons.forEach(btn => btn.classList.remove('active'));
    subTabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected button and content
    const activeButton = document.querySelector(`.sub-tab-button[data-sub-tab="${subTabName}"]`);
    const activeContent = document.getElementById(`${subTabName}-content`);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
  }
  
  // Populate All Videos tab with videos from all categories, sorted by upload date (most recent first)
  function populateAllVideosGrid() {
    const allVideosGrid = document.getElementById('all-videos-grid');
    if (!allVideosGrid) return;
    
    const videoItems = document.querySelectorAll('#hardware-content .video-item, #software-content .video-item, #outreach-content .video-item');
    const videosWithDates = Array.from(videoItems).map(item => ({
      element: item.cloneNode(true),
      date: item.getAttribute('data-upload-date') || '1970-01-01'
    }));
    
    videosWithDates.sort((a, b) => b.date.localeCompare(a.date));
    
    allVideosGrid.innerHTML = '';
    videosWithDates.forEach(({ element }) => allVideosGrid.appendChild(element));
  }
  populateAllVideosGrid();
  
  // Video search functionality
  const videoSearchInput = document.getElementById('video-search');
  const subTabsContainer = document.getElementById('sub-tabs-container');
  const searchResultsContainer = document.getElementById('search-results-container');
  const searchResultsGrid = document.getElementById('search-results-grid');
  
  if (videoSearchInput) {
    videoSearchInput.addEventListener('input', function() {
      const searchQuery = this.value.toLowerCase().trim();
      
      if (searchQuery === '') {
        // Show tabs, hide search results
        if (subTabsContainer) subTabsContainer.classList.remove('hidden');
        if (searchResultsContainer) searchResultsContainer.classList.add('hidden');
      } else {
        // Hide tabs, show search results
        if (subTabsContainer) subTabsContainer.classList.add('hidden');
        if (searchResultsContainer) searchResultsContainer.classList.remove('hidden');
        
        // Collect all matching videos from all categories
        const allVideoItems = document.querySelectorAll('#hardware-content .video-item, #software-content .video-item, #outreach-content .video-item');
        const matchingVideos = [];
        
        allVideoItems.forEach(item => {
          const titleElement = item.querySelector('h4');
          if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(searchQuery)) {
              matchingVideos.push(item.cloneNode(true));
            }
          }
        });
        
        // Clear and populate search results
        if (searchResultsGrid) {
          searchResultsGrid.innerHTML = '';
          matchingVideos.forEach(video => {
            searchResultsGrid.appendChild(video);
          });
        }
      }
    });
  }
});