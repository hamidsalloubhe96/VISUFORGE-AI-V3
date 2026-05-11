/* =============================================
   VISUFORGE AI — DATA.JS
   Base de données complète
   ============================================= */

/* ─── SECTEURS ─── */
const SECTORS = {
    parfum:       { label: "Parfum / Cosmétique" },
    mode:         { label: "Mode / Vêtements" },
    joaillerie:   { label: "Joaillerie / Bijoux" },
    maroquinerie: { label: "Maroquinerie / Sacs" },
    montres:      { label: "Montres de Luxe" },
    immobilier:   { label: "Immobilier Premium" },
    architecture: { label: "Architecture / Design" },
    decoration:   { label: "Décoration Intérieure" },
    tech:         { label: "Accessoires Tech" },
    startup:      { label: "Startup / SaaS" },
    gaming:       { label: "Gaming / Esport" },
    restaurant:   { label: "Restaurant / Food" },
    coffee:       { label: "Coffee / Café" },
    wine:         { label: "Vins & Spiritueux" },
    fitness:      { label: "Fitness / Sport" },
    wellness:     { label: "Wellness / Spa" },
    finance:      { label: "Finance / Banque" },
    assurance:    { label: "Assurance" },
    consulting:   { label: "Consulting / RH" },
    education:    { label: "Éducation / Formation" },
    sante:        { label: "Santé / Clinique" },
    evenement:    { label: "Événementiel" },
    musique:      { label: "Musique / Label" },
    hotel:        { label: "Hôtellerie / Travel" },
    automobile:   { label: "Automobile" },
    beaute:       { label: "Beauté / Salon" },
};

/* ─── ASSETS INTELLIGENTS PAR SECTEUR ─── */
const SECTOR_ASSETS = {
    parfum: {
        lighting: ["soft studio lighting", "golden hour sunlight"],
        camera:   ["macro photography", "85mm portrait lens"],
        texture:  ["glossy reflective", "velvet surface texture"],
        mood:     ["elegant sophisticated mood", "dreamy ethereal atmosphere"],
        extra:    ["perfume bottle splash effect", "floating petals", "mist overlay", "bokeh background"]
    },
    mode: {
        lighting: ["soft studio lighting", "cinematic backlight"],
        camera:   ["85mm portrait lens", "wide angle lens"],
        texture:  ["matte smooth surface", "glossy reflective"],
        mood:     ["elegant sophisticated mood", "cinematic dark tone"],
        extra:    ["editorial fashion layout", "runway atmosphere", "fabric texture close-up", "high fashion contrast"]
    },
    joaillerie: {
        lighting: ["soft studio lighting", "dramatic rim lighting"],
        camera:   ["macro photography", "extreme close-up"],
        texture:  ["glossy reflective", "brushed metallic finish"],
        mood:     ["elegant sophisticated mood", "dreamy ethereal atmosphere"],
        extra:    ["diamond sparkle effect", "dark velvet background", "precious gem refraction", "jewelry reflection"]
    },
    maroquinerie: {
        lighting: ["soft studio lighting", "natural diffused light"],
        camera:   ["macro photography", "85mm portrait lens"],
        texture:  ["matte smooth surface", "natural wood grain"],
        mood:     ["elegant sophisticated mood", "warm inviting cozy"],
        extra:    ["leather texture detail", "stitching close-up", "neutral background", "luxury product staging"]
    },
    montres: {
        lighting: ["dramatic rim lighting", "soft studio lighting"],
        camera:   ["macro photography", "extreme close-up"],
        texture:  ["brushed metallic finish", "glossy reflective"],
        mood:     ["elegant sophisticated mood", "cinematic dark tone"],
        extra:    ["watch dial detail", "mechanical movement visible", "steel reflection", "luxury dark atmosphere"]
    },
    immobilier: {
        lighting: ["natural diffused light", "golden hour sunlight"],
        camera:   ["wide angle lens", "aerial drone view"],
        texture:  ["matte smooth surface", "natural wood grain"],
        mood:     ["elegant sophisticated mood", "warm inviting cozy"],
        extra:    ["architectural visualization", "interior ambient light", "luxury property staging", "real estate premium shot"]
    },
    architecture: {
        lighting: ["natural diffused light", "cinematic backlight"],
        camera:   ["wide angle lens", "aerial drone view"],
        texture:  ["matte smooth surface", "frosted glass effect"],
        mood:     ["fresh clean minimal", "cinematic dark tone"],
        extra:    ["architectural geometry", "glass and steel structure", "perspective lines", "urban skyline"]
    },
    decoration: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["natural wood grain", "velvet surface texture"],
        mood:     ["warm inviting cozy", "elegant sophisticated mood"],
        extra:    ["interior styling detail", "curated object arrangement", "ambient warm light", "Scandinavian minimalism"]
    },
    tech: {
        lighting: ["neon glow ambient", "dramatic rim lighting"],
        camera:   ["extreme close-up", "macro photography"],
        texture:  ["brushed metallic finish", "frosted glass effect"],
        mood:     ["cinematic dark tone", "powerful aggressive energy"],
        extra:    ["tech product hologram", "circuit board detail", "neon light trails", "futuristic UI overlay"]
    },
    startup: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["matte smooth surface", "frosted glass effect"],
        mood:     ["fresh clean minimal", "powerful aggressive energy"],
        extra:    ["clean white workspace", "UI mockup screen", "geometric data visualization", "modern brand identity"]
    },
    gaming: {
        lighting: ["neon glow ambient", "dramatic rim lighting"],
        camera:   ["wide angle lens", "low angle dramatic"],
        texture:  ["brushed metallic finish", "glossy reflective"],
        mood:     ["powerful aggressive energy", "cinematic dark tone"],
        extra:    ["esport arena atmosphere", "neon RGB lighting", "action blur motion", "dark gaming setup"]
    },
    restaurant: {
        lighting: ["natural diffused light", "golden hour sunlight"],
        camera:   ["macro photography", "85mm portrait lens"],
        texture:  ["glossy reflective", "natural wood grain"],
        mood:     ["warm inviting cozy", "elegant sophisticated mood"],
        extra:    ["steam from food", "gourmet plating art", "rustic restaurant interior", "food bokeh close-up"]
    },
    coffee: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["macro photography", "extreme close-up"],
        texture:  ["natural wood grain", "matte smooth surface"],
        mood:     ["warm inviting cozy", "dreamy ethereal atmosphere"],
        extra:    ["latte art detail", "coffee steam rising", "cozy cafe ambiance", "roasted bean texture"]
    },
    wine: {
        lighting: ["dramatic rim lighting", "golden hour sunlight"],
        camera:   ["macro photography", "85mm portrait lens"],
        texture:  ["glossy reflective", "velvet surface texture"],
        mood:     ["elegant sophisticated mood", "warm inviting cozy"],
        extra:    ["wine glass light refraction", "cellar stone background", "bottle condensation", "wine pour motion"]
    },
    fitness: {
        lighting: ["dramatic rim lighting", "cinematic backlight"],
        camera:   ["low angle dramatic", "wide angle lens"],
        texture:  ["matte smooth surface", "brushed metallic finish"],
        mood:     ["powerful aggressive energy", "fresh clean minimal"],
        extra:    ["athletic motion blur", "gym equipment detail", "sweat drop effect", "strong silhouette backlight"]
    },
    wellness: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["velvet surface texture", "matte smooth surface"],
        mood:     ["dreamy ethereal atmosphere", "warm inviting cozy"],
        extra:    ["spa water ripple", "zen stone arrangement", "candle ambient glow", "botanical plant detail"]
    },
    finance: {
        lighting: ["soft studio lighting", "dramatic rim lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["brushed metallic finish", "matte smooth surface"],
        mood:     ["elegant sophisticated mood", "fresh clean minimal"],
        extra:    ["geometric data chart", "glass tower reflection", "premium suit texture", "gold coin detail"]
    },
    assurance: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["matte smooth surface", "frosted glass effect"],
        mood:     ["warm inviting cozy", "fresh clean minimal"],
        extra:    ["family protection concept", "shield graphic overlay", "trust blue tones", "professional handshake"]
    },
    consulting: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["matte smooth surface", "frosted glass effect"],
        mood:     ["fresh clean minimal", "powerful aggressive energy"],
        extra:    ["business meeting atmosphere", "whiteboard strategy", "corporate skyline", "team collaboration"]
    },
    education: {
        lighting: ["natural diffused light", "soft studio lighting"],
        camera:   ["wide angle lens", "85mm portrait lens"],
        texture:  ["matte smooth surface", "natural wood grain"],
        mood:     ["warm inviting cozy", "fresh clean minimal"],
        extra:    ["open book concept", "knowledge light beam", "modern classroom", "student success moment"]
    },
    sante: {
        lighting: ["soft studio lighting", "natural diffused light"],
        camera:   ["85mm portrait lens", "extreme close-up"],
        texture:  ["matte smooth surface", "frosted glass effect"],
        mood:     ["fresh clean minimal", "dreamy ethereal atmosphere"],
        extra:    ["clinical clean white", "medical precision detail", "health glow concept", "blue tech overlay"]
    },
    evenement: {
        lighting: ["dramatic rim lighting", "neon glow ambient"],
        camera:   ["wide angle lens", "aerial drone view"],
        texture:  ["glossy reflective", "brushed metallic finish"],
        mood:     ["powerful aggressive energy", "cinematic dark tone"],
        extra:    ["confetti explosion", "stage spotlight beam", "crowd energy atmosphere", "event banner design"]
    },
    musique: {
        lighting: ["neon glow ambient", "dramatic rim lighting"],
        camera:   ["wide angle lens", "low angle dramatic"],
        texture:  ["glossy reflective", "brushed metallic finish"],
        mood:     ["powerful aggressive energy", "dreamy ethereal atmosphere"],
        extra:    ["sound wave visualization", "concert light show", "vinyl record detail", "music studio atmosphere"]
    },
    hotel: {
        lighting: ["natural diffused light", "golden hour sunlight"],
        camera:   ["wide angle lens", "aerial drone view"],
        texture:  ["velvet surface texture", "matte smooth surface"],
        mood:     ["elegant sophisticated mood", "warm inviting cozy"],
        extra:    ["infinity pool reflection", "luxury suite interior", "travel destination sunset", "resort palm trees"]
    },
    automobile: {
        lighting: ["dramatic rim lighting", "cinematic backlight"],
        camera:   ["low angle dramatic", "wide angle lens"],
        texture:  ["brushed metallic finish", "glossy reflective"],
        mood:     ["powerful aggressive energy", "cinematic dark tone"],
        extra:    ["car reflection on wet road", "motion speed blur", "headlight light trail", "premium car studio shot"]
    },
    beaute: {
        lighting: ["soft studio lighting", "natural diffused light"],
        camera:   ["macro photography", "85mm portrait lens"],
        texture:  ["glossy reflective", "velvet surface texture"],
        mood:     ["elegant sophisticated mood", "dreamy ethereal atmosphere"],
        extra:    ["makeup detail close-up", "skin glow effect", "beauty product flat lay", "pink pastel tones"]
    },
};

/* ─── INTRO PAR SECTEUR ─── */
const SECTOR_INTRO = {
    parfum:       "Create a glamorous, ultra-luxury cosmetic visual. International perfumery aesthetic, sophisticated and timeless.",
    mode:         "Create a high-fashion editorial visual. Magazine-quality, trend-forward, premium boutique atmosphere.",
    joaillerie:   "Create a prestigious jewelry visual. Dark velvet background, dramatic diamond sparkle, ultra-close detail.",
    maroquinerie: "Create a luxury leather goods visual. Premium craftsmanship detail, neutral staging, artisanal quality.",
    montres:      "Create a prestigious watchmaking visual. Mechanical precision, metallic reflections, dark luxury atmosphere.",
    immobilier:   "Create a premium real estate visual. Architectural elegance, investment confidence, luxury property staging.",
    architecture: "Create a stunning architectural visualization. Clean geometry, glass and steel, perspective mastery.",
    decoration:   "Create a refined interior design visual. Curated styling, warm ambiance, editorial home staging.",
    tech:         "Create a futuristic technology product visual. Neon accents, premium gadget rendering, innovation feeling.",
    startup:      "Create a clean, modern startup brand visual. Minimalist identity, digital-first, growth mindset.",
    gaming:       "Create an intense esport gaming visual. RGB neon atmosphere, aggressive energy, dark arena.",
    restaurant:   "Create an appetizing gourmet food visual. Steam, depth, culinary artistry, warm restaurant atmosphere.",
    coffee:       "Create a cozy, artisan coffee visual. Latte art, warm wood textures, morning ritual atmosphere.",
    wine:         "Create a sophisticated wine visual. Glass refraction, cellar ambiance, premium label staging.",
    fitness:      "Create a powerful fitness visual. Athletic motion, dramatic backlight, strength and determination.",
    wellness:     "Create a serene wellness visual. Soft light, zen atmosphere, botanical elements, pure calm.",
    finance:      "Create a premium financial brand visual. Corporate authority, gold and steel, institutional trust.",
    assurance:    "Create a reassuring insurance brand visual. Protection concept, trustworthy tones, family safety.",
    consulting:   "Create a professional consulting visual. Strategic authority, corporate precision, business excellence.",
    education:    "Create an inspiring education visual. Knowledge concept, modern learning environment, bright future.",
    sante:        "Create a clinical, reassuring health visual. Clean white, medical precision, healing light.",
    evenement:    "Create an electrifying event visual. Stage energy, spotlight drama, crowd excitement.",
    musique:      "Create a dynamic music label visual. Sound wave energy, concert atmosphere, artist power.",
    hotel:        "Create a luxurious travel destination visual. Resort paradise, infinity views, five-star elegance.",
    automobile:   "Create a dramatic automotive visual. Speed, power, metallic perfection, cinematic road shot.",
    beaute:       "Create a glamorous beauty product visual. Skin glow, makeup artistry, soft pastel luxury.",
};

/* ─── STYLES ─── */
const STYLES = {
    luxe:        { label: "Luxe Premium",        en: "ultra-luxury aesthetic, high-end premium quality, refined elegance" },
    moderne:     { label: "Moderne Épuré",        en: "clean modern design, contemporary minimalism, crisp lines" },
    cinematique: { label: "Cinématique",          en: "cinematic composition, movie-quality lighting, dramatic depth of field" },
    editorial:   { label: "Éditorial",            en: "editorial magazine style, bold typography layout, high-contrast composition" },
    hightech:    { label: "High-Tech",            en: "futuristic high-tech aesthetic, digital precision, technological innovation" },
    agressif:    { label: "Agressif Commercial",  en: "bold commercial impact, aggressive marketing energy, high-conversion design" },
    fashion:     { label: "Fashion Magazine",     en: "fashion magazine quality, runway editorial, premium brand aesthetic" },
    minimaliste: { label: "Minimaliste",          en: "minimal design philosophy, negative space mastery, pure simplicity" },
    organique:   { label: "Organique / Nature",   en: "organic natural aesthetic, earthy tones, botanical elements" },
    brutalist:   { label: "Brutalist",            en: "brutalist design approach, raw energy, bold graphic impact" },
    retro:       { label: "Rétro / Vintage",      en: "vintage retro aesthetic, nostalgic warmth, aged premium quality" },
    neon:        { label: "Néon / Cyberpunk",     en: "neon cyberpunk atmosphere, electric colors, dark futuristic city vibe" },
};

/* ─── PALETTES ─── */
const PALETTES = {
    "noir-or":      { label: "Noir & Or",      en: "deep black and gold color palette, #000000 and #d4af37" },
    "bleu-neon":    { label: "Bleu Néon",       en: "deep navy and electric blue palette, #050a1a and #0078ff" },
    "rouge-noir":   { label: "Rouge & Noir",    en: "deep black and crimson red palette, #0a0000 and #cc0000" },
    "beige-blanc":  { label: "Beige & Blanc",   en: "warm beige and pure white palette, #f5f0e8 and #ffffff" },
    "vert-or":      { label: "Vert & Or",       en: "deep forest green and gold palette, #1a2e1a and #d4af37" },
    "rose-nude":    { label: "Rose Nude",        en: "nude rose and soft blush palette, #f0d0c0 and #e8a090" },
    "blanc-argent": { label: "Blanc & Argent",  en: "pure white and silver chrome palette, #ffffff and #c0c0c0" },
    "violet-neon":  { label: "Violet Néon",     en: "deep dark purple and electric violet palette, #0d001a and #9f5cff" },
    "terre":        { label: "Tons Terre",       en: "warm earth tones palette, terracotta and sienna, #3d2b1f and #a0724a" },
    "marine":       { label: "Bleu Marine",      en: "deep navy and ocean blue palette, #0a0f1e and #1a4a7a" },
};

/* ─── TYPOGRAPHIES ─── */
const TYPOGRAPHIES = {
    "serif-luxe":   { label: "Serif Luxe",     en: "classic serif typography, elegant editorial font, timeless luxury lettering" },
    "sans-moderne": { label: "Sans Moderne",   en: "clean sans-serif typography, geometric modern font, contemporary lettering" },
    "condensed":    { label: "Condensed Bold", en: "condensed bold typography, high-impact sport font, strong headline lettering" },
    "script":       { label: "Script Élégant", en: "flowing script typography, handwritten luxury font, artisanal lettering" },
    "mono":         { label: "Monospace",       en: "monospace typography, technical digital font, code-inspired lettering" },
    "display":      { label: "Display Bold",    en: "bold display typography, editorial statement font, oversized headline lettering" },
};

/* ─── FORMATS PAR PLATEFORME ─── */
const PLATFORM_PARAMS = {
    Midjourney: {
        // Impression
        "A4":           "--ar 21:29 --style raw --v 6.1",
        "A3":           "--ar 29:42 --style raw --v 6.1",
        "A5":           "--ar 14:21 --style raw --v 6.1",
        "A6":           "--ar 10:14 --style raw --v 6.1",
        "carte":        "--ar 85:55 --style raw --v 6.1",
        "affiche":      "--ar 2:3 --style raw --v 6.1",
        "flyer":        "--ar 21:10 --style raw --v 6.1",
        // Logo
        "logo-carre":   "--ar 1:1 --style raw --v 6.1",
        "logo-rect":    "--ar 2:1 --style raw --v 6.1",
        "logo-hd":      "--ar 1:1 --style raw --v 6.1",
        "favicon":      "--ar 1:1 --style raw --v 6.1",
        "watermark":    "--ar 2:1 --style raw --v 6.1",
        "signature":    "--ar 3:1 --style raw --v 6.1",
        // Social Media
        "ig-post":      "--ar 1:1 --style raw --v 6.1",
        "ig-story":     "--ar 9:16 --style raw --v 6.1",
        "ig-reels":     "--ar 9:16 --style raw --v 6.1",
        "fb-post":      "--ar 1200:630 --style raw --v 6.1",
        "fb-cover":     "--ar 851:315 --style raw --v 6.1",
        "fb-story":     "--ar 9:16 --style raw --v 6.1",
        "tiktok":       "--ar 9:16 --style raw --v 6.1",
        "twitter":      "--ar 16:9 --style raw --v 6.1",
        "linkedin":     "--ar 1200:627 --style raw --v 6.1",
        "pinterest":    "--ar 2:3 --style raw --v 6.1",
        // Vidéo & Web
        "yt-thumb":     "--ar 16:9 --style raw --v 6.1",
        "yt-banner":    "--ar 16:9 --style raw --v 6.1",
        "web-banner":   "--ar 728:90 --style raw --v 6.1",
        "leaderboard":  "--ar 970:250 --style raw --v 6.1",
        "display":      "--ar 300:250 --style raw --v 6.1",
    },
    Leonardo: {
        "A4":           "-- width 744 --height 1052 --model Phoenix --preset CINEMATIC",
        "A3":           "-- width 1052 --height 1488 --model Phoenix --preset CINEMATIC",
        "A5":           "-- width 528 --height 744 --model Phoenix --preset CINEMATIC",
        "A6":           "-- width 372 --height 528 --model Phoenix --preset CINEMATIC",
        "carte":        "-- width 850 --height 550 --model Phoenix --preset NONE",
        "affiche":      "-- width 800 --height 1200 --model Phoenix --preset CINEMATIC",
        "flyer":        "-- width 840 --height 396 --model Phoenix --preset NONE",
        "logo-carre":   "-- width 1024 --height 1024 --model Phoenix --preset NONE",
        "logo-rect":    "-- width 1024 --height 512 --model Phoenix --preset NONE",
        "logo-hd":      "-- width 2048 --height 2048 --model Phoenix --preset NONE",
        "favicon":      "-- width 512 --height 512 --model Phoenix --preset NONE",
        "watermark":    "-- width 800 --height 400 --model Phoenix --preset NONE",
        "signature":    "-- width 600 --height 200 --model Phoenix --preset NONE",
        "ig-post":      "-- width 1080 --height 1080 --model Phoenix --preset CINEMATIC",
        "ig-story":     "-- width 1080 --height 1920 --model Phoenix --preset CINEMATIC",
        "ig-reels":     "-- width 1080 --height 1920 --model Kino XL --preset CINEMATIC",
        "fb-post":      "-- width 1200 --height 630 --model Phoenix --preset CINEMATIC",
        "fb-cover":     "-- width 851 --height 315 --model Phoenix --preset NONE",
        "fb-story":     "-- width 1080 --height 1920 --model Phoenix --preset CINEMATIC",
        "tiktok":       "-- width 1080 --height 1920 --model Kino XL --preset CINEMATIC",
        "twitter":      "-- width 1600 --height 900 --model Phoenix --preset CINEMATIC",
        "linkedin":     "-- width 1200 --height 627 --model Phoenix --preset CINEMATIC",
        "pinterest":    "-- width 1000 --height 1500 --model Phoenix --preset CINEMATIC",
        "yt-thumb":     "-- width 1280 --height 720 --model Kino XL --preset CINEMATIC",
        "yt-banner":    "-- width 2560 --height 1440 --model Kino XL --preset CINEMATIC",
        "web-banner":   "-- width 728 --height 90 --model Phoenix --preset NONE",
        "leaderboard":  "-- width 970 --height 250 --model Phoenix --preset NONE",
        "display":      "-- width 300 --height 250 --model Phoenix --preset NONE",
    },
    DALLE: {
        "A4":           "size: 1024x1792, quality: hd, style: vivid",
        "A3":           "size: 1024x1792, quality: hd, style: vivid",
        "A5":           "size: 1024x1792, quality: hd, style: vivid",
        "A6":           "size: 1024x1024, quality: hd, style: vivid",
        "carte":        "size: 1792x1024, quality: hd, style: natural",
        "affiche":      "size: 1024x1792, quality: hd, style: vivid",
        "flyer":        "size: 1792x1024, quality: hd, style: vivid",
        "logo-carre":   "size: 1024x1024, quality: hd, style: natural",
        "logo-rect":    "size: 1792x1024, quality: hd, style: natural",
        "logo-hd":      "size: 1024x1024, quality: hd, style: natural",
        "favicon":      "size: 1024x1024, quality: hd, style: natural",
        "watermark":    "size: 1792x1024, quality: hd, style: natural",
        "signature":    "size: 1792x1024, quality: hd, style: natural",
        "ig-post":      "size: 1024x1024, quality: hd, style: vivid",
        "ig-story":     "size: 1024x1792, quality: hd, style: vivid",
        "ig-reels":     "size: 1024x1792, quality: hd, style: vivid",
        "fb-post":      "size: 1792x1024, quality: hd, style: vivid",
        "fb-cover":     "size: 1792x1024, quality: hd, style: vivid",
        "fb-story":     "size: 1024x1792, quality: hd, style: vivid",
        "tiktok":       "size: 1024x1792, quality: hd, style: vivid",
        "twitter":      "size: 1792x1024, quality: hd, style: vivid",
        "linkedin":     "size: 1792x1024, quality: hd, style: vivid",
        "pinterest":    "size: 1024x1792, quality: hd, style: vivid",
        "yt-thumb":     "size: 1792x1024, quality: hd, style: vivid",
        "yt-banner":    "size: 1792x1024, quality: hd, style: vivid",
        "web-banner":   "size: 1792x1024, quality: hd, style: natural",
        "leaderboard":  "size: 1792x1024, quality: hd, style: natural",
        "display":      "size: 1024x1024, quality: hd, style: natural",
    },
};

/* ─── BOOSTERS MODE IA ─── */
const MODE_BOOST = {
    standard: "",
    expert:   "Professional advertising agency quality. Hyperrealistic render, studio-grade post-production.",
    ultra:    "World-class creative direction. Cannes Lions award level. Hyperrealistic photographic perfection. Ultra-detailed, 8K resolution quality. Commercial advertising masterpiece.",
};

/* ─── DOCTOR IA ─── */
const DOCTOR_RULES = [
    { check: (p) => p.length < 200,                                                           score: -20, advice: "Prompt trop court — ajoutez plus de détails visuels." },
    { check: (p) => !p.includes("lighting") && !p.includes("light"),                         score: -15, advice: "Aucun éclairage défini — crucial pour la qualité du rendu." },
    { check: (p) => !p.includes("camera") && !p.includes("lens") && !p.includes("angle"),    score: -10, advice: "Angle de caméra manquant — précisez le point de vue." },
    { check: (p) => !p.includes("mood") && !p.includes("atmosphere") && !p.includes("tone"), score: -10, advice: "Ambiance non définie — ajoutez un mood pour plus d'impact." },
    { check: (p) => p.length > 400,                                                           score: +10, advice: "" },
    { check: (p) => p.includes("ultra") || p.includes("premium") || p.includes("luxury"),    score: +5,  advice: "" },
    { check: (p) => p.includes("hyperrealistic") || p.includes("photorealistic"),             score: +5,  advice: "" },
];

/* ─── COMPATIBILITÉ SECTEUR / STYLE / PALETTE ─── */
const COMPATIBILITY = {
    parfum:       { styles: ["luxe","editorial","fashion","minimaliste","cinematique"],          palettes: ["noir-or","rose-nude","beige-blanc","blanc-argent","violet-neon"] },
    mode:         { styles: ["luxe","fashion","editorial","cinematique","minimaliste"],          palettes: ["noir-or","beige-blanc","rose-nude","blanc-argent","rouge-noir"] },
    joaillerie:   { styles: ["luxe","minimaliste","editorial","cinematique"],                   palettes: ["noir-or","blanc-argent","beige-blanc","rouge-noir"] },
    maroquinerie: { styles: ["luxe","editorial","minimaliste","moderne"],                       palettes: ["noir-or","beige-blanc","terre","blanc-argent"] },
    montres:      { styles: ["luxe","cinematique","minimaliste","editorial"],                   palettes: ["noir-or","blanc-argent","rouge-noir","marine"] },
    immobilier:   { styles: ["luxe","moderne","minimaliste","editorial","cinematique"],         palettes: ["noir-or","beige-blanc","marine","blanc-argent","terre"] },
    architecture: { styles: ["moderne","minimaliste","editorial","cinematique"],                palettes: ["blanc-argent","marine","beige-blanc","noir-or"] },
    decoration:   { styles: ["moderne","minimaliste","organique","editorial"],                  palettes: ["beige-blanc","terre","blanc-argent","rose-nude"] },
    tech:         { styles: ["hightech","moderne","neon","cinematique","agressif"],             palettes: ["bleu-neon","violet-neon","noir-or","blanc-argent"] },
    startup:      { styles: ["moderne","minimaliste","hightech","editorial"],                   palettes: ["bleu-neon","blanc-argent","violet-neon","noir-or"] },
    gaming:       { styles: ["neon","agressif","hightech","cinematique"],                       palettes: ["violet-neon","bleu-neon","rouge-noir","noir-or"] },
    restaurant:   { styles: ["luxe","moderne","organique","editorial","retro"],                 palettes: ["noir-or","beige-blanc","terre","rouge-noir"] },
    coffee:       { styles: ["organique","minimaliste","retro","moderne"],                      palettes: ["terre","beige-blanc","noir-or","blanc-argent"] },
    wine:         { styles: ["luxe","editorial","retro","cinematique"],                         palettes: ["noir-or","rouge-noir","beige-blanc","terre"] },
    fitness:      { styles: ["agressif","moderne","hightech","cinematique","neon"],             palettes: ["rouge-noir","noir-or","bleu-neon","violet-neon"] },
    wellness:     { styles: ["minimaliste","organique","moderne","editorial"],                  palettes: ["beige-blanc","rose-nude","blanc-argent","terre"] },
    finance:      { styles: ["luxe","moderne","minimaliste","editorial"],                       palettes: ["noir-or","marine","blanc-argent","bleu-neon"] },
    assurance:    { styles: ["moderne","minimaliste","editorial"],                              palettes: ["marine","blanc-argent","bleu-neon","noir-or"] },
    consulting:   { styles: ["moderne","minimaliste","editorial","luxe"],                       palettes: ["marine","noir-or","blanc-argent","bleu-neon"] },
    education:    { styles: ["moderne","minimaliste","organique","editorial"],                  palettes: ["bleu-neon","blanc-argent","beige-blanc","vert-or"] },
    sante:        { styles: ["minimaliste","moderne","editorial"],                              palettes: ["blanc-argent","bleu-neon","beige-blanc","marine"] },
    evenement:    { styles: ["agressif","neon","cinematique","editorial","luxe"],               palettes: ["noir-or","violet-neon","rouge-noir","bleu-neon"] },
    musique:      { styles: ["neon","agressif","cinematique","editorial","retro"],              palettes: ["violet-neon","noir-or","rouge-noir","bleu-neon"] },
    hotel:        { styles: ["luxe","editorial","minimaliste","cinematique"],                   palettes: ["noir-or","beige-blanc","blanc-argent","terre"] },
    automobile:   { styles: ["luxe","cinematique","agressif","hightech","moderne"],             palettes: ["noir-or","rouge-noir","blanc-argent","bleu-neon"] },
    beaute:       { styles: ["luxe","fashion","editorial","minimaliste"],                       palettes: ["rose-nude","beige-blanc","blanc-argent","noir-or"] },
};

/* ─── VALEURS PAR DÉFAUT PAR SECTEUR ─── */
const SECTOR_DEFAULTS = {
    parfum:       { visuel: "product",    style: "luxe",        couleur: "noir-or",      format: "ig-story",  modeia: "expert",   typo: "serif-luxe"   },
    mode:         { visuel: "flyer",      style: "fashion",     couleur: "noir-or",      format: "ig-post",   modeia: "expert",   typo: "display"      },
    joaillerie:   { visuel: "product",    style: "luxe",        couleur: "noir-or",      format: "ig-post",   modeia: "ultra",    typo: "serif-luxe"   },
    maroquinerie: { visuel: "product",    style: "luxe",        couleur: "beige-blanc",  format: "ig-post",   modeia: "expert",   typo: "serif-luxe"   },
    montres:      { visuel: "product",    style: "cinematique", couleur: "noir-or",      format: "ig-post",   modeia: "ultra",    typo: "serif-luxe"   },
    immobilier:   { visuel: "flyer",      style: "luxe",        couleur: "noir-or",      format: "fb-post",   modeia: "expert",   typo: "serif-luxe"   },
    architecture: { visuel: "background", style: "moderne",     couleur: "blanc-argent", format: "ig-post",   modeia: "standard", typo: "sans-moderne" },
    decoration:   { visuel: "flyer",      style: "moderne",     couleur: "beige-blanc",  format: "ig-post",   modeia: "standard", typo: "sans-moderne" },
    tech:         { visuel: "product",    style: "hightech",    couleur: "bleu-neon",    format: "ig-post",   modeia: "expert",   typo: "mono"         },
    startup:      { visuel: "post",       style: "moderne",     couleur: "bleu-neon",    format: "linkedin",  modeia: "standard", typo: "sans-moderne" },
    gaming:       { visuel: "flyer",      style: "neon",        couleur: "violet-neon",  format: "tiktok",    modeia: "expert",   typo: "condensed"    },
    restaurant:   { visuel: "flyer",      style: "moderne",     couleur: "noir-or",      format: "ig-post",   modeia: "standard", typo: "serif-luxe"   },
    coffee:       { visuel: "flyer",      style: "organique",   couleur: "terre",        format: "ig-post",   modeia: "standard", typo: "script"       },
    wine:         { visuel: "product",    style: "luxe",        couleur: "rouge-noir",   format: "ig-post",   modeia: "expert",   typo: "serif-luxe"   },
    fitness:      { visuel: "flyer",      style: "agressif",    couleur: "rouge-noir",   format: "ig-story",  modeia: "expert",   typo: "condensed"    },
    wellness:     { visuel: "flyer",      style: "minimaliste", couleur: "beige-blanc",  format: "ig-post",   modeia: "standard", typo: "sans-moderne" },
    finance:      { visuel: "flyer",      style: "luxe",        couleur: "marine",       format: "linkedin",  modeia: "expert",   typo: "serif-luxe"   },
    assurance:    { visuel: "flyer",      style: "moderne",     couleur: "marine",       format: "fb-post",   modeia: "standard", typo: "sans-moderne" },
    consulting:   { visuel: "flyer",      style: "moderne",     couleur: "marine",       format: "linkedin",  modeia: "standard", typo: "sans-moderne" },
    education:    { visuel: "flyer",      style: "moderne",     couleur: "bleu-neon",    format: "fb-post",   modeia: "standard", typo: "sans-moderne" },
    sante:        { visuel: "flyer",      style: "minimaliste", couleur: "blanc-argent", format: "fb-post",   modeia: "standard", typo: "sans-moderne" },
    evenement:    { visuel: "flyer",      style: "agressif",    couleur: "noir-or",      format: "ig-story",  modeia: "expert",   typo: "display"      },
    musique:      { visuel: "flyer",      style: "neon",        couleur: "violet-neon",  format: "ig-post",   modeia: "expert",   typo: "display"      },
    hotel:        { visuel: "flyer",      style: "luxe",        couleur: "beige-blanc",  format: "ig-post",   modeia: "expert",   typo: "serif-luxe"   },
    automobile:   { visuel: "flyer",      style: "cinematique", couleur: "noir-or",      format: "ig-story",  modeia: "ultra",    typo: "condensed"    },
    beaute:       { visuel: "product",    style: "luxe",        couleur: "rose-nude",    format: "ig-post",   modeia: "expert",   typo: "script"       },
};

/* ─── TEMPLATES CAMPAGNE ─── */
const CAMPAIGN_TEMPLATES = {
    mode: {
        hook:    (p) => `Striking fashion editorial. ${p}. Mysterious model, dramatic side lighting, black background, haute couture attitude. Magazine cover energy. Ultra sharp, editorial photography.`,
        present: (p) => `Elegant product showcase. ${p}. Clean white studio, 85mm lens, soft diffused light, luxury fabric detail. Premium fashion brand photography, hyperrealistic.`,
        cta:     (p) => `Bold call-to-action visual. ${p}. Strong graphic text overlay, fashion brand identity, gold and black palette, urgency and exclusivity. Social ads conversion optimized.`,
    },
    parfum: {
        hook:    (p) => `Mysterious perfume visual. ${p}. Smoke effect, dark velvet background, bottle floating in mist. Dreamy ethereal atmosphere, luxury cosmetic photography.`,
        present: (p) => `Glamorous product reveal. ${p}. Studio macro photography, glass refraction, golden light, perfume splash effect. Ultra-detailed luxury cosmetic shot.`,
        cta:     (p) => `Seductive perfume advertisement. ${p}. Model silhouette, golden hour light, desire and luxury. Premium fragrance commercial visual, conversion-focused.`,
    },
    immobilier: {
        hook:    (p) => `Breathtaking property exterior. ${p}. Aerial drone golden hour, architectural perfection, luxury villa. Premium real estate photography.`,
        present: (p) => `Refined interior design shot. ${p}. Wide angle, natural light flooding in, luxury staging, warm tones. High-end real estate interior photography.`,
        cta:     (p) => `Investment opportunity visual. ${p}. Premium brand typography, gold and black, exclusivity and trust. Luxury real estate advertising poster.`,
    },
    tech: {
        hook:    (p) => `Futuristic tech reveal. ${p}. Dark background, neon blue rim light, product floating hologram. Cutting-edge technology product shot.`,
        present: (p) => `Premium tech product detail. ${p}. Macro photography, metallic surface, precision engineering. Studio white background, hyperrealistic render.`,
        cta:     (p) => `Bold tech advertisement. ${p}. Neon cyberpunk color palette, strong graphic elements, innovation energy. Digital-first advertising visual.`,
    },
    restaurant: {
        hook:    (p) => `Irresistible food close-up. ${p}. Steam rising, macro lens, warm restaurant light, gourmet plating art. Appetite-triggering food photography.`,
        present: (p) => `Elegant dish presentation. ${p}. Top-down flat lay, premium plating, dark wood table, soft studio light. Fine dining photography.`,
        cta:     (p) => `Warm restaurant invitation. ${p}. Cozy interior, ambient candlelight, inviting atmosphere. Reservation-focused restaurant advertising.`,
    },
    fitness: {
        hook:    (p) => `Explosive athlete action shot. ${p}. Motion blur, dramatic backlight, gym silhouette. High-energy fitness photography.`,
        present: (p) => `Premium fitness product visual. ${p}. Clean studio, metallic equipment detail, strong composition. Athletic brand photography.`,
        cta:     (p) => `Motivational fitness poster. ${p}. Bold typography, dark background, neon accent, call to action energy. Sports advertising.`,
    },
    evenement: {
        hook:    (p) => `Spectacular event teaser. ${p}. Stage backlight explosion, crowd silhouette, dramatic spotlight. High energy teaser photography.`,
        present: (p) => `Premium event atmosphere. ${p}. Wide angle aerial, confetti cascade, professional event photography.`,
        cta:     (p) => `Urgent event invitation. ${p}. Gold and black, countdown urgency, exclusive atmosphere. Conversion-focused event poster.`,
    },
};

const CAMPAIGN_FALLBACK = {
    hook:    (p, s) => `Powerful attention-grabbing visual. ${p}. Dramatic lighting, cinematic composition, ${SECTORS[s]?.label || s} premium aesthetic.`,
    present: (p, s) => `Clean product presentation. ${p}. Studio quality, professional lighting, ${SECTORS[s]?.label || s} brand identity. Hyperrealistic.`,
    cta:     (p, s) => `Bold conversion advertisement. ${p}. Strong typography, premium color palette, clear call-to-action. ${SECTORS[s]?.label || s} marketing visual.`,
};