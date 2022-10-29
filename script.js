window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

String.prototype.hashCode = function() {
  var hash = 0;
  if (this.length == 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function createCard(front_text,back_text,id,isNewCard) {
  var isMobile = window.mobilecheck()

  var wrapper = document.getElementById('cardsWrapper')

  var card_container = document.createElement('div')
  card_container.className = 'cardContainer'
  card_container.id = 'cardContainer'
  card_container.onclick = function () {rotate(this);}
  wrapper.appendChild(card_container)

  var card_back = document.createElement('div')
  card_back.className = 'backCard'
  card_back.innerHTML = back_text
  card_container.appendChild(card_back)

  var card_front = document.createElement('div')
  card_front.className = 'frontCard'
  card_front.innerHTML = front_text
  card_container.appendChild(card_front)

  var close_button = document.createElement('div')
  close_button.className = 'closeButton'
  close_button.id = id
  close_button.onclick = function () {removeCard(this);}
  card_front.appendChild(close_button)

  if (isNewCard) {
    card_front.classList.add('newCard')
  }
  if (isMobile) {
    card_container.classList.add('cardContainerMobile')
    card_back.classList.add('backCardMobile')
    card_front.classList.add('frontCardMobile')
    close_button.classList.add('closeButtonMobile')
  } else {
    card_container.classList.add('cardContainerDesktop')
    card_back.classList.add('backCardDesktop')
    card_front.classList.add('frontCardDesktop')
    close_button.classList.add('closeButtonDesktop')
  }
}

function main(newCards = '') {
  if (localStorage.getItem('Allowed') != 'false') {

    var parent = document.getElementById("cardsWrapper");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    fronts = [
    '<span>Definitions</span><ul><li>Displacement</li><li>Amplitude</li><li>Wavelength</li><li>Period</li><li>Phase Difference</li><li>Frequency</li></ul>',
    '<span>Definitions</span><ul><li>Instantaneous speed</li><li>Average Speed</li><li>Thinking Distance, Braking Distance</li><li>Stopping distance</li></ul>',
    '<span>Newtons Laws of motion</span>',
    '<span>Equilibrium Conditions</span>',
    '<span>Archimedes Principle</span>',
    '<span>Definitions & Equations</span><ul><li>Work</li><li>Power</li><li>F = </li><li>E<sub>k</sub> = </li><li>E<sub>p</sub> =</li></ul>',
    '<span>Collision types & Definitions</span>',
    '<span>Definitions</span><ul><li>Current</li><li>Voltage</li><li>Resistance</li><li>EMF & P.D.</li></ul>',
    '<span>Explain how a stationary/standing wave occurs</span>',
    '<span>Explain, using superposition, how bright spots / loud sounds occur when two or more waves interfere<br>Explain dark spots also</span>',
    '<span>Definitions</span><ul><li>Interference</li><li>Superposition</li><li>Coherence</li><li>Intensity</li><li>Polarisation</li><li>Diffraction</li><li>Phase difference</li></ul>',
    '<span>Definitions</span><ul><li>Wavelength</li><li>Frequency</li><li>Time period</li><li>Amplitude</li><li>Monochromatic</li></ul>',
    '<span>Definitions</span><ul><li>Transverse wave</li><li>Longitudinal wave</li><li>Displacement</li><li>Plane polarised</li></ul>',
    '<span>Differences between progressive & stationary waves</span>',
    '<span>Diffraction/interference pattern explanation</span>',
    '<span>Definitions</span><ul><li>Electron-volt</li><li>Photon</li><li>Photoelectric effect</li><li>Electron energy levels</li><li>Work function</li><li>de Broglie wavelength</li></ul>',
    '<span>Photoelectric effect & evidence for particle model of light</span>',
    '<span>Evidence for wave-like behaviour of particles/matter</span>',
    '<span>Motion in a circle</span>',
    '<span>Kepler’s 3 Laws and derive<br><math><msup><mi>T</mi><mn>2</mn></msup>=<mfrac><mn><msup><mi>GMT&#178</msup></mn><mi><msup><mi>4π&#178</msup></mi></mfrac><msup><mi>r</mi><mn>3</mn></msup></math></span>',
    '<span>Definitions</span><ul><li>Gravitational potential</li><li>Gravitational potential at infinity</li></ul>',
    '<span>Negative potential energy<br>(gravitational, electrical, nuclear)</span>',
    '<span>Definitions</span><ul><li>Drift Velocity</li><li>Conductors, Insulators, Semiconductors</li><li>EMF of p.d</li><li>Ohmic and non ohmic components</li></ul>',
    '<span>Definitions</span><ul><li>Internal resistance</li><li>Lost volts</li></ul>',
    '<span>Explain</span><ul><li>Potential divider with LDR or thermistor if voltage output is to increase with increasing light/temperature</li></ul>',
    '<span>Stress – Strain graph for:</span><ul><li>Ductile</li><li>Brittle</li><li>Polymetric (polymers)</li><li>Define brittle</li></ul>',
    '<span>Force – Extension graph and Hooke’s Law</span>',
    '<span>Standing Wave</span><ul><li>Diagram + Harmonics (1<sup>st</sup> → 3<sup>rd</sup>)</li></ul>',
    '<span>I-V Characteristics</span><ul><li>Filament lamp</li><li>Resistor</li><li>Thermistor (NTC)</li><li>Diode</li><li>LED</li></ul>',
    '<span>I-V Characteristics explain</span><ul><li>Filament Lamp</li><li>Thermistor</li></ul>',
    '<span>Kirchhoff’s Laws & what is conserved</span>',
    '<span>SHM</span><ul><li>Definition</li><li>Key points</li><li>Graph</li></ul>',
    '<span>Energy in SHM oscillators and damping</span>',
    '<span>Force oscillations & resonance</span>',
    '<span>Capacitors</span><ul><li>Time constant</li><li>How it works</li></ul>',
    '<span>Electromagnetism</span><ul><li>Lenz’ Law</li><li>Faraday’s Law</li></ul>',
    '<span>Explanation of how a simple laminated iron-covered transformer works</span>',
    '<span>Alpha scattering experiment to determine nuclear model of atom</span>',
    '<span>Relative/approximate sizes of atom & nucleus</span>'
    ]
    // <span>Kepler’s 3 Laws and derive T^2 = ( GMT^2 / 4π^2 ) r^3</span>

    backs = [ 
    '<p>Displacement: distance from equilibrium</p><p>Amplitude: maximum displacement</p><p>Wavelength: minimum distance between two identical points on a wave (same displacement and vibrating in same direction)</p><p>Period: the time for a complete oscillation</p><p>Frequency: the number of oscillations in one second</p><p>Phase difference: the number of radians by which one wave leads or lads another</p>', 
    '<p>Instantaneous speed: rate of change of distance at a specific time</p><p>Average speed: rate of change of distance over a period of time or whole journey</p><p>Thinking distance: s=vt, t=thinking / reaction time</p><p>Braking distance: distance for work done by brakes to convert all of kinetic energy store to thermal store</p><p>Stopping distance: Thinking + braking distance</p>',
    '<p>1.	An object remains at rest or moves with a constant velocity (speed and direction) unless a net/resultant force acts on it</p><p>2.	Force = Rate of change of momentum</p><p>3.	Every action has an equal and opposite reaction</p>',
    '<p>Sum of forces = zero</p><p>Sum of moments = zero</p>',
    '<p>A floating object displaces its weight in water / fluid</p><p>A submerged object displaces its volume in the fluid and up-thrust = weight of weight of fluid displaced</p>',
    '<p>Work = Energy transferred</p><p>Work = Fs</p><p>Power = Work dome per unit time</p><p>F = ma</p><p>E<sub>k</sub> = ½ mv<sup>2</sup></p><p>E<sub>p</sub> = mgh</p>',
    '<p>All collisions – momentum is conserved</p><p>Elastic collisions – momentum and kinetic energy are conserved</p><p>Inelastic collisions – definitions means Ek  is not conserved</p>',
    '<p>Current: The charge per unit time flowing through a point</p><p>Voltage: Energy transferred per unit charge</p><p>EMF: Energy transferred per unit charge to electrical energy from other type</p><p>Potential difference: Energy transferred per unit charge from electrical energy to other type</p><p>Resistance: voltage per unit current</p>',
    '<p>An incident (progressive) wave reflects off the end of the string</p><p>The incident and reflected waves interfere & superpose</p><p>The displacements of each wave add together at every point</p><p>At certain frequencies a stable pattern of interference occurs</p><p>If a peak meets a trough (arrive in antiphase), a point of zero amplitude occurs – called a node</p><p>Where a peak meets a peak (or a trough and a trough), a point of maximum amplitude occurs – called an antinode</p>',
    '<p>Superposition is where the displacements of the waves add together</p><p>If path difference is λ, 2λ, etc then waves arrive in phase</p><p>In phase waves constructively interfere and cause bright spots / louds sounds</p><p>If path difference is λ/2, (3λ)/2 etc then waves arrive in antiphase</p><p>In antiphase waves destructively interfere, resulting in little/no light and quiet sound',
    '<p>Interference: When two (or more) waves meet & superpose</p><p>Superposition: The displacements of two (or more) waves add at every point</p><p>Coherence: A constant phase difference between two waves</p><p>Intensity: Power per unit area (α amplitude)</p><p>Polarisation: The direction/angle of vibration of a wave (electric field for EM)</p><p>Diffraction: Spreading out of a wave if it meets an edge or gap</p><p>Phase difference: Fraction of a cycle (often as an angle) between two point son a wave or between two wave at the same point</p>',
    '<p>Wavelength: Minimum distance between two identical points on a wave</p><p>Frequency: Number of oscillations at a point per second</p><p>Time period: Time taken to produce one complete oscillation</p><p>Amplitude: The maximum displacement of a wave/particle</p><p>Monochromatic: A single wavelength of light</p>',
    '<p>Transverse waves: Have vibrations that are perpendicular (90°) to the direction of wave propagation</p><p>Longitudinal waves: Have vibrations that are parallel to wave propagation</p><p>Displacement: The distance of a part of the wave/particle from its equilibrium position</p><p>Plane polarised: Oscillations are all in one direction only, perpendicular to the direction of wave propagation</p>',
    '<p>Progressive waves:</p><p>Transfer energy<p><p>All points of wave have the same amplitude (maximum displacement)<p><p>Standing wave:</p><p>Do not have a net transfer of energy</p><p>Store energy</p><p>Only have maximum amplitude at antinodes</p>',
    '<p>All waves will add together at all points and superpose</p><p>If the path difference between each wave is λ, 2λ etc then they arrive in phase & constructively interfere, causing maximum intensity</p><p>If the path difference between each wave is λ/2, (3λ)/2 then they arrive in anti-phase meaning they destructively interfere, leading to a minimum intensity / little / no intensity</p>',
    '<p>Electron-volt: The energy gained by a charge of one electron accelerated by one volt</p><p>Photon: Single packet of electromagnetic energy ( E=hf or E=hc/λ )</p><p>Photoelectric effect: The emission of electrons from a metal surface by incident photons</p><p>Electron energy levels: Energy required to remove an electron from an atom</p><p>Work function: The minimum energy needed to remove an electron from the surface of the metal</p><p>de Broglie wavelength: The wavelength associated with a particle</p>',
    '<p>If light were a wave then any frequency with a high enough intensity would remove electrons</p><p>No electrons are removed unless the light has at least a certain threshold frequency</p><p>Higher frequencies of light only increase the maximum kinetic energy of photoelectrons, intensity increases the number of electrons</p><p>This means that light is a particle as one photon can only eject one electron</p><p>If the photon has insufficient energy then no electrons are removed</p>',
    '<p>A beam of electrons incident on a thin sheet of graphite</p><p>A (circular) diffraction pattern occurs showing wave-like properties of matter</p><p>Higher accelerating voltage means greater momentum and shorter wavelength</p><p>Shorter wavelength means reduced spacing between fringes (λ=h⁄p)</p><p>Maximum diffraction is when wavelength is about the size of atomic spacing</p>',
    '<p>A constant net force towards the centre of the circle</p><p>Called the centripetal force (F<sub>c</sub>)</p><p>T-W=F<sub>c</sub></p>',
    '<p>① Planets orbit in ellipses</p><p>② Area swept out by a planet in orbit in any period of time is always the same</p><p>③ <math><msup><mi>T</mi><mn>2</mn></msup>α<msup><mi>R</mi><mn>2</mn></msup><math></p><p><math><mfrac><mn>GMm</mn><mi>r&#178</mi></mfrac>=m<msup><mi>ω</mi><mn>2</mn></msup>r</math></p><p><math><mfrac><mn>GM</mn><mi>ω&#178</mi></mfrac>=<msup><mi>r</mi><mn>3</mn></msup></p><p><math>ω=<mfrac><mn>4𝜋&#178</mn><mi>T&#178</mi></mfrac></math></p><p><math><mfrac><mn>GMT&#178</mn><mi>4𝜋&#178</mi></mfrac>=<msup><mi>r</mi><mn>3</mn></msup></math><p>',
    '<p>The work done in bringing unit mass from infinity to a point</p><p>Potential at infinity = zero</p>',
    '<p>Potential is zero at infinity / very far away</p><p>Potential (energy) increases as distance increases</p><p>So potential must be negative</p><p>Energy needs to be put in to separate objects</p><p>So binding energy must be negative</p>',
    '<p>Drift velocity: velocity of the mean position of the charge carriers<p><p>Conductors – very high ‘n’ (≈ 10<sup>28</sup>)</p><p>Semiconductor – medium ‘n’ (≈ 10<sup>15</sup> - 10<sup>20</sup>?)</p><p>Insulators – Very few charge carriers</p>',
    '<p>Internal resistance: the resistance of the battery / power supply</p><p>Lost volts: p.d dropped inside a power supply, ¬¬not available to external circuit</p>',
    '<p>As temperature (light level) increases the resistance of the thermistor / LDR decreases</p><p>Therefore, the proportion of the total resistance that it has will decrease</p><p>The proportion of the total resistance the fixed resistor has will increase</p><p>Therefore, the voltage dropped across the fixed resistor will increase</p>',
    "<img src='assets/stress_strain.svg' style='width: 80%'><p>Brittle = Little extension before fracture</p>",
    "<img src='assets/force_extension.svg'>",
    "<table><tr><th>Harmonic</th><th>Closed - Closed</th><th>Open - Open</th></tr><tr><td>1<sup>st</sup></td><td><img src='assets/a1.svg'></td><td><img src='assets/b1.svg'></td></tr><tr><td>2<sup>nd</sup></td><td><img src='assets/a2.svg'></td><td><img src='assets/b2.svg'></td></tr><tr><td>3<sup>rd</sup></td><td><img src='assets/a3.svg'></td><td><img src='assets/b3.svg'></td></tr></table><p>Closed = node</p><p>Open = antinode</p>",
    '<table><tr><td>Filament Lamp ADD_IMAGE</td><td>Resistor ADD_IMAGE</td><tr><tr><td>Thermistor (NTC) ADD_IMAGE</td><td>Diode ADD_IMAGE</td><tr><tr><td>LED ADD_IMAGE</td><tr></table>',
    '<p>Filament lamp</p><p>Electrons collide with ions making them vibrate more</p><p>Vibration of ions means more electrons are less able to move through lattice</p><p>Therefore, resistance increases and hence gradient decreases</p><br><p>Thermistor (NTC)</p><p>Higher temperature frees more charge carriers</p><p>An increasing ‘n’ significantly decreases resistance</p><p>This is a larger effect than more vibration reducing electron flow</p><p>Hence gradient increases</p>',
    '<p>1st Law: The sum of currents entering any junction in a circuit is equal to the sum of the currents leaving the junction (conservation of charge)</p><p>2nd Law: The sum of the EMFs in any closed loop in a circuit is equal to the sum of the potential differences (conservation of energy)</p>',
    '<p>If driving frequency = natural frequency then oscillator resonates</p><p>Maximum amplitude occurs in resonance</p><p>Examples: child pushed on swing, bridge with people walking on, washing machine vibrating</p>ADD_IMAGE',
    '<p>Total energy = kinetic + potential</p><p>Energy oscillates between Ek and Ep</p><p>Total energy (with damping) in the system decreases with time</p>ADD_IMAGE ADD_IMAGE',
    '<p>Restoring force is proportional to displacement</p><p>Time period or frequency is independent of displacement (isochronous)</p>',
    '<p>Time constant = RC = time taken for Q or I to reduce to 37% (e<sup>-1</sup>) of value</p><p>Electrons added to one plate & removed from other plate</p><p>Until voltage across capacitor = voltage of battery</p>',
    '<p>Faraday’s Law: EMF is proportional to (-) rate of change of flux linkage</p><p>ε=-(ΔNΦ)/Δt</p><p>Lenz’s Law: Induced EMF induces a magnetic field that always opposes original magnetic field</p>',
    '<p>An alternating current in the primary coil induces an alternating/changing magnetic field</p><p>The iron core transfers the field efficiently to the secondary coil</p><p>Alternating magnetic field around secondary coil induces an alternating EMF across coil</p><p>Size of EMF is proportional to ratio of coils in primary & secondary</p><p>Lamination reduces eddy currents induced in the core to decrease heat loss</p>',
    '<p>Beam of alpha particles incident on gold foil</p><p>If atom was a cloud of positive charge with electrons stuck in it (plum pudding) all alpha particles would go straight through</p><p>In fact most go through, a small number are deflected by small angles and a very small number bounce back</p><p>Therefore most of the atom is empty space, with a small positive nucleus containing most of the mass and electrons orbiting it</p>',
    '<p>Atom ≈ 10<sup>-10</sup>m</p><p>Nucleus ≈ 10<sup>-15</sup>m</p>'
    ]

    var blacklist = []

    if (localStorage.getItem('blacklist')) {
      var blacklist = localStorage.getItem('blacklist').split(',')
    }
    
    for (x=0;x<fronts.length; x++) {
      if (blacklist.indexOf(x.toString()) >= 0) {
        console.log(x)
      } else {
        if (newCards.indexOf(x.toString()) >= 0) {
          createCard(fronts[x],backs[x],x,true)
        } else {
          createCard(fronts[x],backs[x],x,false)
        }
      }
    }

  } else {
    document.getElementById('logo').style.display = 'none'
    var elem = document.getElementById('title')
    elem.innerHTML = 'You Think it will just work if you reload? LOL'
    document.getElementById("cardsWrapper").style.display = "none"
    document.getElementById("reset").style.display = "none"
  }

}

function rotate(element) {
  if (element.classList.contains('rotated')) {
    element.classList.remove('rotated')
  } else {
    element.classList.add('rotated')
  }
}

function disable() {
  document.getElementsByTagName('body')[0].style.display = 'none'
  localStorage.setItem('Allowed', 'false')
}

function removeCard(elem) {
  elem.parentNode.parentNode.style.display = 'none'
  var current = localStorage.getItem('blacklist')
  localStorage.setItem('blacklist', current+","+elem.id)
}

function resetCards() {
  var newCards = localStorage.getItem('blacklist')
  localStorage.setItem('blacklist', '')
  main(newCards)
  // document.body.scrollTop = document.documentElement.scrollTop = 0;
  // location.reload();
}