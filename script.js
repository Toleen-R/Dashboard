// Skapa en funktion för klockslag och datum
function updateDateTime() {
  const now = new Date();
  const dateTimeElement = document.getElementById('clock');
  dateTimeElement.innerText = now.toLocaleString();
}

//-------------------Titel----------------------
// Event listeners
document.getElementById('dashboardTitle').addEventListener('click', () => {
  const newTitle = prompt('Ange ny titel:');
  document.getElementById('dashboardTitle').innerText = newTitle;
  saveTitleToLocalStorage(newTitle);
});

document.getElementById('addLinkBtn').addEventListener('click', saveAndDisplayLink);
document.getElementById('changeLocationBtn').addEventListener('click', changeLocation);
document.getElementById('randomImageBtn').addEventListener('click', updateRandomImage);

//----------------Snabba länkar-----------------------
// Skapa en funktion för nya länkar 
function saveAndDisplayLink() {
  const linkUrl = prompt('Ange länkens URL:');
  const linkTitle = prompt('Ange länkens titel:');

  if (linkUrl && linkTitle) {
    saveLinkToLocalStorage(linkUrl, linkTitle);
    const linkContainer = document.querySelector('.link-container');
    createAndAppendLink(linkContainer, { url: linkUrl, title: linkTitle });
  }
}

// Skapa en funktion för att ta bort länk
function removeLink(button) {
  const listItem = button.parentNode;
  listItem.parentNode.removeChild(listItem);

  // ta bort länk från localStorage
  const linkUrl = listItem.querySelector('a').href;
  removeLinkFromLocalStorage(linkUrl);
}

// spara titel till localStorage
function saveTitleToLocalStorage(title) {
  localStorage.setItem('dashboardTitle', title);
}

// spara länkar till localStorage
function saveLinkToLocalStorage(url, title) {
  const links = JSON.parse(localStorage.getItem('dashboardLinks')) || [];
  links.push({ url, title });
  localStorage.setItem('dashboardLinks', JSON.stringify(links));
}

// ta bort länkar från localStorage
function removeLinkFromLocalStorage(url) {
  const links = JSON.parse(localStorage.getItem('dashboardLinks')) || [];
  const updatedLinks = links.filter(link => link.url !== url);
  localStorage.setItem('dashboardLinks', JSON.stringify(updatedLinks));
}

function createAndAppendLink(linkContainer, link) {
  const linkItem = document.createElement('div');
  linkItem.className = 'link-item';

  const removeLinkButton = document.createElement('span');
  removeLinkButton.className = 'remove-link';
  removeLinkButton.textContent = '-';
  removeLinkButton.onclick = function () {
    removeLink(this);
  };

  const linkImage = document.createElement('img');
  linkImage.src = `https://www.google.com/s2/favicons?domain=${link.url}`;
  linkImage.alt = 'Favicon';

  const linkAnchor = document.createElement('a');
  linkAnchor.href = link.url;
  linkAnchor.target = '_blank';
  linkAnchor.textContent = link.title;

  linkItem.appendChild(removeLinkButton);
  linkItem.appendChild(linkImage);
  linkItem.appendChild(linkAnchor);

  linkContainer.appendChild(linkItem);
}

// visa data från localstorage på dashboard när sidan laddas om
function loadFromLocalStorage() {
  const title = localStorage.getItem('dashboardTitle');
  const links = JSON.parse(localStorage.getItem('dashboardLinks')) || [];

  if (title) {
    document.getElementById('dashboardTitle').innerText = title;
  }

  const linkContainer = document.querySelector('.link-container');
  linkContainer.innerHTML = '';

  // Hard-coded links
  const fixedLinks = [
    { url: 'https://www.google.com', title: 'Google' },
    { url: 'https://www.notion.so', title: 'Notion' },
    { url: 'https://www.slack.com', title: 'Slack' },
    { url: 'https://www.chatgpt.com', title: 'ChatGPT' },
  ];

  fixedLinks.forEach(link => createAndAppendLink(linkContainer, link));

  // Links from local storage
  links.forEach(link => createAndAppendLink(linkContainer, link));
}

// Dagens väder
function changeLocation() {
  const newLocation = prompt('Ange ny destination:');
  if (newLocation) {
    updateWeather(newLocation);
  }
}

// Bakgrunds bild
function updateRandomImage() {
  const accessKey = 'n1gTmc9v_4fHHhh_Dh8YGKIp11CrkLQ4j1S-kaQOGVw';
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      return response.json();
    })
    .then(data => {
      const dashboard = document.body;
      dashboard.style.backgroundImage = `url(${data.urls.full})`;
      dashboard.style.backgroundSize = 'cover';
      dashboard.style.backgroundPosition = 'center';
    })
    .catch(error => {
      console.error('Error, kan inte hämta bild:', error);
    });
}

document.getElementById('randomImageBtn').addEventListener('click', updateRandomImage);

// Anteckningar
const notesTextarea = document.getElementById('notesTextarea');

notesTextarea.addEventListener('input', () => {
  // spara anteckningar till local storage
  saveNotesToLocalStorage();
});

function saveNotesToLocalStorage() {
  const notesText = notesTextarea.value;
  localStorage.setItem('dashboardNotes', notesText);
}

// visa anteckningar från localstorage på dashboard när sidan laddas om
function loadNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem('dashboardNotes');
  if (storedNotes) {
    notesTextarea.value = storedNotes;
  }
}

loadFromLocalStorage();
loadNotesFromLocalStorage();

// Starta funktionen
updateDateTime();
setInterval(updateDateTime, 1000);
