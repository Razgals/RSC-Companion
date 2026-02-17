const $ = sel => document.querySelector(sel);

let registry = {
  tools: [
    { "id": "worldmap", "name": "World Map", "url": "https://rsc.vet/worldmap/preservation" },
    { "id": "bestiary", "name": "Bestiary", "url": "https://rsc.vet/npcs" },
    { "id": "hiscores", "name": "Hiscores", "url": "https://rsc.vet/hiscores/preservation" },
    { "id": "forums", "name": "Forums", "url": "https://rsc.vet/board" },
    { "id": "news", "name": "RSC News", "url": "https://rsc.vet/board/viewforum.php?f=2" }
  ],
  calculators: [
    { id:'calculator', name:'Calculator', url:'calculator/calculators.html' }
  ],
  skills: [
    { id: 'agility', name: 'Agility', file: 'Agility.htm' },
    { id: 'cooking', name: 'Cooking', file: 'Cooking.htm' },
    { id: 'crafting', name: 'Crafting', file: 'Crafting.htm' },
    { id: 'fishing', name: 'Fishing', file: 'Fishing.htm' },
    { id: 'fletching', name: 'Fletching', file: 'Fletching.htm' },
    { id: 'herblaw', name: 'Herblaw', file: 'Herblaw.htm' },
    { id: 'magic-prayer', name: 'Magic and Prayer', file: 'Magic and Prayer.htm' },
    { id: 'ranged', name: 'Ranged', file: 'Ranged.htm' },
    { id: 'smithing-mining', name: 'Smithing and Mining', file: 'Smithing and Mining.htm' },
    { id: 'thieving', name: 'Thieving', file: 'Thieving.htm' }
  ],
  quests: [
    { id: 'biohazard', name: 'Biohazard', file: 'Biohazard.htm' },
    { id: 'black-knights', name: 'Black Knights Fortress', file: 'Black Knights Fortress.htm' },
    { id: 'clock-tower', name: 'Clock Tower', file: 'Clock Tower.htm' },
    { id: 'cooks-assistant', name: "Cook's Assistant", file: 'Cooks Assistant.htm' },
    { id: 'demon-slayer', name: 'Demon Slayer', file: 'Demon Slayer.htm' },
    { id: 'digsite', name: 'Digsite', file: 'Digsite.htm' },
    { id: 'dorics-quest', name: "Doric's Quest", file: "Doric's Quest.htm" },
    { id: 'dragon-slayer', name: 'Dragon Slayer', file: 'Dragon Slayer.htm' },
    { id: 'druidic-ritual', name: 'Druidic Ritual', file: 'Druidic Ritual.htm' },
    { id: 'dwarf-cannon', name: 'Dwarf Cannon', file: 'Dwarf Cannon.htm' },
    { id: 'ernest-chicken', name: 'Ernest the Chicken', file: 'Ernest the Chicken.htm' },
    { id: 'family-crest', name: 'Family Crest', file: 'Family Crest.htm' },
    { id: 'fight-arena', name: 'Fight Arena', file: 'Fight Arena.htm' },
    { id: 'fishing-contest', name: 'Fishing Contest', file: 'Fishing Contest.htm' },
    { id: 'gertrudes-cat', name: "Gertrude's Cat", file: "Gertrude's Cat.htm" },
    { id: 'goblin-diplomacy', name: 'Goblin Diplomacy', file: 'Goblin Diplomacy.htm' },
    { id: 'grand-tree', name: 'Grand Tree', file: 'Grand Tree.htm' },
    { id: 'hazeel-cult', name: 'Hazeel Cult', file: 'Hazeel Cult.htm' },
    { id: 'heros-guild', name: "Hero's Guild", file: "Hero's Guild.htm" },
    { id: 'holy-grail', name: 'Holy Grail', file: 'Holy Grail.htm' },
    { id: 'imp-catcher', name: 'Imp Catcher', file: 'Imp Catcher.htm' },
    { id: 'jungle-potion', name: 'Jungle Potion', file: 'Jungle Potion.htm' },
    { id: 'legends-quest', name: 'Legends Quest', file: 'Legends Quest.htm' },
    { id: 'lost-city', name: 'Lost City', file: 'Lost City.htm' },
    { id: 'merlins-crystal', name: "Merlin's Crystal", file: "Merlin's Crystal.htm" },
    { id: 'monks-friend', name: "Monk's Friend", file: "Monk's Friend.htm" },
    { id: 'murder-mystery', name: 'Murder Mystery', file: 'Murder Mystery.htm' },
    { id: 'observatory', name: 'Observatory', file: 'Observatory.htm' },
    { id: 'pirates-treasure', name: "Pirate's Treasure", file: "Pirate's Treasure.htm" },
    { id: 'plague-city', name: 'Plague City', file: 'Plague City.htm' },
    { id: 'prince-ali', name: 'Prince Ali Rescue', file: 'Prince Ali Rescue.htm' },
    { id: 'restless-ghost', name: 'Restless Ghost', file: 'Restless Ghost.htm' },
    { id: 'romeo-juliet', name: 'Romeo and Juliet', file: 'Romeo and Juliet.htm' },
    { id: 'scorpion-catcher', name: 'Scorpion Catcher', file: 'Scorpion Catcher.htm' },
    { id: 'sea-slug', name: 'Sea Slug', file: 'Sea Slug.htm' },
    { id: 'sheep-herder', name: 'Sheep Herder', file: 'Sheep Herder.htm' },
    { id: 'sheep-shearer', name: 'Sheep Shearer', file: 'Sheep Shearer.htm' },
    { id: 'shield-arrav', name: 'Shield of Arrav', file: 'Shield of Arrav.htm' },
    { id: 'shilo-village', name: 'Shilo Village', file: 'Shilo Village.htm' },
    { id: 'temple-ikov', name: 'Temple of Ikov', file: 'Temple of Ikov.htm' },
    { id: 'knights-sword', name: "The Knight's Sword", file: "The Knight's Sword.htm" },
    { id: 'tourist-trap', name: 'Tourist Trap', file: 'Tourist Trap.htm' },
    { id: 'tree-gnome', name: 'Tree Gnome Village', file: 'Tree Gnome Village.htm' },
    { id: 'tribal-totem', name: 'Tribal Totem', file: 'Tribal Totem.htm' },
    { id: 'underground-pass', name: 'Underground Pass', file: 'Underground Pass.htm' },
    { id: 'vampire-slayer', name: 'Vampire Slayer', file: 'Vampire Slayer.htm' },
    { id: 'watchtower', name: 'Watchtower', file: 'Watchtower.htm' },
    { id: 'waterfall', name: 'Waterfall', file: 'Waterfall.htm' },
    { id: 'witchs-house', name: "Witch's House", file: "Witch's House.htm" },
    { id: 'witchs-potion', name: "Witch's Potion", file: "Witch's Potion.htm" }
  ]
};

let tabs = [{id:'game', title:'RSC', url: 'https://rsc.vet/play/preservation/members'}];
let activeId = 'game';
let activeButtonId = null;
let expandedSections = { skills: false, quests: false };

function addTab(id, title, url) {
  const existing = tabs.find(t => t.id === id);
  if (existing) { setActive(id); return; }
  tabs.push({id, title, url});
  renderTabs();
  renderViews();
  setActive(id);
}

function closeTab(id) {
  if (id === 'game') return;
  const i = tabs.findIndex(t => t.id === id);
  if (i === -1) return;
  
  const closedId = tabs[i].id;
  tabs.splice(i, 1);
  
  if (activeButtonId === closedId) {
    setActiveButton(null);
    activeButtonId = null;
  }
  
  if (activeId === closedId) {
    activeId = tabs.length ? tabs[Math.max(0, i-1)].id : 'game';
  }
  
  if (activeId === 'game') {
    setActiveButton(null);
    activeButtonId = null;
  }
  
  renderTabs();
  renderViews();
}

function setActive(id) {
  activeId = id;
  if (id === 'game') {
    setActiveButton(null);
    activeButtonId = null;
  }
  renderTabs();
  renderViews();
}

function renderTabs() {
  const tabsEl = $('#tabs');
  tabsEl.innerHTML = '';
  
  tabs.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (t.id === activeId ? ' active' : '');
    btn.textContent = t.title;
    if (t.id !== 'game') {
      const close = document.createElement('span');
      close.className = 'close';
      close.textContent = '\u00D7';
      close.onclick = (e) => { e.stopPropagation(); closeTab(t.id); };
      // Add a modifier class for smaller x
      close.classList.add('small');
      btn.appendChild(close);
    }
    btn.onclick = () => setActive(t.id);
    tabsEl.appendChild(btn);
  });
}

function renderViews() {
  const views = $('#views');
  tabs.forEach(t => {
    let v = document.getElementById('view-' + t.id);
    if (!v) {
      v = document.createElement('div');
      v.id = 'view-' + t.id;
      v.className = 'view';
      const ifr = document.createElement('iframe');
      ifr.src = t.url;
      v.appendChild(ifr);
      views.appendChild(v);
    }
  });
  Array.from(views.children).forEach(el => {
    const id = el.id.replace('view-', '');
    el.classList.toggle('active', id === activeId);
  });
}

function openUrl(id, name, url) {
  if (/^chat$/i.test(id) || /\bchat\b/i.test(name)) {
    url = 'https://web.libera.chat/#openrsc';
  }
  activeButtonId = id;
  addTab(id, name, url);
}

function setActiveButton(element) {
  document.querySelectorAll('.tool-btn, .calc-btn, .skill-btn, .quest-btn').forEach(el => el.classList.remove('active'));
  if (element) element.classList.add('active');
}

function toggleSection(section) {
  expandedSections[section] = !expandedSections[section];
  buildLists();
}

function buildLists() {
  const toolList = document.getElementById('tool-list');
  const calcList = document.getElementById('calc-list');
  const skillList = document.getElementById('skill-list');
  const questList = document.getElementById('quest-list');
  
  toolList.innerHTML = '';
  calcList.innerHTML = '';
  skillList.innerHTML = '';
  questList.innerHTML = '';

  // Tools section
  registry.tools.forEach(t => {
    const row = document.createElement('div');
    row.className = 'tool-btn';
    row.dataset.id = t.id;
    const left = document.createElement('span');
    left.textContent = t.name;
    const right = document.createElement('div');
    right.className = 'ext-link-box';
    right.innerHTML = '&#8599;';
    right.onclick = (e) => { 
      e.stopPropagation(); 
      window.api.openWindow(t.url, t.name); 
    };
    row.onclick = function() { setActiveButton(this); openUrl(t.id, t.name, t.url); };
    row.append(left, right);
    toolList.appendChild(row);
  });

  // Add a single "Quests" button (external link) above skills
  const questBtn = document.createElement('div');
  questBtn.className = 'tool-btn';
  questBtn.dataset.id = 'quests-link';
  const leftQ = document.createElement('span');
  leftQ.textContent = 'Quests';
  const rightQ = document.createElement('div');
  rightQ.className = 'ext-link-box';
  rightQ.innerHTML = '&#8599;';
  rightQ.onclick = (e) => {
    e.stopPropagation();
    window.api.openWindow('https://rsc.vet/quests', 'Quests');
  };
  questBtn.onclick = function() { setActiveButton(this); openUrl('quests-link', 'Quests', 'https://rsc.vet/quests'); };
  questBtn.append(leftQ, rightQ);
  // Insert above skills
  skillList.parentNode.insertBefore(questBtn, skillList);

  // Remove the old quest section from the left panel
  questList.innerHTML = '';

  // Calculators section
  registry.calculators.forEach(c => {
    const row = document.createElement('div');
    row.className = 'calc-btn';
    row.dataset.id = c.id;
    const left = document.createElement('span');
    left.textContent = c.name;
    const right = document.createElement('div');
    right.className = 'ext-link-box';
    right.innerHTML = '&#8599;';
    right.onclick = (e) => { 
      e.stopPropagation();
      const currentPath = window.location.href;
      const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      const fullPath = `${basePath}/${c.url}`;
      window.api.openWindow(fullPath, c.name); 
    };
    row.onclick = function() { setActiveButton(this); openUrl(c.id, c.name, c.url); };
    row.append(left, right);
    calcList.appendChild(row);
  });

  // Skills section with collapsible submenu
  const skillHeader = document.createElement('div');
  skillHeader.className = 'section-title collapsible-header';
  skillHeader.innerHTML = `Skills <span class="toggle-arrow">${expandedSections.skills ? '▼' : '▶'}</span>`;
  skillHeader.onclick = () => toggleSection('skills');
  skillList.appendChild(skillHeader);

  if (expandedSections.skills) {
    registry.skills.forEach(s => {
      const row = document.createElement('div');
      row.className = 'skill-btn submenu-item';
      row.dataset.id = s.id;
      const left = document.createElement('span');
      left.textContent = s.name;
      const right = document.createElement('div');
      right.className = 'ext-link-box';
      right.innerHTML = '&#8599;';
      right.onclick = (e) => { 
        e.stopPropagation();
        const currentPath = window.location.href;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        const fullPath = `${basePath}/Skills/${s.file}`;
        window.api.openWindow(fullPath, s.name); 
      };
      row.onclick = function() { 
        setActiveButton(this); 
        const url = `Skills/${s.file}`;
        openUrl(s.id, s.name, url);
      };
      row.append(left, right);
      skillList.appendChild(row);
    });
  }
  // The quest guides are still present in registry.quests, but not shown in the UI for now.
}

async function triggerCapture() {
  const path = await window.api.captureScreen();
  
  const activeView = document.querySelector('.view.active');
  if (activeView) {
    const iframe = activeView.querySelector('iframe');
    if (iframe) {
      const flash = document.createElement('div');
      flash.className = 'screenshot-flash';
      flash.style.position = 'absolute';
      flash.style.top = iframe.offsetTop + 'px';
      flash.style.left = iframe.offsetLeft + 'px';
      flash.style.width = iframe.offsetWidth + 'px';
      flash.style.height = iframe.offsetHeight + 'px';
      activeView.appendChild(flash);
      
      setTimeout(() => {
        activeView.removeChild(flash);
      }, 300);
    }
  }
}

function triggerOpenFolder() {
  window.api.openFolder();
}

document.addEventListener('DOMContentLoaded', () => {
  buildLists();
  renderTabs();
  renderViews();

  // Add zoom with ctrl+mousewheel for all tabs and iframes
  let zoomFactor = 1;
  const minZoom = 0.25;
  const maxZoom = 3;
  document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomFactor = Math.min(zoomFactor + 0.1, maxZoom);
      } else if (e.deltaY > 0) {
        zoomFactor = Math.max(zoomFactor - 0.1, minZoom);
      }
      document.body.style.zoom = zoomFactor;
      // Also set zoom for all iframes
      document.querySelectorAll('iframe').forEach(ifr => {
        try { ifr.contentDocument.body.style.zoom = zoomFactor; } catch {}
      });
    }
  }, { passive: false });

  // Electron update check logic
  window.api.checkForUpdates();
  window.api.onUpdateAvailable(version => {
    const releaseUrl = 'https://github.com/Razgals/RSC-Companion/releases';
    const msg = `A new version (${version}) is available!\n\nGo to the release page?`;
    if (confirm(msg)) {
      window.api.openWindow(releaseUrl, 'Update Available');
    }
  });

  document.getElementById('btn-capture-sidebar').onclick = triggerCapture;
  document.getElementById('btn-folder-sidebar').onclick = triggerOpenFolder;
});