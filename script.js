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
      const linkContainer = document.querySelector('.link-container');
  
      const linkItem = document.createElement('div');
      linkItem.className = 'link-item';
  
      const removeLinkButton = document.createElement('span');
      removeLinkButton.className = 'remove-link';
      removeLinkButton.textContent = '-';
      removeLinkButton.onclick = function () {
        removeLink(this);
      };
  
      const linkImage = document.createElement('img');
      linkImage.src = `https://www.google.com/s2/favicons?domain=${linkUrl}`;
      linkImage.alt = 'Favicon';
  
      const linkAnchor = document.createElement('a');
      linkAnchor.href = linkUrl;
      linkAnchor.target = '_blank';
      linkAnchor.textContent = linkTitle;
  
      linkItem.appendChild(removeLinkButton);
      linkItem.appendChild(linkImage);
      linkItem.appendChild(linkAnchor);
  
      linkContainer.appendChild(linkItem);
    }
  }
  
  // Skapa en funktion för att ta bort länk
  function removeLink(button) {
    const listItem = button.parentNode;
    listItem.parentNode.removeChild(listItem);
  }
  

//---------------Dagens väder-------------------
  // Function to change weather location
  function changeLocation() {
    const newLocation = prompt('Ange ny destination:');
    if (newLocation) {
      updateWeather(newLocation);
    }
  }
  
//------------------------------Bakgrunds bild----------------------
  // Skapa en funktion för att randomisera en bild från Unsplash API
  function updateRandomImage() {
    const accessKey = 'n1gTmc9v_4fHHhh_Dh8YGKIp11CrkLQ4j1S-kaQOGVw'; // Replace with your Unsplash API key
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
        console.error('Failed to fetch a random image:', error);
      });
  }
  
  // lägg till Event listener för bild knappen 
  document.getElementById('randomImageBtn').addEventListener('click', updateRandomImage);

  
// Starta funktionen
  updateDateTime();
  setInterval(updateDateTime, 1000);
  
