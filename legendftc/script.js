function toggleCard(card) {
  card.classList.toggle('expanded');
}

function showContactInfo(info) {
  document.getElementById('contact-info-box').innerText = info || "Click an icon to view contact details.";
}