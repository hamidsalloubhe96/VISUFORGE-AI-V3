/* =============================================
   VISUFORGE AI — SCRIPT.JS
   Logique complète + Analyser un Design
   ============================================= */

/* ─── STATE ─── */
let state = {
    platform:       "Midjourney",
    exportPlatform: "midjourney",
    activeVariant:  "quick",
    prompts:        [],
    currentPrompt:  "",
    variants:       null,
    autoAssets:     [],
    analyses:       [],
    dna: {
        palette: "noir-or",
        typo:    "serif-luxe",
        assets:  [],
    },
};

/* ─── SONS ─── */
function jouerSon(type) {
    try {
        const son = new Audio(`sounds/${type}.mp3`);
        son.volume = 0.7;
        son.play();
    } catch(e) {}
}

/* ─── INIT ─── */
window.onload = function () {
    chargerLocal();
    updateCounters();
    renderHistoryGrid();
    updateExportPreview();
    syncPlatformBadge();
    loadDNAState();
    initUploadZone();
};

/* ============================================
   NAVIGATION
   ============================================ */

const PAGE_META = {
    dashboard: { title: "Tableau de bord",          sub: "Vue d'ensemble de votre activité créative" },
    studio:    { title: "Prompt Studio",             sub: "Générez des prompts pour Midjourney, Leonardo & DALL-E" },
    visual:    { title: "ADN Visuel",                sub: "Configurez votre identité visuelle — palette, typo, assets" },
    campaign:  { title: "Constructeur de Campagne",  sub: "Générez une séquence de 3 prompts coordonnés" },
    assets:    { title: "Assets Premium",            sub: "Bibliothèque d'assets liés à votre secteur actif" },
    export:    { title: "Centre d'Export",           sub: "Exportez vos prompts formatés par plateforme" },
    history:   { title: "Historique",                sub: "Historique complet de vos prompts générés" },
    analyzer:  { title: "Analyser un Design",        sub: "Importez une image et récupérez son prompt automatiquement" },
    settings:  { title: "Paramètres",                sub: "Configuration générale et gestion des données" },
};

function showPage(page, el) {
    document.querySelectorAll(".page-section").forEach(s => s.classList.remove("active-section"));
    document.getElementById("page-" + page).classList.add("active-section");

    document.querySelectorAll(".menu li").forEach(m => m.classList.remove("active"));
    if (el) el.classList.add("active");

    const meta = PAGE_META[page] || {};
    document.getElementById("pageTitle").textContent    = meta.title || page;
    document.getElementById("pageSubtitle").textContent = meta.sub   || "";

    if (page === "assets")  renderAssetsPage();
    if (page === "history") renderHistoryGrid();
    if (page === "export")  updateExportPreview();

    if (window.innerWidth < 850) {
        document.getElementById("sidebar").classList.remove("show");
    }
}

/* ============================================
   PLATEFORME
   ============================================ */

function selectPlatform(btn, platform) {
    document.querySelectorAll(".plat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.platform = platform;
    syncPlatformBadge();
    jouerSon("success");
    notifier("Plateforme : " + platform);
}

function setPlatform(platform) {
    state.platform = platform;
    document.querySelectorAll(".platform-item").forEach(item => {
        item.classList.remove("active");
        const p = item.querySelector("p");
        if (p && p.textContent.trim() === platform) item.classList.add("active");
    });
    syncPlatformBadge();
    jouerSon("success");
    notifier("Plateforme active : " + platform);
}

function syncPlatformBadge() {
    const badge = document.getElementById("activePlatform");
    if (badge) badge.textContent = state.platform;
}

/* ============================================
   SECTEUR — AUTO-REMPLISSAGE & COMPATIBILITÉ
   ============================================ */

function onSectorChange() {
    const sector = document.getElementById("niche").value;
    autoRemplir(sector);
    renderSmartAssets(sector);
    verifierCompatibilite();
    renderAssetsPage();
}

function autoRemplir(sector) {
    const defaults = SECTOR_DEFAULTS[sector];
    if (!defaults) return;

    const champs = ["visuel", "style", "couleur", "format", "modeia"];
    champs.forEach(id => {
        const el = document.getElementById(id);
        if (el && defaults[id]) el.value = defaults[id];
    });

    if (defaults.typo) {
        state.dna.typo = defaults.typo;
        document.querySelectorAll(".typo-option").forEach(el => {
            el.classList.toggle("selected", el.dataset.typo === defaults.typo);
        });
    }

    if (defaults.couleur) {
        state.dna.palette = defaults.couleur;
        document.querySelectorAll(".color-option").forEach(el => {
            el.classList.toggle("selected", el.dataset.palette === defaults.couleur);
        });
    }

    jouerSon("success");
    notifier("Champs configurés pour " + (SECTORS[sector]?.label || sector));
}

function verifierCompatibilite() {
    const sector  = document.getElementById("niche")?.value;
    const style   = document.getElementById("style")?.value;
    const couleur = document.getElementById("couleur")?.value;
    const bar     = document.getElementById("compatibilityBar");
    const msg     = document.getElementById("compatMessage");

    if (!bar || !sector || !COMPATIBILITY[sector]) return;

    bar.style.display = "flex";
    const compat    = COMPATIBILITY[sector];
    const styleOk   = compat.styles.includes(style);
    const paletteOk = compat.palettes.includes(couleur);

    bar.className = "compatibility-bar";

    if (styleOk && paletteOk) {
        bar.classList.add("compat-ok");
        msg.textContent = "Combinaison optimale pour ce secteur ✓";
    } else if (styleOk || paletteOk) {
        bar.classList.add("compat-warn");
        msg.textContent = !styleOk
            ? "⚠ Le style choisi est peu adapté à ce secteur"
            : "⚠ La palette choisie est peu adaptée à ce secteur";
        jouerSon("error");
    } else {
        bar.classList.add("compat-bad");
        msg.textContent = "✕ Style et palette non recommandés pour ce secteur";
        jouerSon("error");
    }
}

/* ============================================
   GÉNÉRATION PROMPT
   ============================================ */

function genererPrompt() {
    const sector  = document.getElementById("niche").value;
    const visuel  = document.getElementById("visuel").value;
    const style   = document.getElementById("style").value;
    const couleur = document.getElementById("couleur").value;
    const format  = document.getElementById("format").value;
    const modeia  = document.getElementById("modeia").value;
    const marque  = document.getElementById("marque").value.trim();
    const promo   = document.getElementById("promo").value.trim();
    const prix    = document.getElementById("prix").value.trim();
    const cta     = document.getElementById("cta").value.trim();

    if (!marque && !promo) {
        jouerSon("error");
        notifier("Ajoutez au moins un nom de marque ou un message");
        return;
    }

    const intro         = SECTOR_INTRO[sector]        || "Create a premium commercial visual.";
    const styleData     = STYLES[style]                || { en: style };
    const paletteData   = PALETTES[couleur]             || { en: couleur };
    const modeBoost     = MODE_BOOST[modeia]            || "";
    const platformParam = (PLATFORM_PARAMS[state.platform] || {})[format] || "";
    const typoData      = TYPOGRAPHIES[state.dna.typo]  || { en: "" };

    const autoA     = getAutoAssets(sector);
    const manualA   = getDNAAssets();
    const allAssets = [...new Set([...autoA, ...manualA, ...state.autoAssets])];
    const assetsStr = allAssets.length ? allAssets.join(", ") : "";

    const brandCtx = [
        marque && `Marque : ${marque}`,
        promo  && `Message : "${promo}"`,
        prix   && `Offre : ${prix}`,
        cta    && `CTA : "${cta}"`,
    ].filter(Boolean).join(". ");

    const baseCore = `${intro} Style : ${styleData.en}. Palette : ${paletteData.en}. ${brandCtx ? brandCtx + "." : ""}`;

    const variants = {
        quick:  buildQuickPrompt(baseCore, assetsStr, platformParam),
        ad:     buildAdPrompt(baseCore, visuel, assetsStr, modeBoost, platformParam),
        cinema: buildCinemaPrompt(baseCore, assetsStr, platformParam),
        native: buildNativePrompt(baseCore, visuel, assetsStr, typoData, modeBoost, platformParam),
    };

    state.currentPrompt = variants[state.activeVariant];
    state.variants      = variants;
    state.autoAssets    = allAssets;

    document.getElementById("resultat").value = state.currentPrompt;

    runDoctorIA(state.currentPrompt);
    updatePreview(sector, promo || SECTORS[sector]?.label, prix, cta, style);
    renderActiveAssets(allAssets);

    const entry = {
        text:     state.currentPrompt,
        sector:   sector,
        style:    style,
        platform: state.platform,
        format:   format,
        marque:   marque,
        date:     new Date().toLocaleDateString("fr-FR"),
        favori:   false,
    };

    state.prompts.unshift(entry);
    sauvegarderLocal();
    updateCounters();
    updateLastPromptDashboard(state.currentPrompt);
    jouerSon("success");
    notifier("Prompt généré ✓");
}

/* ─── CONSTRUCTEURS DE VARIANTES ─── */

function buildQuickPrompt(core, assets, params) {
    return [
        core,
        assets && `Éléments techniques : ${assets}.`,
        "Ultra net, photographie commerciale professionnelle.",
        params,
    ].filter(Boolean).join(" ").trim();
}

function buildAdPrompt(core, visuel, assets, boost, params) {
    return [
        core,
        `Type de visuel : ${visuel}.`,
        assets && `Assets : ${assets}.`,
        "Composition parfaite, mise en page ultra équilibrée, qualité publicité commerciale.",
        boost,
        params,
    ].filter(Boolean).join(" ").trim();
}

function buildCinemaPrompt(core, assets, params) {
    return [
        core,
        assets && `Assets cinématiques : ${assets}.`,
        "Profondeur de champ cinématique, anamorphic lens flare, étalonnage couleur Hollywood, grain de film, jeu d'ombres dramatique.",
        "Tourné sur caméra RED, post-production DaVinci Resolve.",
        params,
    ].filter(Boolean).join(" ").trim();
}

function buildNativePrompt(core, visuel, assets, typo, boost, params) {
    return [
        core,
        `Visuel : ${visuel}. Typographie : ${typo.en || "police premium"}.`,
        assets && `Assets : ${assets}.`,
        boost,
        "Hyperréaliste, qualité 8K, rendu commercial parfait.",
        params,
    ].filter(Boolean).join(" ").trim();
}

/* ─── VARIANTES TABS ─── */
function showVariant(btn, variant) {
    document.querySelectorAll(".var-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.activeVariant = variant;

    if (state.variants && state.variants[variant]) {
        state.currentPrompt = state.variants[variant];
        document.getElementById("resultat").value = state.currentPrompt;
        runDoctorIA(state.currentPrompt);
    }
}

/* ─── OPTIMISER ─── */
function optimiserPrompt() {
    const current = document.getElementById("resultat").value;
    if (!current.trim()) {
        jouerSon("error");
        notifier("Aucun prompt à optimiser");
        return;
    }

    const sector    = document.getElementById("niche").value;
    const data      = SECTOR_ASSETS[sector];
    const manquants = [];

    if (data) {
        if (!current.includes("lighting") && !current.includes("light") && data.lighting?.[0])
            manquants.push(data.lighting[0]);
        if (!current.includes("lens") && !current.includes("camera") && !current.includes("angle") && data.camera?.[0])
            manquants.push(data.camera[0]);
        if (!current.includes("texture") && !current.includes("surface") && !current.includes("finish") && data.texture?.[0])
            manquants.push(data.texture[0]);
        if (!current.includes("mood") && !current.includes("atmosphere") && !current.includes("tone") && data.mood?.[0])
            manquants.push(data.mood[0]);
    }

    const boosts = [
        "Qualité photographique hyperréaliste.",
        "Prise de vue Hasselblad moyen format.",
        "Post-traitement Adobe Lightroom, ultra color-grading.",
        "Photographie commerciale primée.",
        "Ultra-détaillé, résolution 8K.",
    ];
    const boost = boosts[Math.floor(Math.random() * boosts.length)];

    let optimized = current;
    if (manquants.length) optimized += " " + manquants.join(", ") + ".";
    optimized += " " + boost;

    document.getElementById("resultat").value = optimized;
    state.currentPrompt = optimized;
    if (state.variants) state.variants[state.activeVariant] = optimized;

    const allAssets = [...new Set([...state.autoAssets, ...manquants])];
    state.autoAssets = allAssets;
    renderActiveAssets(allAssets);

    runDoctorIA(optimized);
    jouerSon("success");
    notifier(manquants.length
        ? `Optimisé — ${manquants.length} asset(s) injecté(s) ✓`
        : "Prompt boosté ✓"
    );
}

/* ============================================
   DOCTOR IA
   ============================================ */

function runDoctorIA(prompt) {
    const box = document.getElementById("doctorIA");
    if (!box) return;
    box.style.display = "block";

    let score = 60;
    const issues = [];

    DOCTOR_RULES.forEach(rule => {
        if (rule.check(prompt)) {
            score += rule.score;
            if (rule.advice) issues.push(rule.advice);
        }
    });

    score = Math.max(0, Math.min(100, score));

    const badge  = document.getElementById("iaScore");
    const advice = document.getElementById("iaAdvice");

    badge.textContent = score + "/100";
    badge.className   = "score-badge " + (score >= 75 ? "score-good" : score >= 50 ? "score-avg" : "score-low");

    advice.textContent = issues.length > 0
        ? "⚠ " + issues[0]
        : score >= 75
            ? "✓ Prompt de qualité premium. Prêt pour génération."
            : "✓ Prompt correct. Utilisez Optimiser pour améliorer.";
}

/* ============================================
   ASSETS INTELLIGENTS
   ============================================ */

function getAutoAssets(sector) {
    const data = SECTOR_ASSETS[sector];
    if (!data) return [];
    return [
        ...(data.lighting || []).slice(0, 1),
        ...(data.camera   || []).slice(0, 1),
        ...(data.texture  || []).slice(0, 1),
        ...(data.mood     || []).slice(0, 1),
    ];
}

function getDNAAssets() {
    const all = [];
    ["lightingAssets", "cameraAssets", "textureAssets", "moodAssets"].forEach(id => {
        const container = document.getElementById(id);
        if (!container) return;
        container.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
            all.push(cb.value);
        });
    });
    return all;
}

function renderSmartAssets(sector) {
    const container = document.getElementById("assetsTags");
    const hint      = document.querySelector(".assets-hint");
    if (!container) return;

    const data = SECTOR_ASSETS[sector];
    if (!data) { container.innerHTML = ""; return; }
    if (hint) hint.style.display = "none";

    const autoAssets = getAutoAssets(sector);
    state.autoAssets = autoAssets;

    container.innerHTML =
        autoAssets.map(a =>
            `<span class="asset-tag active-tag" title="Asset auto-injecté">
                <i class="fas fa-check"></i> ${a}
            </span>`
        ).join("") +
        (data.extra || []).map(a =>
            `<span class="asset-tag extra-tag" onclick="toggleExtraAsset(this,'${a}')">
                <i class="fas fa-plus"></i> ${a}
            </span>`
        ).join("");
}

function toggleExtraAsset(el, value) {
    el.classList.toggle("active-tag");
    const isActive = el.classList.contains("active-tag");
    el.querySelector("i").className = isActive ? "fas fa-check" : "fas fa-plus";
    if (isActive) {
        state.autoAssets.push(value);
    } else {
        state.autoAssets = state.autoAssets.filter(a => a !== value);
    }
}

/* ─── ASSETS ACTIFS (panneau output) ─── */
function renderActiveAssets(assets) {
    const panel   = document.getElementById("activeAssetsPanel");
    const list    = document.getElementById("activeAssetsList");
    const countEl = document.getElementById("activeAssetsCount");
    const topbar  = document.getElementById("topbarAssetsCount");

    if (!panel || !list) return;

    if (!assets || !assets.length) {
        panel.style.display = "none";
        if (topbar) topbar.textContent = "0";
        return;
    }

    panel.style.display = "block";
    if (countEl) countEl.textContent = assets.length;
    if (topbar)  topbar.textContent  = assets.length;

    list.innerHTML = assets.map((a, i) => `
        <div class="active-asset-tag">
            <span>${a}</span>
            <button onclick="retirerAsset(${i})" title="Retirer">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join("");
}

function retirerAsset(idx) {
    state.autoAssets.splice(idx, 1);
    renderActiveAssets(state.autoAssets);
    jouerSon("error");
    notifier("Asset retiré");
}

function clearAllAssets() {
    state.autoAssets = [];
    renderActiveAssets([]);
    notifier("Assets réinitialisés");
}

/* ─── PAGE ASSETS PREMIUM ─── */
function renderAssetsPage() {
    const sector = document.getElementById("niche") ? document.getElementById("niche").value : null;
    const grid   = document.getElementById("assetsFullGrid");
    const nameEl = document.getElementById("assetsSectorName");
    if (!grid) return;

    if (!sector || !SECTOR_ASSETS[sector]) {
        grid.innerHTML = `<div class="assets-empty-state">
            <i class="fas fa-cube"></i>
            <p>Sélectionnez un secteur dans le Prompt Studio pour voir les assets recommandés</p>
            <button onclick="showPage('studio', document.querySelector('[data-page=studio]'))">Aller au Studio</button>
        </div>`;
        return;
    }

    if (nameEl) nameEl.textContent = SECTORS[sector]?.label || sector;

    const data = SECTOR_ASSETS[sector];
    const families = [
        { key: "lighting", icon: "fas fa-sun",                 label: "Éclairage" },
        { key: "camera",   icon: "fas fa-camera",              label: "Caméra" },
        { key: "texture",  icon: "fas fa-circle-half-stroke",  label: "Texture" },
        { key: "mood",     icon: "fas fa-cloud",               label: "Ambiance" },
        { key: "extra",    icon: "fas fa-wand-magic-sparkles", label: "Extras Secteur" },
    ];

    grid.innerHTML = families.map(fam => {
        const items = data[fam.key] || [];
        return `<div class="asset-family-card">
            <h4><i class="${fam.icon}"></i> ${fam.label}</h4>
            <div class="asset-tags-list">
                ${items.map(item => `
                    <div class="asset-tag-item ${state.autoAssets.includes(item) ? "injected" : ""}"
                         onclick="injectAsset(this,'${item}')">
                        <i class="fas ${state.autoAssets.includes(item) ? "fa-check" : "fa-plus"}"></i>
                        <span>${item}</span>
                    </div>
                `).join("")}
            </div>
        </div>`;
    }).join("");
}

function injectAsset(el, value) {
    el.classList.toggle("injected");
    const isActive = el.classList.contains("injected");
    el.querySelector("i").className = "fas " + (isActive ? "fa-check" : "fa-plus");

    if (isActive) {
        state.autoAssets.push(value);
        jouerSon("success");
        notifier("Asset ajouté ✓");
    } else {
        state.autoAssets = state.autoAssets.filter(a => a !== value);
        notifier("Asset retiré");
    }
    renderActiveAssets(state.autoAssets);
}

/* ============================================
   VISUAL DNA
   ============================================ */

function selectPalette(el) {
    document.querySelectorAll(".color-option").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
    state.dna.palette = el.dataset.palette;
    const sel = document.getElementById("couleur");
    if (sel) sel.value = state.dna.palette;
    verifierCompatibilite();
    jouerSon("success");
    notifier("Palette enregistrée ✓");
}

function selectTypo(el) {
    document.querySelectorAll(".typo-option").forEach(t => t.classList.remove("selected"));
    el.classList.add("selected");
    state.dna.typo = el.dataset.typo;
    jouerSon("success");
    notifier("Typographie enregistrée ✓");
}

function saveDNA() {
    state.dna.assets = getDNAAssets();
    localStorage.setItem("vfDNA", JSON.stringify(state.dna));
    jouerSon("success");
    notifier("ADN Visuel sauvegardé ✓");
}

function loadDNAState() {
    const saved = localStorage.getItem("vfDNA");
    if (!saved) return;
    try {
        const dna = JSON.parse(saved);
        state.dna = { ...state.dna, ...dna };

        document.querySelectorAll(".color-option").forEach(el => {
            el.classList.toggle("selected", el.dataset.palette === state.dna.palette);
        });
        document.querySelectorAll(".typo-option").forEach(el => {
            el.classList.toggle("selected", el.dataset.typo === state.dna.typo);
        });
        (state.dna.assets || []).forEach(val => {
            document.querySelectorAll(`input[value="${val}"]`).forEach(cb => cb.checked = true);
        });
    } catch(e) {}
}

/* ============================================
   PREVIEW DYNAMIQUE
   ============================================ */

const PREVIEW_COLORS = {
    "noir-or":      { bg: "linear-gradient(135deg,#000,#1a1200)",   accent: "#d4af37" },
    "bleu-neon":    { bg: "linear-gradient(135deg,#020a1a,#001a3a)", accent: "#0078ff" },
    "rouge-noir":   { bg: "linear-gradient(135deg,#0a0000,#200000)", accent: "#cc0000" },
    "beige-blanc":  { bg: "linear-gradient(135deg,#e8e0d0,#fff)",    accent: "#8a7a5a" },
    "rose-nude":    { bg: "linear-gradient(135deg,#f0d0c0,#e8b0a0)", accent: "#c0706a" },
    "violet-neon":  { bg: "linear-gradient(135deg,#0d001a,#1a003a)", accent: "#9f5cff" },
    "blanc-argent": { bg: "linear-gradient(135deg,#e0e0e0,#f8f8f8)", accent: "#888"    },
    "terre":        { bg: "linear-gradient(135deg,#2a1810,#3d2b1f)", accent: "#a0724a" },
    "vert-or":      { bg: "linear-gradient(135deg,#0a1a0a,#1a2e1a)", accent: "#d4af37" },
    "marine":       { bg: "linear-gradient(135deg,#050d1a,#0a1a30)", accent: "#3a8ac0" },
};

function updatePreview(sector, promo, prix, cta, style) {
    const preview = document.getElementById("previewVisual");
    if (!preview) return;

    const couleur = document.getElementById("couleur")?.value || "noir-or";
    const colors  = PREVIEW_COLORS[couleur] || PREVIEW_COLORS["noir-or"];

    preview.innerHTML = `
        <div style="
            background:${colors.bg};
            width:100%; height:100%;
            display:flex; flex-direction:column;
            justify-content:center; align-items:center;
            padding:20px; text-align:center; gap:10px;">
            <div style="font-size:10px;letter-spacing:2px;color:${colors.accent};font-weight:700;text-transform:uppercase;">
                ${SECTORS[sector]?.label || sector}
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.5);">
                ${STYLES[style]?.label || style}
            </div>
            <div style="font-size:16px;font-weight:700;color:white;line-height:1.3;">
                ${promo || "Votre message"}
            </div>
            ${prix ? `<div style="font-size:13px;color:${colors.accent};font-weight:600;">${prix}</div>` : ""}
            ${cta  ? `<button style="padding:8px 16px;background:${colors.accent};border:none;border-radius:8px;font-size:11px;font-weight:700;cursor:default;">${cta}</button>` : ""}
        </div>
    `;
}

/* ============================================
   CAMPAIGN BUILDER
   ============================================ */

function genererCampagne() {
    const nom      = document.getElementById("campNom").value.trim();
    const sector   = document.getElementById("campSecteur").value;
    const objectif = document.getElementById("campObjectif").value;
    const produit  = document.getElementById("campProduit").value.trim();

    if (!produit) {
        jouerSon("error");
        notifier("Ajoutez un produit / offre");
        return;
    }

    const prodStr = produit + (nom ? ` — ${nom}` : "");
    const tpl     = CAMPAIGN_TEMPLATES[sector] || CAMPAIGN_FALLBACK;

    const hook    = (tpl.hook    || CAMPAIGN_FALLBACK.hook)(prodStr, sector);
    const present = (tpl.present || CAMPAIGN_FALLBACK.present)(prodStr, sector);
    const cta     = (tpl.cta     || CAMPAIGN_FALLBACK.cta)(prodStr, sector);

    const objectifMap = {
        notoriete:  "Brand awareness focus, wide audience reach.",
        vente:      "Conversion and sales focus, strong CTA.",
        engagement: "Community engagement, emotional connection.",
        lancement:  "Product launch energy, excitement and novelty.",
    };
    const objBoost = objectifMap[objectif] || "";

    document.getElementById("campPrompt1").value = hook    + (objBoost ? " " + objBoost : "");
    document.getElementById("campPrompt2").value = present + (objBoost ? " " + objBoost : "");
    document.getElementById("campPrompt3").value = cta     + (objBoost ? " " + objBoost : "");

    document.getElementById("campaignEmpty").style.display = "none";
    ["campPost1", "campPost2", "campPost3", "exportCampBtn"].forEach(id => {
        document.getElementById(id).style.display = "";
    });

    jouerSon("success");
    notifier("Campagne générée ✓");
}

function copierPost(n) {
    const ta = document.getElementById("campPrompt" + n);
    if (!ta || !ta.value) return;
    navigator.clipboard.writeText(ta.value).catch(() => {
        ta.select(); document.execCommand("copy");
    });
    jouerSon("success");
    notifier("Post " + n + " copié ✓");
}

function exporterCampagne() {
    const lines = [
        "=== VISUFORGE AI — CAMPAGNE ===",
        "",
        "[ POST 01 — ACCROCHE ]",
        document.getElementById("campPrompt1").value,
        "",
        "[ POST 02 — PRÉSENTATION ]",
        document.getElementById("campPrompt2").value,
        "",
        "[ POST 03 — CONVERSION ]",
        document.getElementById("campPrompt3").value,
    ];
    telecharger(lines.join("\n"), "visuforge_campagne.txt");
    jouerSon("success");
    notifier("Campagne exportée ✓");
}

/* ============================================
   ACTIONS PROMPT STUDIO
   ============================================ */

function copierPrompt() {
    const texte = document.getElementById("resultat").value;
    if (!texte.trim()) {
        jouerSon("error");
        notifier("Rien à copier");
        return;
    }
    navigator.clipboard.writeText(texte).catch(() => {
        const ta = document.getElementById("resultat");
        ta.select(); document.execCommand("copy");
    });
    jouerSon("success");
    notifier("Prompt copié ✓");
}

function ajouterFavori() {
    if (!state.prompts.length) {
        jouerSon("error");
        notifier("Générez un prompt d'abord");
        return;
    }
    state.prompts[0].favori = true;
    sauvegarderLocal();
    updateCounters();
    jouerSon("success");
    notifier("Ajouté aux favoris ✓");
}

function exporterPrompt() {
    const texte = document.getElementById("resultat").value;
    if (!texte.trim()) {
        jouerSon("error");
        notifier("Rien à exporter");
        return;
    }
    telecharger(texte, "visuforge_prompt.txt");
    jouerSon("success");
    notifier("Prompt exporté ✓");
}

function resetForm() {
    ["marque", "promo", "prix", "cta"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    const res = document.getElementById("resultat");
    if (res) res.value = "";

    const preview = document.getElementById("previewVisual");
    if (preview) preview.innerHTML = `
        <div class="preview-empty">
            <i class="fas fa-image"></i>
            <span>Configurez et générez</span>
        </div>`;

    const doctorBox = document.getElementById("doctorIA");
    if (doctorBox) doctorBox.style.display = "none";

    const bar = document.getElementById("compatibilityBar");
    if (bar) bar.style.display = "none";

    const assetsTags = document.getElementById("assetsTags");
    if (assetsTags) assetsTags.innerHTML = "";

    renderActiveAssets([]);
    state.currentPrompt = "";
    state.variants      = null;
    state.autoAssets    = [];
    notifier("Formulaire réinitialisé");
}

/* ============================================
   EXPORT CENTER
   ============================================ */

function setExportPlatform(btn, platform) {
    document.querySelectorAll(".exp-plat").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.exportPlatform = platform;

    const badge = document.getElementById("exportFormatBadge");
    if (badge) badge.textContent = "FORMAT : " + platform.toUpperCase();

    updateExportPreview();
}

function updateExportPreview() {
    const preview  = document.getElementById("exportPreview");
    const countEl  = document.getElementById("exportCount");
    const sizeEl   = document.getElementById("exportSize");
    if (!preview) return;

    const favOnly    = document.getElementById("exportFavOnly")?.checked;
    const withParams = document.getElementById("exportParams")?.checked !== false;

    let prompts = favOnly
        ? state.prompts.filter(p => p.favori)
        : state.prompts;

    if (!prompts.length) {
        preview.value = "Aucun prompt à exporter.";
        if (countEl) countEl.textContent = "0 prompt";
        if (sizeEl)  sizeEl.textContent  = "0 caractères";
        return;
    }

    const platform  = state.exportPlatform;
    const formatted = prompts.map((p, i) => {
        const header = `=== PROMPT ${String(i+1).padStart(2,"0")} | ${p.sector ? SECTORS[p.sector]?.label || p.sector : "—"} | ${p.date || "—"} ===`;
        const body   = withParams && platform !== "txt"
            ? formatForPlatform(p.text, p, platform)
            : p.text;
        return header + "\n" + body;
    }).join("\n\n" + "─".repeat(60) + "\n\n");

    const header = buildExportHeader(platform, prompts.length);
    const full   = header + "\n\n" + formatted;

    preview.value = full;
    if (countEl) countEl.textContent = prompts.length + " prompt" + (prompts.length > 1 ? "s" : "");
    if (sizeEl)  sizeEl.textContent  = full.length + " caractères";
}

function buildExportHeader(platform, count) {
    return [
        "╔══════════════════════════════════════════╗",
        "║      VISUFORGE AI — CENTRE D'EXPORT      ║",
        "╚══════════════════════════════════════════╝",
        "",
        `Plateforme : ${platform.toUpperCase()}`,
        `Prompts    : ${count}`,
        `Date       : ${new Date().toLocaleDateString("fr-FR")}`,
        `Moteur     : VisuForge AI Premium v1.0`,
    ].join("\n");
}

function formatForPlatform(text, entry, platform) {
    const format = entry.format || "ig-post";
    switch(platform) {
        case "midjourney":
            const mjParam = (PLATFORM_PARAMS.Midjourney || {})[format] || "--ar 1:1 --style raw --v 6.1";
            return `/imagine prompt: ${text} ${mjParam}`;
        case "leonardo":
            const leoParam = (PLATFORM_PARAMS.Leonardo || {})[format] || "-- width 1024 --height 1024 --model Phoenix";
            return `[Leonardo AI]\n${text}\n${leoParam}`;
        case "dalle":
            const dalleParam = (PLATFORM_PARAMS.DALLE || {})[format] || "size: 1024x1024, quality: hd, style: vivid";
            return `[DALL-E 3]\nPrompt : ${text}\n${dalleParam}`;
        default:
            return text;
    }
}

function exporterFormate() {
    const preview = document.getElementById("exportPreview");
    if (!preview || !preview.value.trim() || preview.value === "Aucun prompt à exporter.") {
        jouerSon("error");
        notifier("Aucun prompt à exporter");
        return;
    }
    telecharger(preview.value, `visuforge_export_${state.exportPlatform}.txt`);
    jouerSon("success");
    notifier("Export téléchargé ✓");
}

function copierTout() {
    const preview = document.getElementById("exportPreview");
    if (!preview || !preview.value.trim()) {
        jouerSon("error");
        notifier("Rien à copier");
        return;
    }
    navigator.clipboard.writeText(preview.value).catch(() => {
        preview.select(); document.execCommand("copy");
    });
    jouerSon("success");
    notifier("Tout copié ✓");
}

/* ============================================
   HISTORY VAULT
   ============================================ */

function renderHistoryGrid(filtered) {
    const grid = document.getElementById("historyGrid");
    if (!grid) return;

    const list = filtered !== undefined ? filtered : state.prompts;

    if (!list.length) {
        grid.innerHTML = `<div class="history-empty">
            <i class="fas fa-clock-rotate-left"></i>
            <p>Votre historique est vide.<br>Générez des prompts pour les retrouver ici.</p>
        </div>`;
        return;
    }

    grid.innerHTML = list.map((p) => {
        const realIdx = state.prompts.indexOf(p);
        const preview = p.text.substring(0, 120) + (p.text.length > 120 ? "…" : "");
        return `
        <div class="history-card ${p.favori ? "history-favori" : ""}">
            <div class="history-card-header">
                <div class="history-meta">
                    <span class="history-sector">${SECTORS[p.sector]?.label || p.sector || "—"}</span>
                    <span class="history-platform">${p.platform || "—"}</span>
                    ${p.favori ? '<span class="history-fav-badge"><i class="fas fa-star"></i></span>' : ""}
                </div>
                <span class="history-date">${p.date || ""}</span>
            </div>
            <p class="history-preview">${preview}</p>
            <div class="history-actions">
                <button onclick="reutiliserPrompt(${realIdx})">
                    <i class="fas fa-copy"></i> Copier
                </button>
                <button onclick="toggleFavoriHistory(${realIdx})">
                    <i class="fas fa-star ${p.favori ? "fav-active" : ""}"></i>
                </button>
                <button onclick="supprimerPrompt(${realIdx})" class="btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
    }).join("");
}

function filterHistory() {
    const search     = (document.getElementById("historySearch")?.value || "").toLowerCase();
    const sectorFilt = document.getElementById("historyFilterSector")?.value || "";

    const filtered = state.prompts.filter(p => {
        const matchSearch = !search || p.text.toLowerCase().includes(search) || (p.marque || "").toLowerCase().includes(search);
        const matchSector = !sectorFilt || p.sector === sectorFilt;
        return matchSearch && matchSector;
    });

    renderHistoryGrid(filtered);
}

function reutiliserPrompt(idx) {
    const p = state.prompts[idx];
    if (!p) return;
    navigator.clipboard.writeText(p.text).catch(() => {});
    jouerSon("success");
    notifier("Prompt copié ✓");
}

function toggleFavoriHistory(idx) {
    if (!state.prompts[idx]) return;
    state.prompts[idx].favori = !state.prompts[idx].favori;
    sauvegarderLocal();
    updateCounters();
    renderHistoryGrid();
    jouerSon("success");
    notifier(state.prompts[idx].favori ? "Ajouté aux favoris ✓" : "Retiré des favoris");
}

function supprimerPrompt(idx) {
    state.prompts.splice(idx, 1);
    sauvegarderLocal();
    updateCounters();
    renderHistoryGrid();
    updateExportPreview();
    jouerSon("success");
    notifier("Prompt supprimé");
}

function clearHistory() {
    if (!confirm("Vider tout l'historique ?")) return;
    state.prompts = [];
    sauvegarderLocal();
    updateCounters();
    renderHistoryGrid();
    updateExportPreview();
    jouerSon("success");
    notifier("Historique vidé");
}

/* ============================================
   DASHBOARD
   ============================================ */

function updateLastPromptDashboard(text) {
    const el = document.getElementById("lastPromptContent");
    if (!el) return;
    const preview = text.substring(0, 200) + (text.length > 200 ? "…" : "");
    el.innerHTML = `
        <p class="last-prompt-text">${preview}</p>
        <button onclick="copierDernier()" class="copy-last-btn">
            <i class="fas fa-copy"></i> Copier
        </button>`;
}

function copierDernier() {
    if (!state.currentPrompt) return;
    navigator.clipboard.writeText(state.currentPrompt).catch(() => {});
    jouerSon("success");
    notifier("Dernier prompt copié ✓");
}

/* ============================================
   ANALYSER UN DESIGN
   ============================================ */

let analyzerImageBase64 = null;
let analyzerImageType   = null;

function initUploadZone() {
    const zone = document.getElementById("uploadZone");
    if (!zone) return;

    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");
        const file = e.dataTransfer.files[0];
        if (file) traiterImageFichier(file);
    });
}

function onImageSelected(event) {
    const file = event.target.files[0];
    if (file) traiterImageFichier(file);
}

function traiterImageFichier(file) {
    if (!file.type.startsWith("image/")) {
        jouerSon("error");
        notifier("Format non supporté — utilisez JPG, PNG ou WEBP");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        jouerSon("error");
        notifier("Image trop lourde — maximum 5MB");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target.result;

        // Extraire base64 et type
        const parts         = result.split(",");
        analyzerImageBase64 = parts[1];
        analyzerImageType   = file.type;

        // Afficher aperçu
        const placeholder = document.getElementById("uploadPlaceholder");
        const previewImg  = document.getElementById("uploadPreviewImg");

        if (placeholder) placeholder.style.display = "none";
        if (previewImg) {
            previewImg.src = result;
            previewImg.style.display = "block";
        }

        // Activer le bouton
        const btn = document.getElementById("analyzerBtn");
        if (btn) btn.disabled = false;

        jouerSon("success");
        notifier("Image chargée ✓");
    };
    reader.readAsDataURL(file);
}

async function analyserDesign() {
    if (!analyzerImageBase64) {
        jouerSon("error");
        notifier("Importez une image d'abord");
        return;
    }

    const platform = document.getElementById("analyzerPlatform")?.value || "Midjourney";
    const detail   = document.getElementById("analyzerDetail")?.value   || "standard";

    // UI loading
    const loading  = document.getElementById("analyzerLoading");
    const result   = document.getElementById("analyzerResult");
    const actions  = document.getElementById("analyzerActions");
    const status   = document.getElementById("analyzerStatus");
    const btn      = document.getElementById("analyzerBtn");

    if (loading) loading.style.display = "block";
    if (result)  result.value = "";
    if (actions) actions.style.display = "none";
    if (status)  { status.textContent = ""; status.className = "analyzer-status"; }
    if (btn)     btn.disabled = true;

    // Construire le prompt selon niveau de détail
    const detailMap = {
        standard: "Analyse cette image publicitaire et génère un prompt de reproduction précis et professionnel.",
        detaille: "Analyse en détail cette image publicitaire : composition, éclairage, couleurs, style, ambiance, typographie, objets. Génère un prompt complet et détaillé.",
        expert:   "Analyse de façon experte cette image publicitaire. Décris précisément : composition, éclairage studio, angle de caméra, palette de couleurs exacte, style visuel, texture, ambiance, typographie, éléments graphiques, qualité de rendu. Génère un prompt professionnel ultra-détaillé prêt à l'emploi.",
    };

    const platformInstructions = {
        Midjourney: `Le prompt doit être formaté pour Midjourney et se terminer par les paramètres techniques appropriés (--ar, --style raw, --v 6.1).`,
        Leonardo:   `Le prompt doit être formaté pour Leonardo AI avec les paramètres de modèle appropriés.`,
        DALLE:      `Le prompt doit être formaté pour DALL-E 3, clair et descriptif.`,
    };

    const systemPrompt = `Tu es un expert en génération de prompts pour les IA image (Midjourney, Leonardo, DALL-E). 
Tu analyses des visuels publicitaires et génères des prompts précis permettant de reproduire ou s'inspirer du design.
Réponds UNIQUEMENT avec le prompt, sans explication ni commentaire.
Le prompt doit être en anglais, professionnel et immédiatement utilisable.`;

    const userPrompt = `${detailMap[detail]} ${platformInstructions[platform] || ""} 
Réponds uniquement avec le prompt final, rien d'autre.`;

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model:      "claude-sonnet-4-20250514",
                max_tokens: 1000,
                system:     systemPrompt,
                messages: [{
                    role: "user",
                    content: [
                        {
                            type: "image",
                            source: {
                                type:       "base64",
                                media_type: analyzerImageType,
                                data:       analyzerImageBase64,
                            }
                        },
                        {
                            type: "text",
                            text: userPrompt,
                        }
                    ]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || "Erreur API");
        }

        const promptExtrait = data.content?.[0]?.text || "";

        if (!promptExtrait) {
            throw new Error("Réponse vide de l'IA");
        }

        // Afficher résultat
        if (result)  result.value = promptExtrait;
        if (actions) actions.style.display = "flex";
        if (loading) loading.style.display = "none";
        if (status) {
            status.textContent  = "Analyse réussie ✓";
            status.className    = "analyzer-status status-ok";
        }
        if (btn) btn.disabled = false;

        // Sauvegarder dans analyses
        state.analyses.unshift({
            prompt: promptExtrait,
            platform,
            date: new Date().toLocaleDateString("fr-FR"),
        });
        localStorage.setItem("vfAnalyses", JSON.stringify(state.analyses));
        updateCounters();

        jouerSon("success");
        notifier("Design analysé ✓");

    } catch(err) {
        if (loading) loading.style.display = "none";
        if (status) {
            status.textContent = "Erreur d'analyse";
            status.className   = "analyzer-status status-error";
        }
        if (btn) btn.disabled = false;
        if (result) result.value = "Erreur : " + (err.message || "Impossible d'analyser l'image.");

        jouerSon("error");
        notifier("Erreur lors de l'analyse");
    }
}

function copierAnalyse() {
    const texte = document.getElementById("analyzerResult")?.value;
    if (!texte?.trim()) {
        jouerSon("error");
        notifier("Rien à copier");
        return;
    }
    navigator.clipboard.writeText(texte).catch(() => {});
    jouerSon("success");
    notifier("Prompt copié ✓");
}

function envoyerAuStudio() {
    const texte = document.getElementById("analyzerResult")?.value;
    if (!texte?.trim()) {
        jouerSon("error");
        notifier("Aucun prompt à envoyer");
        return;
    }

    // Envoyer dans le textarea du studio
    const resultat = document.getElementById("resultat");
    if (resultat) resultat.value = texte;

    state.currentPrompt = texte;

    // Naviguer vers le studio
    showPage("studio", document.querySelector("[data-page=studio]"));

    // Lancer le Doctor IA
    runDoctorIA(texte);

    jouerSon("success");
    notifier("Prompt envoyé au Studio ✓");
}

function exporterAnalyse() {
    const texte = document.getElementById("analyzerResult")?.value;
    if (!texte?.trim()) {
        jouerSon("error");
        notifier("Rien à exporter");
        return;
    }
    telecharger(texte, "visuforge_analyse.txt");
    jouerSon("success");
    notifier("Analyse exportée ✓");
}

/* ============================================
   STORAGE
   ============================================ */

function sauvegarderLocal() {
    localStorage.setItem("vfPrompts", JSON.stringify(state.prompts));
}

function chargerLocal() {
    try {
        const p = localStorage.getItem("vfPrompts");
        if (p) state.prompts = JSON.parse(p);

        const a = localStorage.getItem("vfAnalyses");
        if (a) state.analyses = JSON.parse(a);
    } catch(e) {
        state.prompts  = [];
        state.analyses = [];
    }
}

function exporterToutLocal() {
    const data = {
        prompts:  state.prompts,
        analyses: state.analyses,
        dna:      state.dna,
        date:     new Date().toISOString()
    };
    telecharger(JSON.stringify(data, null, 2), "visuforge_backup.json");
    jouerSon("success");
    notifier("Sauvegarde exportée ✓");
}

function resetTout() {
    if (!confirm("Réinitialiser toutes les données VisuForge AI ?")) return;
    localStorage.removeItem("vfPrompts");
    localStorage.removeItem("vfDNA");
    localStorage.removeItem("vfAnalyses");
    state.prompts    = [];
    state.analyses   = [];
    state.dna        = { palette: "noir-or", typo: "serif-luxe", assets: [] };
    state.autoAssets = [];
    updateCounters();
    renderHistoryGrid();
    notifier("Données réinitialisées");
}

/* ============================================
   COUNTERS
   ============================================ */

function updateCounters() {
    const total    = state.prompts.length;
    const favs     = state.prompts.filter(p => p.favori).length;
    const analyses = state.analyses.length;

    ["countPrompts", "topbarPrompts"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = total;
    });
    ["countFavoris", "topbarFavoris"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = favs;
    });
    const elA = document.getElementById("countAnalyses");
    if (elA) elA.textContent = analyses;
}

/* ============================================
   LISTENERS GLOBAUX
   ============================================ */

document.addEventListener("change", function(e) {
    if (["style", "couleur"].includes(e.target.id)) {
        verifierCompatibilite();
    }
    if (e.target.name === "defPlat") {
        state.platform = e.target.value;
        syncPlatformBadge();
        jouerSon("success");
        notifier("Plateforme par défaut : " + e.target.value);
    }
    if (["exportFavOnly", "exportAll", "exportParams"].includes(e.target.id)) {
        updateExportPreview();
    }
});

/* ============================================
   UTILITAIRES
   ============================================ */

function telecharger(texte, nom) {
    const blob = new Blob([texte], { type: "text/plain;charset=utf-8" });
    const lien = document.createElement("a");
    lien.href  = URL.createObjectURL(blob);
    lien.download = nom;
    lien.click();
    URL.revokeObjectURL(lien.href);
}

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("show");
}

/* ─── NOTIFICATION ─── */
let notifyTimer = null;
function notifier(message) {
    const box = document.getElementById("notify");
    if (!box) return;
    box.textContent = message;
    box.classList.add("show");
    if (notifyTimer) clearTimeout(notifyTimer);
    notifyTimer = setTimeout(() => box.classList.remove("show"), 2200);
}