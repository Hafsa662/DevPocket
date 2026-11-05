const langIconMap = {
    python: '<i class="devicon-python-plain colored"></i>',
    javascript: '<i class="devicon-javascript-plain colored"></i>',
    typescript: '<i class="devicon-typescript-plain colored"></i>',
    html: '<i class="devicon-html5-plain colored"></i>',
    css: '<i class="devicon-css3-plain colored"></i>',
    react: '<i class="devicon-react-original colored"></i>',
    vuejs: '<i class="devicon-vuejs-plain colored"></i>',
    nodejs: '<i class="devicon-nodejs-plain colored"></i>',
    php: '<i class="devicon-php-plain colored"></i>',
    cpp: '<i class="devicon-cplusplus-plain colored"></i>',
    csharp: '<i class="devicon-csharp-plain colored"></i>',
    java: '<i class="devicon-java-plain colored"></i>',
    go: '<i class="devicon-go-original-wordmark colored"></i>',
    rust: '<i class="devicon-rust-plain"></i>',
    sql: '<i class="devicon-sqldeveloper-plain colored"></i>',
    bash: '<i class="devicon-bash-plain"></i>'
};

const langExtensionMap = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    html: 'html',
    css: 'css',
    react: 'jsx',
    vuejs: 'vue',
    nodejs: 'js',
    php: 'php',
    cpp: 'cpp',
    csharp: 'cs',
    java: 'java',
    go: 'go',
    rust: 'rs',
    sql: 'sql',
    bash: 'sh'
};

let allSnippets = [];
let selectedFilterLang = "all";

document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active-section"));

            btn.classList.add("active");
            const target = document.getElementById(btn.getAttribute("data-tab"));
            target.classList.add("active-section");
        });
    });

    const darkModeToggle = document.getElementById("darkModeToggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerText = "🌙";
    } else {
        darkModeToggle.innerText = "🌞";
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            darkModeToggle.innerText = "🌙";
        } else {
            darkModeToggle.innerText = "🌞";
        }
        localStorage.setItem("theme", theme);
    });

    const customThemeDropdown = document.getElementById("customThemeDropdown");
    const themeTrigger = document.getElementById("themeTrigger");
    const selectedThemeLabel = document.getElementById("selectedThemeLabel");
    const themeOptions = document.querySelectorAll(".theme-option");
    const syntaxThemeSelect = document.getElementById("syntaxThemeSelect");
    const hljsThemeLink = document.getElementById("hljs-theme");

    const savedSyntaxTheme = localStorage.getItem("syntaxTheme") || "atom-one-dark";
    syntaxThemeSelect.value = savedSyntaxTheme;
    hljsThemeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${savedSyntaxTheme}.min.css`;

    themeOptions.forEach(opt => {
        if(opt.getAttribute("data-value") === savedSyntaxTheme) {
            selectedThemeLabel.innerText = opt.innerText;
        }
    });

    themeTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        customThemeDropdown.classList.toggle("open");
    });

    themeOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            const themeVal = opt.getAttribute("data-value");
            selectedThemeLabel.innerText = opt.innerText;
            syntaxThemeSelect.value = themeVal;
            customThemeDropdown.classList.remove("open");

            hljsThemeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${themeVal}.min.css`;
            localStorage.setItem("syntaxTheme", themeVal);
        });
    });

    const customSelect = document.getElementById("customSelect");
    const selectTrigger = customSelect.querySelector(".select-trigger");
    const selectedLabel = document.getElementById("selectedLabel");
    const hiddenInput = document.getElementById("language");
    const options = customSelect.querySelectorAll(".custom-option");

    selectTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        customSelect.classList.toggle("open");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const value = option.getAttribute("data-value");
            selectedLabel.innerHTML = option.innerHTML;
            hiddenInput.value = value;
            customSelect.classList.remove("open");
        });
    });

    const langFilterWrapper = document.getElementById("langFilterWrapper");
    const langFilterTrigger = document.getElementById("langFilterTrigger");
    const langFilterLabel = document.getElementById("langFilterLabel");
    const langFilterOptions = document.querySelectorAll("#langFilterOptions .filter-option");

    langFilterTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        langFilterWrapper.classList.toggle("open");
    });

    langFilterOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            selectedFilterLang = opt.getAttribute("data-value");
            langFilterLabel.innerHTML = opt.innerHTML;
            langFilterWrapper.classList.remove("open");
            filterSnippets();
        });
    });

    window.addEventListener("click", () => {
        customSelect.classList.remove("open");
        langFilterWrapper.classList.remove("open");
        customThemeDropdown.classList.remove("open");
    });

    const form = document.getElementById("snippetForm");
    const searchInput = document.getElementById("searchInput");
    const filterFolder = document.getElementById("filterFolder");
    const togglePinnedFilterBtn = document.getElementById("togglePinnedFilterBtn");

    const saveModal = document.getElementById("saveModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    let showPinnedOnly = false;

    togglePinnedFilterBtn.addEventListener("click", () => {
        showPinnedOnly = !showPinnedOnly;
        togglePinnedFilterBtn.classList.toggle("active", showPinnedOnly);
        filterSnippets();
    });

    modalCloseBtn.addEventListener("click", () => {
        saveModal.classList.remove("active");
        document.querySelector('[data-tab="libraryTab"]').click();
    });

    const path = window.location.pathname;
    if (path.startsWith('/share/')) {
        const snippetId = path.split('/share/')[1];
        if (snippetId) {
            document.querySelector('[data-tab="libraryTab"]').click();
            fetchSingleSharedSnippet(snippetId);
        }
    } else {
        fetchSnippets();
    }

    searchInput.addEventListener("input", filterSnippets);
    filterFolder.addEventListener("change", filterSnippets);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const language = hiddenInput.value;
        const folder = document.getElementById("folder").value;
        const tags = document.getElementById("tags").value;
        const code = document.getElementById("code").value;
        const editId = document.getElementById("editingId").value;

        if (editId) {
            await fetch(`/api/snippets/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, language, folder, tags, code })
            });
            document.getElementById("editingId").value = "";
            document.getElementById("submitBtn").innerText = "Save Snippet";
            document.getElementById("formTitle").innerText = "Create New Snippet";
            document.getElementById("modalTitle").innerText = "Snippet Updated!";
            document.getElementById("modalMessage").innerText = `"${title}" has been updated successfully.`;
        } else {
            await fetch('/api/snippets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, language, folder, tags, code })
            });
            document.getElementById("modalTitle").innerText = "Snippet Saved!";
            document.getElementById("modalMessage").innerText = `"${title}" has been added to your DevPocket library.`;
        }

        searchInput.value = "";
        filterFolder.value = "all";
        selectedFilterLang = "all";
        document.getElementById("langFilterLabel").innerHTML = "🌐 All Languages";

        form.reset();
        selectedLabel.innerHTML = `${langIconMap['python']} Python`;
        hiddenInput.value = "python";
        
        await fetchSnippets();
        saveModal.classList.add("active");
    });
});

async function fetchSnippets() {
    const response = await fetch('/api/snippets');
    allSnippets = await response.json();
    updateFoldersDropdown();
    filterSnippets();
}

async function fetchSingleSharedSnippet(id) {
    const grid = document.getElementById("snippetsGrid");
    try {
        const response = await fetch(`/api/snippets/${id}`);
        if (response.ok) {
            const snippet = await response.json();
            grid.innerHTML = "";
            
            const banner = document.createElement("div");
            banner.style.cssText = "background: var(--btn-bg); border: 1px solid var(--border-color); padding: 12px 20px; border-radius: 16px; margin-bottom: 20px; text-align: center; font-size: 14px;";
            banner.innerHTML = `🔗 You are viewing a shared snippet. <a href="/" style="color: var(--accent); font-weight: 600; text-decoration: none; margin-left: 8px;">View All Library Snippets →</a>`;
            grid.appendChild(banner);

            renderSnippets([snippet]);
        } else {
            grid.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Shared snippet not found or has been deleted.</p>`;
        }
    } catch (e) {
        grid.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Error loading shared snippet.</p>`;
    }
}

function updateFoldersDropdown() {
    const filterFolder = document.getElementById("filterFolder");
    const currentVal = filterFolder.value;
    const folders = new Set();
    allSnippets.forEach(s => {
        if (s.folder) folders.add(s.folder);
    });

    filterFolder.innerHTML = `<option value="all">📁 All Folders</option>`;
    folders.forEach(f => {
        filterFolder.innerHTML += `<option value="${f}">📁 ${f}</option>`;
    });
    filterFolder.value = currentVal;
}

function renderSnippets(snippets) {
    const grid = document.getElementById("snippetsGrid");
    grid.innerHTML = "";
    if (snippets.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 40px;">No snippets found.</p>`;
        return;
    }

    let pinnedIds = JSON.parse(localStorage.getItem("pinnedSnippets")) || [];

    snippets.sort((a, b) => {
        const aPinned = pinnedIds.includes(a.id);
        const bPinned = pinnedIds.includes(b.id);
        return bPinned - aPinned;
    });

    snippets.forEach(s => {
        let tagsHTML = "";
        if (s.tags) {
            const tagList = s.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
            if (tagList.length > 0) {
                tagsHTML = `<div class="card-tags">` + tagList.map(t => `<span class="tag-badge">#${t}</span>`).join('') + `</div>`;
            }
        }

        const isPinned = pinnedIds.includes(s.id);
        const iconHTML = langIconMap[s.language] || '';
        const folderHTML = s.folder ? `<span class="folder-badge">📁 ${s.folder}</span>` : '';

        const card = document.createElement("div");
        card.className = `card ${isPinned ? 'pinned-card' : ''}`;
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title-meta">
                    <button class="pin-star-btn" onclick="togglePinSnippet(${s.id})" title="${isPinned ? 'Unpin' : 'Pin to Top'}">
                        ${isPinned ? '⭐' : '☆'}
                    </button>
                    <h3>${s.title}</h3>
                </div>
                <div class="card-meta-right">
                    ${folderHTML}
                    <span class="lang-badge">${iconHTML} <strong>${s.language.toUpperCase()}</strong></span>
                </div>
            </div>
            ${tagsHTML}
            <pre><code class="language-${s.language}">${escapeHTML(s.code)}</code></pre>
            <button class="expand-code-btn" onclick="toggleCodeHeight(this)">▼ Show More Code</button>
            
            <div class="card-actions">
                <button class="action-btn" onclick="copyCode(this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                    Copy
                </button>
                <button class="action-btn" onclick="downloadSnippet('${escapeQuotes(s.title)}', '${s.language}', this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download
                </button>
                <button class="action-btn" onclick="shareSnippet(${s.id}, this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    Share
                </button>

                <button class="action-btn ai-special" onclick="explainWithAI(${s.id}, this)">
                    <svg viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="8.5" cy="16" r="1.5" fill="currentColor"></circle><circle cx="15.5" cy="16" r="1.5" fill="currentColor"></circle><path d="M12 2v4M8 2h8M12 7a2 2 0 0 1 2 2v2H10V9a2 2 0 0 1 2-2z"></path></svg>
                    Ask AI
                </button>

                <button class="action-btn ai-special" onclick="fixBugsWithAI(${s.id}, this)">
                    <svg viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2v4M8 4h8M12 18v4M4 12h16M7 7l10 10M17 7L7 17"></path></svg>
                    Fix Bugs
                </button>
                <button class="action-btn ai-special" onclick="refactorWithAI(${s.id}, this)">
                    <svg viewBox="0 0 24 24" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    Refactor
                </button>

                <button class="action-btn" onclick="editSnippet(${s.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    Edit
                </button>
                <button class="action-btn delete-btn" onclick="deleteSnippet(${s.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Delete
                </button>
            </div>
            
            <div class="ai-explanation" id="ai-exp-${s.id}" style="display:none;"></div>
        `;
        grid.appendChild(card);
    });

    hljs.highlightAll();
}

// --- GLOBAL ATTACHED FUNCTIONS FOR 100% RELIABILITY ---

window.editSnippet = async function(id) {
    try {
        const response = await fetch(`/api/snippets/${id}`);
        if (response.ok) {
            const s = await response.json();
            
            document.getElementById("editingId").value = s.id;
            document.getElementById("title").value = s.title;
            document.getElementById("folder").value = s.folder || '';
            document.getElementById("tags").value = s.tags || '';
            document.getElementById("code").value = s.code;
            document.getElementById("language").value = s.language;
            
            const iconHTML = langIconMap[s.language] || '';
            const formattedName = s.language.charAt(0).toUpperCase() + s.language.slice(1);
            document.getElementById("selectedLabel").innerHTML = `${iconHTML} ${formattedName}`;
            document.getElementById("submitBtn").innerText = "Update Snippet";
            document.getElementById("formTitle").innerText = "Edit Snippet";

            document.querySelector('[data-tab="createTab"]').click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (err) {
        alert("Error loading snippet for editing.");
    }
}

window.explainWithAI = async function(snippetId, btn) {
    const card = btn.closest('.card');
    const code = card.querySelector('pre code').innerText;
    const language = card.querySelector('.lang-badge strong').innerText.toLowerCase();
    const expDiv = document.getElementById(`ai-exp-${snippetId}`);

    btn.innerText = "Thinking...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language })
        });
        const data = await response.json();
        
        expDiv.style.display = "block";
        expDiv.innerHTML = `<strong>✨ Gemini AI Analysis:</strong><p>${data.explanation.replace(/\n/g, '<br>')}</p>`;
    } catch (err) {
        expDiv.style.display = "block";
        expDiv.innerHTML = `<p style="color: red;">Error connecting to AI.</p>`;
    } finally {
        btn.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="8.5" cy="16" r="1.5" fill="currentColor"></circle><circle cx="15.5" cy="16" r="1.5" fill="currentColor"></circle><path d="M12 2v4M8 2h8M12 7a2 2 0 0 1 2 2v2H10V9a2 2 0 0 1 2-2z"></path></svg> Ask AI`;
        btn.disabled = false;
    }
}

window.fixBugsWithAI = async function(snippetId, btn) {
    const card = btn.closest('.card');
    const code = card.querySelector('pre code').innerText;
    const language = card.querySelector('.lang-badge strong').innerText.toLowerCase();
    const expDiv = document.getElementById(`ai-exp-${snippetId}`);

    btn.innerText = "Fixing...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/fix-bugs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language })
        });
        const data = await response.json();
        
        expDiv.style.display = "block";
        expDiv.innerHTML = `<strong>🐛 Bug Fix Analysis & Corrected Code:</strong><p>${data.solution.replace(/\n/g, '<br>')}</p>`;
    } catch (err) {
        expDiv.style.display = "block";
        expDiv.innerHTML = `<p style="color: red;">Error processing request.</p>`;
    } finally {
        btn.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2v4M8 4h8M12 18v4M4 12h16M7 7l10 10M17 7L7 17"></path></svg> Fix Bugs`;
        btn.disabled = false;
    }
}

window.refactorWithAI = async function(snippetId, btn) {
    const card = btn.closest('.card');
    const code = card.querySelector('pre code').innerText;
    const language = card.querySelector('.lang-badge strong').innerText.toLowerCase();
    const expDiv = document.getElementById(`ai-exp-${snippetId}`);

    btn.innerText = "Refactoring...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/refactor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language })
        });
        const data = await response.json();
        
        expDiv.style.display = "block";
        expDiv.innerHTML = `<strong>⚡ Refactored & Optimized Code:</strong><p>${data.solution.replace(/\n/g, '<br>')}</p>`;
    } catch (err) {
        expDiv.style.display = "block";
        expDiv.innerHTML = `<p style="color: red;">Error processing request.</p>`;
    } finally {
        btn.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Refactor`;
        btn.disabled = false;
    }
}

window.togglePinSnippet = function(id) {
    let pinnedIds = JSON.parse(localStorage.getItem("pinnedSnippets")) || [];
    if (pinnedIds.includes(id)) {
        pinnedIds = pinnedIds.filter(pId => pId !== id);
    } else {
        pinnedIds.push(id);
    }
    localStorage.setItem("pinnedSnippets", JSON.stringify(pinnedIds));
    filterSnippets();
};

function filterSnippets() {
    const searchInput = document.getElementById("searchInput");
    const filterFolder = document.getElementById("filterFolder");
    const togglePinnedFilterBtn = document.getElementById("togglePinnedFilterBtn");

    const searchTerm = searchInput.value.toLowerCase();
    const selectedFolder = filterFolder.value;
    const showPinnedOnly = togglePinnedFilterBtn.classList.contains("active");

    const filtered = allSnippets.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchTerm) || 
                              (s.tags && s.tags.toLowerCase().includes(searchTerm)) ||
                              (s.folder && s.folder.toLowerCase().includes(searchTerm));
        const matchesLang = (selectedFilterLang === "all" || s.language === selectedFilterLang);
        const matchesFolder = (selectedFolder === "all" || s.folder === selectedFolder);
        let pinnedIds = JSON.parse(localStorage.getItem("pinnedSnippets")) || [];
        const matchesPinned = showPinnedOnly ? pinnedIds.includes(s.id) : true;

        return matchesSearch && matchesLang && matchesFolder && matchesPinned;
    });

    renderSnippets(filtered);
}

window.toggleCodeHeight = function(btn) {
    const preTag = btn.previousElementSibling;
    if (preTag.classList.contains('expanded')) {
        preTag.classList.remove('expanded');
        btn.innerText = "▼ Show More Code";
    } else {
        preTag.classList.add('expanded');
        btn.innerText = "▲ Show Less";
    }
}

window.copyCode = function(btn) {
    const code = btn.closest('.card').querySelector('pre code').innerText;
    navigator.clipboard.writeText(code);
    btn.innerHTML = `✓ Copied`;
    setTimeout(() => {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> Copy`;
    }, 2000);
}

window.downloadSnippet = function(title, language, btn) {
    const card = btn.closest('.card');
    const code = card.querySelector('pre code').innerText;
    const ext = langExtensionMap[language.toLowerCase()] || 'txt';
    const cleanTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    const filename = `${cleanTitle}.${ext}`;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

window.shareSnippet = function(snippetId, btn) {
    const shareUrl = `${window.location.origin}/share/${snippetId}`;
    navigator.clipboard.writeText(shareUrl);
    
    btn.innerHTML = `✓ Copied Link`;
    setTimeout(() => {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Share`;
    }, 2000);
}

window.exportSnippets = function() {
    fetch('/api/snippets')
        .then(res => res.json())
        .then(data => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'devpocket_backup.json';
            a.click();
            URL.revokeObjectURL(url);
        });
}

window.importSnippets = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const snippets = JSON.parse(e.target.result);
            await fetch('/api/snippets/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ snippets })
            });
            alert("Library imported successfully!");
            location.reload();
        } catch (err) {
            alert("Invalid JSON backup file!");
        }
    };
    reader.readAsText(file);
}

window.deleteSnippet = async function(id) {
    if (confirm("Kya aap waqai is snippet ko delete karna chahte hain?")) {
        await fetch(`/api/snippets/${id}`, { method: 'DELETE' });
        location.reload();
    }
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeQuotes(str) {
    return (str || '').replace(/'/g, "\\'");
}