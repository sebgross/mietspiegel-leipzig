import { useState } from 'react'
import './App.css'

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
}

// Spannbereiche nach Baujahr
const spannbereiche = {
  'vor_1919': { unten: -0.86, oben: 0.82 },
  '1919_1945': { unten: -0.65, oben: 0.62 },
  '1946_1960': { unten: -0.56, oben: 0.56 },
  '1961_1991': { unten: -0.60, oben: 0.52 },
  '1992_2004': { unten: -0.84, oben: 0.74 },
  '2005_2014': { unten: -0.91, oben: 0.74 },
  'ab_2015': { unten: -1.30, oben: 1.52 }
}

function App() {
  // Grunddaten
  const [wohnflaeche, setWohnflaeche] = useState('')
  const [haustyp, setHaustyp] = useState('mehrfamilienhaus')
  
  // Baujahr
  const [baujahr, setBaujahr] = useState('')
  
  // Erneuerung und Art der Wohnung
  const [erneuerung, setErneuerung] = useState('keine')
  const [moebliert, setMoebliert] = useState(false)
  const [erdgeschoss, setErdgeschoss] = useState(false)
  const [hinterhaus, setHinterhaus] = useState(false)
  const [mehrAls5Geschosse, setMehrAls5Geschosse] = useState(false)
  
  // Heizung, Warmwasser, Leitungen
  const [fussbodenheizungWohnraeume, setFussbodenheizungWohnraeume] = useState(false)
  const [fussbodenheizungKuecheBad, setFussbodenheizungKuecheBad] = useState(false)
  const [keineZentralheizung, setKeineZentralheizung] = useState(false)
  const [keineZentraleWarmwasser, setKeineZentraleWarmwasser] = useState(false)
  const [leitungenUeberPutz, setLeitungenUeberPutz] = useState(false)
  
  // Küche
  const [offeneKueche, setOffeneKueche] = useState(false)
  const [einbaukueche, setEinbaukueche] = useState('keine')
  
  // Badezimmer
  const [badezimmerTyp, setBadezimmerTyp] = useState('ein_bad_wanne_oder_dusche')
  const [keinFensterBad, setKeinFensterBad] = useState(false)
  const [bodengleicheDusche, setBodengleicheDusche] = useState(false)
  const [handtuchwandheizkoerper, setHandtuchwandheizkoerper] = useState(false)
  const [doppelwaschbecken, setDoppelwaschbecken] = useState(false)
  const [bidet, setBidet] = useState(false)
  const [unverkleideterSpuelkasten, setUnverkleideterSpuelkasten] = useState(false)
  const [ungefliesterNassbereich, setUngefliesterNassbereich] = useState(false)
  const [mehrereToiletten, setMehrereToiletten] = useState(false)
  
  // Fußboden
  const [fussboden, setFussboden] = useState('kein_belag')
  
  // Fenster
  const [dreifachverglasung, setDreifachverglasung] = useState(false)
  const [rolllaeden, setRolllaeden] = useState(false)
  const [elektrischeRolllaeden, setElektrischeRolllaeden] = useState(false)
  
  // Weitere Ausstattung
  const [balkonGroesse, setBalkonGroesse] = useState('kein')
  const [terrasse, setTerrasse] = useState(false)
  const [pkwStellplatz, setPkwStellplatz] = useState(false)
  const [aufzug, setAufzug] = useState(false)
  const [sprechanlage, setSprechanlage] = useState('nicht_vorhanden')
  const [deckenspots, setDeckenspots] = useState(false)
  const [abstellkammer, setAbstellkammer] = useState(false)
  const [feuerhemmendeTuer, setFeuerhemmendeTuer] = useState(false)
  
  // Lage
  const [lage, setLage] = useState('')
  
  // Berechnungsergebnis
  const [ergebnis, setErgebnis] = useState(null)

  const berechneVergleichsmiete = () => {
    if (!wohnflaeche || !baujahr || !lage) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.')
      return
    }

    const flaeche = parseInt(wohnflaeche)
    
    // Schritt 1: Grundbetrag ermitteln
    let grundbetrag
    if (haustyp === 'einfamilienhaus') {
      grundbetrag = 7.05
    } else {
      if (flaeche >= 180) {
        grundbetrag = 5.43
      } else if (flaeche < 20) {
        grundbetrag = 8.36
      } else {
        grundbetrag = grundbetraege[flaeche] || 5.43
      }
    }

    // Schritt 2: Faktoren berechnen
    let faktoren = []

    // a) Baujahr
    let baujahrFaktor = 1.0
    switch (baujahr) {
      case 'vor_1919': baujahrFaktor = 1.000; break
      case '1919_1945': baujahrFaktor = 0.972; break
      case '1946_1960': baujahrFaktor = 0.924; break
      case '1961_1991': baujahrFaktor = 0.869; break
      case '1992_2004': baujahrFaktor = 1.044; break
      case '2005_2014': baujahrFaktor = 1.113; break
      case 'ab_2015': baujahrFaktor = 1.246; break
    }
    faktoren.push(baujahrFaktor)

    // b) Erneuerung und Art der Wohnung
    let erneuerungFaktor = 1.0
    switch (erneuerung) {
      case 'komplett_5': erneuerungFaktor = 1.148; break
      case 'ueberwiegend_5': erneuerungFaktor = 1.107; break
      case 'ueberwiegend_15': erneuerungFaktor = 1.043; break
      case 'ueberwiegend_25': erneuerungFaktor = 1.021; break
      case 'keine': erneuerungFaktor = 1.000; break
    }
    
    if (moebliert) erneuerungFaktor *= 1.110
    if (erdgeschoss && haustyp === 'mehrfamilienhaus') erneuerungFaktor *= 0.991
    if (hinterhaus && haustyp === 'mehrfamilienhaus') erneuerungFaktor *= 1.034
    if (mehrAls5Geschosse && haustyp === 'mehrfamilienhaus') erneuerungFaktor *= 0.984
    
    faktoren.push(erneuerungFaktor)

    // c) Heizung, Warmwasser, Leitungen
    let heizungFaktor = 1.0
    if (fussbodenheizungWohnraeume) heizungFaktor *= 1.057
    else if (fussbodenheizungKuecheBad) heizungFaktor *= 1.022
    if (keineZentralheizung && haustyp === 'mehrfamilienhaus') heizungFaktor *= 0.894
    if (keineZentraleWarmwasser) heizungFaktor *= 0.979
    if (leitungenUeberPutz) heizungFaktor *= 0.982
    faktoren.push(heizungFaktor)

    // d) Küche
    let kuecheFaktor = 1.0
    if (offeneKueche && haustyp === 'mehrfamilienhaus') kuecheFaktor *= 1.012
    switch (einbaukueche) {
      case 'aelter_15': kuecheFaktor *= 1.023; break
      case 'aelter_5': kuecheFaktor *= 1.035; break
      case 'letzten_5': kuecheFaktor *= 1.087; break
    }
    faktoren.push(kuecheFaktor)

    // e) Badezimmer
    let badFaktor = 1.0
    switch (badezimmerTyp) {
      case 'ein_bad_wanne_oder_dusche': badFaktor *= 1.000; break
      case 'ein_bad_wanne_und_dusche': badFaktor *= 1.017; break
      case 'mehrere_baeder': badFaktor *= 1.043; break
    }
    if (keinFensterBad) badFaktor *= 0.984
    if (bodengleicheDusche) {
      if (baujahr === 'ab_2015') badFaktor *= 1.000
      else badFaktor *= 1.017
    }
    
    let sondermerkmaleCount = 0
    if (handtuchwandheizkoerper) sondermerkmaleCount++
    if (doppelwaschbecken) sondermerkmaleCount++
    if (bidet) sondermerkmaleCount++
    
    if (sondermerkmaleCount >= 2) badFaktor *= 1.041
    else if (sondermerkmaleCount === 1) badFaktor *= 1.030
    
    if (unverkleideterSpuelkasten) badFaktor *= 0.986
    if (ungefliesterNassbereich) badFaktor *= 0.956
    if (mehrereToiletten) badFaktor *= 1.029
    faktoren.push(badFaktor)

    // f) Fußboden
    let fussbodenFaktor = 1.0
    switch (fussboden) {
      case 'kein_belag': fussbodenFaktor = 1.000; break
      case 'pvc_teppich': fussbodenFaktor = 1.000; break
      case 'naturstein_fliesen_dielen': fussbodenFaktor = 1.035; break
      case 'laminat': fussbodenFaktor = 1.046; break
      case 'linoleum_vinyl_kork': fussbodenFaktor = 1.064; break
      case 'parkett': fussbodenFaktor = 1.079; break
    }
    faktoren.push(fussbodenFaktor)

    // g) Fenster
    let fensterFaktor = 1.0
    if (dreifachverglasung) fensterFaktor *= 1.036
    if (rolllaeden) fensterFaktor *= 1.000
    if (elektrischeRolllaeden) fensterFaktor *= 1.026
    faktoren.push(fensterFaktor)

    // h) Weitere Ausstattung
    let weitereAusstattungFaktor = 1.0
    switch (balkonGroesse) {
      case '1_3': weitereAusstattungFaktor *= 1.036; break
      case '3_8': weitereAusstattungFaktor *= 1.057; break
      case 'groesser_8': weitereAusstattungFaktor *= 1.065; break
    }
    if (terrasse) weitereAusstattungFaktor *= 1.069
    if (pkwStellplatz && haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 1.058
    if (aufzug) weitereAusstattungFaktor *= 1.041
    
    switch (sprechanlage) {
      case 'nicht_vorhanden': if (haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 0.926; break
      case 'ohne_video': if (haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 1.000; break
      case 'mit_video': if (haustyp === 'mehrfamilienhaus') weitereAusstattungFaktor *= 1.027; break
    }
    
    if (deckenspots) weitereAusstattungFaktor *= 1.019
    if (abstellkammer) weitereAusstattungFaktor *= 1.012
    if (feuerhemmendeTuer) weitereAusstattungFaktor *= 1.015
    faktoren.push(weitereAusstattungFaktor)

    // i) Lage
    let lageFaktor = 1.0
    switch (lage) {
      case 'innenstadt_einfach': lageFaktor = 1.100; break
      case 'innenstadt_mittel': lageFaktor = 1.100; break
      case 'innenstadt_gut': lageFaktor = 1.100; break
      case 'innenstadt_sehr_gut': lageFaktor = 1.136; break
      case 'kerngebiet': lageFaktor = 1.147; break
      case 'ausserhalb_einfach': lageFaktor = 0.976; break
      case 'ausserhalb_mittel': lageFaktor = 1.000; break
      case 'ausserhalb_gut': lageFaktor = 1.051; break
      case 'ausserhalb_sehr_gut': lageFaktor = 1.061; break
    }
    faktoren.push(lageFaktor)

    // Schritt 3: Gesamtfaktor und Mittelwert berechnen
    const gesamtfaktor = faktoren.reduce((acc, faktor) => acc * faktor, 1)
    const mittelwert = grundbetrag * gesamtfaktor

    // Schritt 4: Spannbereich
    const spannbereich = spannbereiche[baujahr]
    const untererWert = mittelwert + spannbereich.unten
    const obererWert = mittelwert + spannbereich.oben

    setErgebnis({
      grundbetrag: grundbetrag.toFixed(2),
      gesamtfaktor: gesamtfaktor.toFixed(3),
      mittelwert: mittelwert.toFixed(2),
      untererWert: untererWert.toFixed(2),
      obererWert: obererWert.toFixed(2),
      faktoren: faktoren.map(f => f.toFixed(3))
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏠 Leipziger Mietspiegel Rechner
          </h1>
          <p className="text-xl text-gray-600">2025 - 2027</p>
          <p className="text-sm text-gray-500 mt-2">
            Berechnung der ortsüblichen Vergleichsmiete nach dem Leipziger Mietspiegel
          </p>
        </div>

        <div className="space-y-6">
          {/* Grunddaten */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🏠 Grunddaten der Wohnung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Wohnfläche (m²) *</label>
                <input
                  type="number"
                  min="20"
                  max="200"
                  value={wohnflaeche}
                  onChange={(e) => setWohnflaeche(e.target.value)}
                  placeholder="z.B. 75"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Haustyp *</label>
                <select 
                  value={haustyp} 
                  onChange={(e) => setHaustyp(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="mehrfamilienhaus">Mehrfamilienhaus</option>
                  <option value="einfamilienhaus">Ein-/Zweifamilienhaus</option>
                </select>
              </div>
            </div>
          </div>

          {/* Baujahr */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🏗️ Baujahr der Wohnung</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Baujahr *</label>
              <select 
                value={baujahr} 
                onChange={(e) => setBaujahr(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Wählen Sie das Baujahr</option>
                <option value="vor_1919">vor 1919</option>
                <option value="1919_1945">1919 bis 1945</option>
                <option value="1946_1960">1946 bis 1960</option>
                <option value="1961_1991">1961 bis 1991</option>
                <option value="1992_2004">1992 bis 2004</option>
                <option value="2005_2014">2005 bis 2014</option>
                <option value="ab_2015">ab 2015</option>
              </select>
            </div>
          </div>

          {/* Erneuerung */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🔧 Erneuerung und Art der Wohnung</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Erneuerung der Wohnung</label>
                <select 
                  value={erneuerung} 
                  onChange={(e) => setErneuerung(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="keine">Keine Erneuerung</option>
                  <option value="komplett_5">Komplett in den vergangenen 5 Jahren erneuert</option>
                  <option value="ueberwiegend_5">Überwiegend in den vergangenen 5 Jahren erneuert</option>
                  <option value="ueberwiegend_15">Überwiegend in den vergangenen 15 Jahren erneuert</option>
                  <option value="ueberwiegend_25">Überwiegend in den vergangenen 25 Jahren erneuert</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={moebliert}
                    onChange={(e) => setMoebliert(e.target.checked)}
                  />
                  <span>Möblierte/teilmöblierte Wohnung</span>
                </label>
                
                {haustyp === 'mehrfamilienhaus' && (
                  <>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={erdgeschoss}
                        onChange={(e) => setErdgeschoss(e.target.checked)}
                      />
                      <span>Wohnung im Erdgeschoss</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={hinterhaus}
                        onChange={(e) => setHinterhaus(e.target.checked)}
                      />
                      <span>Wohnung im Hinterhaus/Nebengebäude</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={mehrAls5Geschosse}
                        onChange={(e) => setMehrAls5Geschosse(e.target.checked)}
                      />
                      <span>Gebäude mit mehr als 5 Geschossen</span>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Lage */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">📍 Wohnlage</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Wohnlage *</label>
              <select 
                value={lage} 
                onChange={(e) => setLage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Wählen Sie die Wohnlage</option>
                <option value="innenstadt_einfach">Innerhalb der Innenstadt - einfach</option>
                <option value="innenstadt_mittel">Innerhalb der Innenstadt - mittel</option>
                <option value="innenstadt_gut">Innerhalb der Innenstadt - gut</option>
                <option value="innenstadt_sehr_gut">Innerhalb der Innenstadt - sehr gut</option>
                <option value="kerngebiet">Kerngebietslage</option>
                <option value="ausserhalb_einfach">Außerhalb der Innenstadt - einfach</option>
                <option value="ausserhalb_mittel">Außerhalb der Innenstadt - mittel</option>
                <option value="ausserhalb_gut">Außerhalb der Innenstadt - gut</option>
                <option value="ausserhalb_sehr_gut">Außerhalb der Innenstadt - sehr gut</option>
              </select>
            </div>
          </div>

          {/* Berechnung */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <button 
              onClick={berechneVergleichsmiete} 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🧮 Ortsübliche Vergleichsmiete berechnen
            </button>
          </div>

          {/* Ergebnis */}
          {ergebnis && (
            <div className="bg-green-50 border border-green-200 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">✅ Berechnungsergebnis</h2>
              <p className="text-green-600 mb-4">Ortsübliche Vergleichsmiete nach Leipziger Mietspiegel 2025-2027</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-red-600">{ergebnis.untererWert} €/m²</div>
                  <div className="text-sm text-gray-600">Unterer Spannwert</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">{ergebnis.mittelwert} €/m²</div>
                  <div className="text-sm text-gray-600">Mittelwert (empfohlen)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">{ergebnis.obererWert} €/m²</div>
                  <div className="text-sm text-gray-600">Oberer Spannwert</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Grundbetrag:</strong> {ergebnis.grundbetrag} €/m²
                </div>
                <div>
                  <strong>Gesamtfaktor:</strong> {ergebnis.gesamtfaktor}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                <p><strong>Hinweis:</strong> Als anfänglicher Ausgangswert für die Miethöhe wird sich zunächst regelmäßig der Mittelwert der Miete empfehlen. Bei besonderen wohnwerterhöhenden oder wohnwertmindernden Merkmalen kann vom Mittelwert innerhalb des Spannbereiches abgewichen werden.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

