let allSnippets = [];
let activeFilter = { type: 'all', value: 'all' };

// --- REAL SVG ICONS LIBRARY ---
const ICONS = {
    folder: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
    folderBadge: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
    starFilled: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#E26D5C" stroke="#E26D5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    starOutline: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    copy: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    askAi: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path></svg>`,
    fixBugs: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M6 13H2"></path><path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path><path d="M22 13h-4"></path><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path></svg>`,
    share: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
    github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
    link: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    edit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
    trash: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    sun: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
    initUIControls();
    fetchSnippets();
});

function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E26D5C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 250);
    }, 2800);
}

function updateSlidingPill() {
    const activeBtn = document.querySelector('.nav-item.active');
    const pill = document.getElementById('slidingPill');
    const navContainer = document.getElementById('sidebarNav');
    if (activeBtn && pill && navContainer) {
        const topOffset = activeBtn.offsetTop;
        pill.style.transform = `translateY(${topOffset}px)`;
        pill.style.height = `${activeBtn.offsetHeight}px`;
    }
}

function initUIControls() {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            setTimeout(updateSlidingPill, 310);
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    document.getElementById('openDrawerBtn').addEventListener('click', () => openDrawer());
    document.getElementById('closeDrawerBtn').addEventListener('click', closeDrawer);
    document.getElementById('cancelDrawerBtn').addEventListener('click', closeDrawer);
    document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        if (e.key === 'Escape') {
            closeDrawer();
            document.querySelectorAll('.share-dropdown-wrapper.open').forEach(el => el.classList.remove('open'));
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.share-dropdown-wrapper')) {
            document.querySelectorAll('.share-dropdown-wrapper.open').forEach(el => el.classList.remove('open'));
        }
    });

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? ICONS.moon : ICONS.sun;
    });

    const themeDropdown = document.getElementById('customThemeDropdown');
    const themeTrigger = document.getElementById('themeTrigger');
    themeTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('open');
    });

    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const val = opt.getAttribute('data-value');
            document.getElementById('selectedThemeLabel').textContent = opt.textContent;
            document.getElementById('syntaxThemeSelect').value = val;
            document.getElementById('hljs-theme').href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${val}.min.css`;
            themeDropdown.classList.remove('open');
        });
    });

    const customSelect = document.getElementById('customSelect');
    const selectTrigger = customSelect.querySelector('.select-trigger');
    selectTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
    });

    customSelect.querySelectorAll('.custom-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const val = opt.getAttribute('data-value');
            document.getElementById('selectedLabel').innerHTML = opt.innerHTML;
            document.getElementById('language').value = val;
            customSelect.classList.remove('open');
        });
    });

    document.addEventListener('click', () => {
        themeDropdown.classList.remove('open');
        customSelect.classList.remove('open');
    });

    document.getElementById('searchInput').addEventListener('input', applyFilters);

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveNav(btn, btn.getAttribute('data-filter-type'), btn.getAttribute('data-filter-val'));
        });
    });

    document.getElementById('snippetForm').addEventListener('submit', handleFormSubmit);
    setTimeout(updateSlidingPill, 100);
}

function openDrawer(snippet = null) {
    const drawer = document.getElementById('snippetDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');

    if (snippet) {
        formTitle.textContent = 'Edit Snippet';
        submitBtn.textContent = 'Update Snippet';
        document.getElementById('editingId').value = snippet.id;
        document.getElementById('title').value = snippet.title;
        document.getElementById('folder').value = snippet.folder || '';
        document.getElementById('tags').value = snippet.tags || '';
        document.getElementById('code').value = snippet.code;
        document.getElementById('language').value = snippet.language;
        const matchedOpt = document.querySelector(`.custom-option[data-value="${snippet.language}"]`);
        if (matchedOpt) {
            document.getElementById('selectedLabel').innerHTML = matchedOpt.innerHTML;
        }
    } else {
        formTitle.textContent = 'Create New Snippet';
        submitBtn.textContent = 'Save Snippet';
        document.getElementById('snippetForm').reset();
        document.getElementById('editingId').value = '';
        document.getElementById('language').value = 'python';
        document.getElementById('selectedLabel').innerHTML = `<i class="devicon-python-plain colored"></i> Python`;
    }

    backdrop.classList.add('open');
    drawer.classList.add('open');
}

function closeDrawer() {
    document.getElementById('drawerBackdrop').classList.remove('open');
    document.getElementById('snippetDrawer').classList.remove('open');
}

async function fetchSnippets() {
    try {
        const res = await fetch('/api/snippets');
        allSnippets = await res.json();
        buildSidebarTrees();
        applyFilters();
    } catch (err) {
        console.error('Error loading snippets:', err);
    }
}

function buildSidebarTrees() {
    document.getElementById('countAll').textContent = allSnippets.length;
    document.getElementById('countFav').textContent = allSnippets.filter(s => s.is_favorite).length;

    const folderMap = {};
    const langMap = {};

    allSnippets.forEach(s => {
        if (s.folder && s.folder.trim() !== '') {
            folderMap[s.folder] = (folderMap[s.folder] || 0) + 1;
        }
        if (s.language) {
            langMap[s.language] = (langMap[s.language] || 0) + 1;
        }
    });

    const foldersContainer = document.getElementById('sidebarFoldersList');
    foldersContainer.innerHTML = '';
    Object.keys(folderMap).sort().forEach(folder => {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.setAttribute('data-filter-type', 'folder');
        btn.setAttribute('data-filter-val', folder);
        btn.innerHTML = `
            <span class="nav-icon">${ICONS.folder}</span>
            <span class="nav-text">${escapeHtml(folder)}</span>
            <span class="nav-count">${folderMap[folder]}</span>
        `;
        btn.addEventListener('click', () => setActiveNav(btn, 'folder', folder));
        foldersContainer.appendChild(btn);
    });

    const langsContainer = document.getElementById('sidebarLangsList');
    langsContainer.innerHTML = '';
    Object.keys(langMap).sort().forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.setAttribute('data-filter-type', 'language');
        btn.setAttribute('data-filter-val', lang);
        const iconClass = getDeviconClass(lang);
        btn.innerHTML = `
            <span class="nav-icon"><i class="${iconClass}"></i></span>
            <span class="nav-text">${escapeHtml(lang.toUpperCase())}</span>
            <span class="nav-count">${langMap[lang]}</span>
        `;
        btn.addEventListener('click', () => setActiveNav(btn, 'language', lang));
        langsContainer.appendChild(btn);
    });

    setTimeout(updateSlidingPill, 50);
}

function setActiveNav(clickedBtn, type, value) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    clickedBtn.classList.add('active');
    activeFilter = { type, value };
    updateSlidingPill();

    const titleEl = document.getElementById('currentViewTitle');
    if (type === 'all') titleEl.textContent = 'All Snippets';
    else if (type === 'favorites') titleEl.textContent = 'Favorite Snippets';
    else if (type === 'folder') titleEl.textContent = `Folder: ${value}`;
    else if (type === 'language') titleEl.textContent = `Language: ${value.toUpperCase()}`;

    document.getElementById('sidebar').classList.remove('mobile-open');
    applyFilters();
}

function applyFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();

    let filtered = allSnippets.filter(s => {
        if (activeFilter.type === 'favorites' && !s.is_favorite) return false;
        if (activeFilter.type === 'folder' && s.folder !== activeFilter.value) return false;
        if (activeFilter.type === 'language' && s.language !== activeFilter.value) return false;

        if (query) {
            const matchTitle = (s.title || '').toLowerCase().includes(query);
            const matchTags = (s.tags || '').toLowerCase().includes(query);
            const matchFolder = (s.folder || '').toLowerCase().includes(query);
            const matchCode = (s.code || '').toLowerCase().includes(query);
            return matchTitle || matchTags || matchFolder || matchCode;
        }
        return true;
    });

    filtered.sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0));

    document.getElementById('resultsCountBadge').textContent = `${filtered.length} snippet${filtered.length === 1 ? '' : 's'}`;
    renderSnippets(filtered);
}

function renderSnippets(snippets) {
    const grid = document.getElementById('snippetsGrid');
    grid.innerHTML = '';

    if (snippets.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-secondary); font-size: 14px;">No snippets match your current filter or search.</p>`;
        return;
    }

    snippets.forEach((snippet, index) => {
        const card = document.createElement('div');
        card.className = `card ${snippet.is_favorite ? 'pinned-card' : ''}`;
        card.style.animationDelay = `${Math.min(index * 45, 400)}ms`;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        const tagsHtml = snippet.tags
            ? snippet.tags.split(',').filter(t => t.trim()).map(t => `<span class="tag-badge">#${escapeHtml(t.trim())}</span>`).join('')
            : '';

        const folderHtml = snippet.folder
            ? `<span class="folder-badge">${ICONS.folderBadge} ${escapeHtml(snippet.folder)}</span>`
            : '';

        const iconClass = getDeviconClass(snippet.language);
        const isLongCode = snippet.code.split('\n').length > 9 || snippet.code.length > 360;

        card.innerHTML = `
            <div class="card-header">
                <div class="card-title-meta">
                    <button class="pin-star-btn" onclick="toggleFavorite(${snippet.id})" title="Toggle Favorite">
                        ${snippet.is_favorite ? ICONS.starFilled : ICONS.starOutline}
                    </button>
                    <h3>${escapeHtml(snippet.title)}</h3>
                </div>
                <div class="card-meta-right">
                    ${folderHtml}
                    <span class="lang-badge"><i class="${iconClass}"></i> ${escapeHtml(snippet.language)}</span>
                </div>
            </div>

            ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}

            <pre id="pre-${snippet.id}"><code class="language-${escapeHtml(snippet.language)}">${escapeHtml(snippet.code)}</code></pre>
            ${isLongCode ? `<button class="expand-code-btn" onclick="toggleExpandCode(${snippet.id}, this)">Show full code ▾</button>` : ''}

            <div class="card-actions">
                <button class="action-btn" onclick="copyCode(${snippet.id})">${ICONS.copy} <span>Copy</span></button>
                <button class="action-btn ai-special" onclick="runAiAction(${snippet.id}, 'explain')">${ICONS.askAi} <span>Ask AI</span></button>
                <button class="action-btn ai-special" onclick="runAiAction(${snippet.id}, 'fix')">${ICONS.fixBugs} <span>Fix Bugs</span></button>
                
                <div class="share-dropdown-wrapper" id="share-wrap-${snippet.id}">
                    <button class="action-btn" onclick="toggleShareMenu(event, ${snippet.id})">${ICONS.share} <span>Share</span></button>
                    <div class="share-menu">
                        <button class="share-menu-item" onclick="shareToGitHub(${snippet.id})">${ICONS.github} <span>Share on GitHub Gist</span></button>
                        <button class="share-menu-item" onclick="shareToLinkedIn(${snippet.id})">${ICONS.linkedin} <span>Share on LinkedIn</span></button>
                        <button class="share-menu-item" onclick="copyFormattedShare(${snippet.id})">${ICONS.link} <span>Copy Formatted Snippet</span></button>
                    </div>
                </div>

                <button class="action-btn" onclick="editSnippet(${snippet.id})">${ICONS.edit} <span>Edit</span></button>
                <button class="action-btn delete-btn" onclick="deleteSnippet(${snippet.id})">${ICONS.trash} <span>Delete</span></button>
            </div>
            <div id="ai-box-${snippet.id}" class="ai-explanation" style="display: none;"></div>
        `;

        grid.appendChild(card);
        const codeEl = card.querySelector('code');
        if (window.hljs) {
            hljs.highlightElement(codeEl);
        }
    });
}

function toggleExpandCode(id, btn) {
    const pre = document.getElementById(`pre-${id}`);
    pre.classList.toggle('expanded');
    btn.textContent = pre.classList.contains('expanded') ? 'Collapse code ▴' : 'Show full code ▾';
}

function toggleShareMenu(e, id) {
    e.stopPropagation();
    const wrap = document.getElementById(`share-wrap-${id}`);
    const isOpen = wrap.classList.contains('open');
    document.querySelectorAll('.share-dropdown-wrapper.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) wrap.classList.add('open');
}

function shareToGitHub(id) {
    const s = allSnippets.find(item => item.id === id);
    if (!s) return;
    navigator.clipboard.writeText(s.code);
    showToast('Code copied! Opening GitHub Gist...');
    window.open('https://gist.github.com/', '_blank');
}

function shareToLinkedIn(id) {
    const s = allSnippets.find(item => item.id === id);
    if (!s) return;
    const postText = `Check out this ${s.language.toUpperCase()} snippet: "${s.title}"\n\n${s.code}`;
    navigator.clipboard.writeText(postText);
    showToast('Snippet copied! Opening LinkedIn...');
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postText)}`, '_blank');
}

function copyFormattedShare(id) {
    const s = allSnippets.find(item => item.id === id);
    if (!s) return;
    const formatted = `### ${s.title} (${s.language})\n\`\`\`${s.language}\n${s.code}\n\`\`\``;
    navigator.clipboard.writeText(formatted);
    showToast('Markdown snippet copied to clipboard!');
}

function copyCode(id) {
    const s = allSnippets.find(item => item.id === id);
    if (!s) return;
    navigator.clipboard.writeText(s.code);
    showToast('Code copied to clipboard!');
}

async function toggleFavorite(id) {
    await fetch(`/api/snippets/${id}/favorite`, { method: 'POST' });
    fetchSnippets();
}

function editSnippet(id) {
    const s = allSnippets.find(item => item.id === id);
    if (s) openDrawer(s);
}

async function deleteSnippet(id) {
    if (!confirm('Are you sure you want to delete this snippet?')) return;
    await fetch(`/api/snippets/${id}`, { method: 'DELETE' });
    showToast('Snippet deleted');
    fetchSnippets();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const editingId = document.getElementById('editingId').value;
    const payload = {
        title: document.getElementById('title').value,
        language: document.getElementById('language').value,
        folder: document.getElementById('folder').value,
        tags: document.getElementById('tags').value,
        code: document.getElementById('code').value
    };

    if (editingId) {
        await fetch(`/api/snippets/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        showToast('Snippet updated successfully!');
    } else {
        await fetch('/api/snippets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        showToast('New snippet saved!');
    }

    closeDrawer();
    fetchSnippets();
}

async function runAiAction(id, mode) {
    const s = allSnippets.find(item => item.id === id);
    const aiBox = document.getElementById(`ai-box-${id}`);
    if (!s || !aiBox) return;

    if (aiBox.style.display === 'block' && aiBox.getAttribute('data-last-mode') === mode) {
        aiBox.style.display = 'none';
        return;
    }

    aiBox.setAttribute('data-last-mode', mode);
    aiBox.style.display = 'block';
    aiBox.innerHTML = `<div class="ai-shimmer"></div>`;

    const isFix = mode === 'fix';
    const customPrompt = isFix
        ? `Find any syntax errors, logic bugs, or security issues in this ${s.language} code and provide the corrected, bug-free version with a brief summary of what was fixed:\n\n${s.code}`
        : `Explain clearly and concisely how this ${s.language} code works, step by step:\n\n${s.code}`;

    const payload = {
        code: s.code,
        language: s.language,
        mode: mode,
        action: mode,
        prompt: customPrompt
    };

    try {
        const primaryEndpoint = isFix ? '/api/fix' : '/api/explain';
        let res = await fetch(primaryEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.status === 404) {
            res = await fetch('/api/explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        const data = await res.json();

        if (!res.ok) {
            aiBox.innerHTML = `<span style="color: #E26D5C; font-weight: 700;">Error:</span> ${escapeHtml(data.error || 'Server error occurred.')}`;
            return;
        }

        const headerBadge = isFix
            ? `<div style="font-weight: 800; color: #E26D5C; margin-bottom: 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Bug Analysis & Fix</div>`
            : `<div style="font-weight: 800; color: #E26D5C; margin-bottom: 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">AI Code Explanation</div>`;

        const output = data.explanation || data.result || data.response || data.output;
        if (output) {
            const formattedOutput = escapeHtml(output)
                .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="margin-top:8px;"><code>$1</code></pre>')
                .replace(/\n/g, '<br>');
            aiBox.innerHTML = headerBadge + formattedOutput;
        } else {
            aiBox.innerHTML = 'No response received from AI.';
        }
    } catch (err) {
        console.error('AI Action Error:', err);
        aiBox.innerHTML = `<span style="color: #E26D5C; font-weight: 700;">Connection Error:</span> Could not reach Flask AI endpoint.`;
    }
}

function exportSnippets() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allSnippets, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "devpocket_snippets_backup.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Backup exported!');
}

function importSnippets(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            for (const item of imported) {
                await fetch('/api/snippets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
            }
            showToast('Snippets imported successfully!');
            fetchSnippets();
        } catch (err) {
            showToast('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
}

function getDeviconClass(lang) {
    const map = {
        python: 'devicon-python-plain colored',
        javascript: 'devicon-javascript-plain colored',
        typescript: 'devicon-typescript-plain colored',
        html: 'devicon-html5-plain colored',
        css: 'devicon-css3-plain colored',
        react: 'devicon-react-original colored',
        vuejs: 'devicon-vuejs-plain colored',
        nodejs: 'devicon-nodejs-plain colored',
        php: 'devicon-php-plain colored',
        cpp: 'devicon-cplusplus-plain colored',
        csharp: 'devicon-csharp-plain colored',
        java: 'devicon-java-plain colored',
        go: 'devicon-go-original-wordmark colored',
        rust: 'devicon-rust-plain',
        sql: 'devicon-sqldeveloper-plain colored',
        bash: 'devicon-bash-plain'
    };
    return map[(lang || '').toLowerCase()] || 'devicon-devicon-plain';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}