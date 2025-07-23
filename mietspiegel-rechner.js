// Grundbeträge nach Wohnfläche
const grundbetraege = {
    20: 8.36, 21: 8.36, 22: 8.36, 23: 8.36, 24: 8.36, 25: 8.36,
    26: 8.15, 27: 7.95, 28: 7.78, 29: 7.61, 30: 7.47,
    31: 7.33, 32: 7.21, 33: 7.10, 34: 7.00, 35: 6.91,
    36: 6.83, 37: 6.76, 38: 6.69, 39: 6.63, 40: 6.58,
    41: 6.53, 42: 6.49, 43: 6.45, 44: 6.42, 45: 6.39,
    46: 6.36, 47: 6.33, 48: 6.31, 49: 6.29, 50: 6.27,
    51: 6.25, 52: 6.23, 53: 6.21, 54: 6.19, 55: 6.18,
    56: 6.16, 57: 6.14, 58: 6.13, 59: 6.11, 60: 6.10,
    61: 6.08, 62: 6.07, 63: 6.05, 64: 6.04, 65: 6.02,
    66: 6.01, 67: 6.00, 68: 5.99, 69: 5.98, 70: 5.98,
    71: 5.97, 72: 5.97, 73: 5.96, 74: 5.96, 75: 5.96,
    76: 5.96, 77: 5.96, 78: 5.96, 79: 5.96, 80: 5.97,
    81: 5.97, 82: 5.97, 83: 5.97, 84: 5.97, 85: 5.97,
    86: 5.97, 87: 5.97, 88: 5.97, 89: 5.97, 90: 5.97,
    91: 5.96, 92: 5.96, 93: 5.96, 94: 5.95, 95: 5.95,
    96: 5.95, 97: 5.94, 98: 5.94, 99: 5.93, 100: 5.93,
    101: 5.92, 102: 5.92, 103: 5.91, 104: 5.90, 105: 5.90,
    106: 5.89, 107: 5.88, 108: 5.88, 109: 5.87, 110: 5.86,
    111: 5.86, 112: 5.85, 113: 5.84, 114: 5.83, 115: 5.82,
    116: 5.82, 117: 5.81, 118: 5.80, 119: 5.79, 120: 5.78,
    121: 5.77, 122: 5.76, 123: 5.75, 124: 5.75, 125: 5.74,
    126: 5.73, 127: 5.72, 128: 5.71, 129: 5.70, 130: 5.69,
    131: 5.68, 132: 5.67, 133: 5.66, 134: 5.65, 135: 5.65,
    136: 5.64, 137: 5.63, 138: 5.62, 139: 5.61, 140: 5.60,
    141: 5.59, 142: 5.59, 143: 5.58, 144: 5.57, 145: 5.56,
    146: 5.55, 147: 5.55, 148: 5.54, 149: 5.53, 150: 5.52,
    151: 5.52, 152: 5.51, 153: 5.50, 154: 5.50, 155: 5.49,
    156: 5.48, 157: 5.48, 158: 5.47, 159: 5.47, 160: 5.46,
    161: 5.46, 162: 5.45, 163: 5.45, 164: 5.45, 165: 5.44,
    166: 5.44, 167: 5.44, 168: 5.43, 169: 5.43, 170: 5.43,
    171: 5.43, 172: 5.42, 173: 5.42, 174: 5.42, 175: 5.42,
    176: 5.42, 177: 5.42, 178: 5.42, 179: 5.43, 180: 5.43
};

// Spannbereiche nach Baujahr
const spannbereiche = {
    'vor_1919': { unten: -0.86, oben: 0.82 },
    '1919_1945': { unten: -0.65, oben: 0.62 },
    '1946_1960': { unten: -0.56, oben: 0.56 },
    '1961_1991': { unten: -0.60, oben: 0.52 },
    '1992_2004': { unten: -0.84, oben: 0.74 },
    '2005_2014': { unten: -0.91, oben: 0.74 },
    'ab_2015': { unten: -1.30, oben: 1.52 }
};

// Haustyp-abhängige Felder ein-/ausblenden
document.getElementById('haustyp').addEventListener('change', function() {
    const mehrfamilienhausOnly = document.querySelectorAll('.mehrfamilienhaus-only');
    const isMehrfamilienhaus = this.value === 'mehrfamilienhaus';
    
    mehrfamilienhausOnly.forEach(element => {
        if (isMehrfamilienhaus) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
            const checkbox = element.querySelector('input[type="checkbox"]');
            const select = element.querySelector('select');
            if (checkbox) checkbox.checked = false;
            if (select) select.selectedIndex = 0;
        }
    });
});

// Fußbodenheizung-Logik
document.getElementById('fussbodenheizungWohnraeume').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('fussbodenheizungKuecheBad').checked = false;
        document.getElementById('fussbodenheizungKuecheBad').disabled = true;
    } else {
        document.getElementById('fussbodenheizungKuecheBad').disabled = false;
    }
});

// Form-Submit Handler
document.getElementById('mietspiegelForm').addEventListener('submit', function(e) {
    e.preventDefault();
    berechneVergleichsmiete();
});

function berechneVergleichsmiete() {
    const wohnflaeche = parseInt(document.getElementById('wohnflaeche').value);
    const haustyp = document.getElementById('haustyp').value;
    const baujahr = document.getElementById('baujahr').value;
    const lage = document.getElementById('lage').value;

    if (!wohnflaeche || !baujahr || !lage) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }

    // Schritt 1: Grundbetrag ermitteln
    let grundbetrag;
    if (haustyp === 'einfamilienhaus') {
        grundbetrag = 7.05;
    } else {
        if (wohnflaeche >= 180) {
            grundbetrag = 5.43;
        } else if (wohnflaeche < 20) {
            grundbetrag = 8.36;
        } else {
            grundbetrag = grundbetraege[wohnflaeche] || 5.43;
        }
    }

    // Schritt 2: Faktoren berechnen
    let faktoren = [];

    // a) Baujahr
    let baujahrFaktor = 1.0;
    switch (baujahr) {
        case 'vor_1919': baujahrFaktor = 1.000; break;
        case '1919_1945': baujahrFaktor = 0.972; break;
        case '1946_1960': baujahrFaktor = 0.924; break;
        case '1961_1991': baujahrFaktor = 0.869; break;
        case '1992_2004': baujahrFaktor = 1.044; break;
        case '2005_2014': baujahrFaktor = 1.113; break;
        case 'ab_2015': baujahrFaktor = 1.246; break;
    }
    faktoren.push(baujahrFaktor);

    // b) Erneuerung und Art der Wohnung
    const erneuerung = document.getElementById('erneuerung').value;
    let erneuerungFaktor = 1.0;
    switch (erneuerung) {
        case 'komplett_5': erneuerungFaktor = 1.148; break;
        case 'ueberwiegend_5': erneuerungFaktor = 1.107; break;
        case 'ueberwiegend_15': erneuerungFaktor = 1.043; break;
        case 'ueberwiegend_25': erneuerungFaktor = 1.021; break;
        case 'keine': erneuerungFaktor = 1.000; break;
    }
    
    if (document.getElementById('moebliert').checked) erneuerungFaktor *= 1.110;
    if (document.getElementById('erdgeschoss').checked && haustyp === 'mehrfamilienhaus') erneuerungFaktor *= 0.991;
    if (document.getElementById('hinterhaus').checked && haustyp === 'mehrfamilienhaus') erneuerungFaktor *= 1.034;
    if (document.getElementById('mehrAls5Geschosse').checked && haustyp === 'mehrfamilienhaus') erneuerungFaktor *= 0.984;
    
    faktoren.push(erneuerungFaktor);

    // c) Heizung, Warmwasser, Leitungen
    let heizungFaktor = 1.0;
    if (document.getElementById('fussbodenheizungWohnraeume').checked) heizungFaktor *= 1.057;
    else if (document.getElementById('fussbodenheizungKuecheBad').checked) heizungFaktor *= 1.022;
    if (document.getElementById('keineZentralheizung').checked && haustyp === 'mehrfamilienhaus') heizungFaktor *= 0.894;
    if (document.getElementById('keineZentraleWarmwasser').checked) heizungFaktor *= 0.979;
    if (document.getElementById('leitungenUeberPutz').checked) heizungFaktor *= 0.982;
    faktoren.push(heizungFaktor);

    // d) Küche
    let kuecheFaktor = 1.0;
    if (document.getElementById('offeneKueche').checked && haustyp === 'mehrfamilienhaus') kuecheFaktor *= 1.012;
    const einbaukueche = document.getElementById('einbaukueche').value;
    switch (einbaukueche) {
        case 'aelter_15': kuecheFaktor *= 1.023; break;
        case 'aelter_5': kuecheFaktor *= 1.035; break;
        case 'letzten_5': kuecheFaktor *= 1.087; break;
    }
    faktoren.push(kuecheFaktor);

    // e) Badezimmer
    let badFaktor = 1.0;
    const badezimmerTyp = document.getElementById('badezimmerTyp').value;
    switch (badezimmerTyp) {
        case 'ein_bad_wanne_oder_dusche': badFaktor *= 1.000; break;
        case 'ein_bad_wanne_und_dusche': badFaktor *= 1.017; break;
        case 'mehrere_baeder': badFaktor *= 1.043; break;
    }
    if (document.getElementById('keinFensterBad').checked) badFaktor *= 0.984;
    if (document.getElementById('bodengleicheDusche').checked) {
        if (baujahr === 'ab_2015') badFaktor *= 1.000;
        else badFaktor *= 1.017;
    }
    
    let sondermerkmaleCount = 0;
    if (document.getElementById('handtuchwandheizkoerper').checked) sondermerkmaleCount++;
    if (document.getElementById('doppelwaschbecken').checked) sondermerkmaleCount++;
    if (document.getElementById('bidet').checked) sondermerkmaleCount++;
    
    if (sondermerkmaleCount >= 2) badFaktor *= 1.041;
    else if (sondermerkmaleCount === 1) badFaktor *= 1.030;
    
    if (document.getElementById('unverkleideterSpuelkasten').checked) badFaktor *= 0.986;
    if (document.getElementById('ungefliesterNassbereich').checked) badFaktor *= 0.956;
    if (document.getElementById('mehrereToiletten').checked) badFaktor *= 1.029;
    faktoren.push(badFaktor);

    // f) Fußboden
    let fussbodenFaktor = 1.0;
    const fussboden = document.getElementById('fussboden').value;
    switch (fussboden) {
        case 'kein_belag': fussbodenFaktor = 1.000; break;
        case 'pvc_teppich': fussbodenFaktor = 1.000; break;
        case 'naturstein_fliesen_dielen': fussbodenFaktor = 1.035; break;
        case 'laminat': fussbodenFaktor = 1.046; break;
        case 'linoleum_vinyl_kork': fussbodenFaktor = 1.064; break;
        case 'parkett': fussbodenFaktor = 1.079; break;
    }
    faktoren.push(fussbodenFaktor);

    // g) Fenster
    let fensterFaktor = 1.0;
    if (document.getElementById('dreifachverglasung').checked) fensterFaktor *= 1.036;
    if (document.getElementById('rolllaeden').checked) fensterFaktor *= 1.000;
    if (document.getElementById('elektrischeRolllaeden').checked) fensterFaktor *= 1.026;
    faktoren.push(fensterFaktor);

    // h) Weitere Ausstattung
    let weitereAusstattungFaktor = 1.0;
    const balkonGroesse = document.getElementById('balkonGroesse').value;
    switch (balkonGroesse) {
        case '1_3': weitereAusstattungFaktor *= 1.036; break;
        case '3_8': weitereAusstattungFaktor *= 1.057; break;
        case 'groesser_8': weitereAusstattungFaktor *= 1.065; break;
    }
    if (document.getElementById('terrasse').checked) weitereAusstattungFaktor *= 1.069;
    if (document.getElementById('pkwStellplatz').checked && haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 1.058;
    if (document.getElementById('aufzug').checked) weitereAusstattungFaktor *= 1.041;
    
    const sprechanlage = document.getElementById('sprechanlage').value;
    switch (sprechanlage) {
        case 'nicht_vorhanden': if (haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 0.926; break;
        case 'ohne_video': if (haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 1.000; break;
        case 'mit_video': if (haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 1.027; break;
    }
    
    if (document.getElementById('deckenspots').checked) weitereAusstattungFaktor *= 1.019;
    if (document.getElementById('abstellkammer').checked) weitereAusstattungFaktor *= 1.012;
    if (document.getElementById('feuerhemmendeTuer').checked) weitereAusstattungFaktor *= 1.015;
    faktoren.push(weitereAusstattungFaktor);

    // i) Lage
    let lageFaktor = 1.0;
    switch (lage) {
        case 'innenstadt_einfach': lageFaktor = 1.100; break;
        case 'innenstadt_mittel': lageFaktor = 1.100; break;
        case 'innenstadt_gut': lageFaktor = 1.100; break;
        case 'innenstadt_sehr_gut': lageFaktor = 1.136; break;
        case 'kerngebiet': lageFaktor = 1.147; break;
        case 'ausserhalb_einfach': lageFaktor = 0.976; break;
        case 'ausserhalb_mittel': lageFaktor = 1.000; break;
        case 'ausserhalb_gut': lageFaktor = 1.051; break;
        case 'ausserhalb_sehr_gut': lageFaktor = 1.061; break;
    }
    faktoren.push(lageFaktor);

    // Schritt 3: Gesamtfaktor und Mittelwert berechnen
    const gesamtfaktor = faktoren.reduce((acc, faktor) => acc * faktor, 1);
    const mittelwert = grundbetrag * gesamtfaktor;

    // Schritt 4: Spannbereich
    const spannbereich = spannbereiche[baujahr];
    const untererWert = mittelwert + spannbereich.unten;
    const obererWert = mittelwert + spannbereich.oben;

    // Ergebnis anzeigen
    document.getElementById('grundbetrag').textContent = grundbetrag.toFixed(2);
    document.getElementById('gesamtfaktor').textContent = gesamtfaktor.toFixed(3);
    document.getElementById('mittelwert').textContent = mittelwert.toFixed(2) + ' €/m²';
    document.getElementById('untererWert').textContent = untererWert.toFixed(2) + ' €/m²';
    document.getElementById('obererWert').textContent = obererWert.toFixed(2) + ' €/m²';
    
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('haustyp').dispatchEvent(new Event('change'));
});

