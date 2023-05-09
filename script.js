// script to transpose given chords 
// Noah Vedamonickam - 08.05.23

// key arrays
let flatKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
let sharpKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

let sharps = ['C', 'C#', 'D', 'D#', 'E', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let flats = ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'];

// Main Function
function doTranspose() {
	// collect data from html
	let oldKey = document.querySelector("#oldKey").value;
	let newKey = document.querySelector("#newKey").value;
	let transposed = document.querySelector("#lyrics").value;
	let newLyrics = document.querySelector("#newLyrics");

	// no chords
	if (!transposed.includes("[")) {
		newLyrics.innerHTML = transposed;
		return;
	}

	// evaluate keys
	let oldKeys;
	if (flats.includes(oldKey)) {
		oldKeys = flatKeys.slice();
	} else {
		oldKeys = sharpKeys.slice();
	}

	let newKeys;
	if (flats.includes(newKey)) {
		newKeys = flatKeys.slice();
	} else {
		newKeys = sharpKeys.slice();
	}

	let diff = newKeys.indexOf(newKey) - oldKeys.indexOf(oldKey);

	// begin chord search and change
	let index = transposed.indexOf("[");
	let trigger = index - 1;
	while (trigger < index) {
		while (transposed[index] != ']') {
			if (oldKeys.includes(transposed[index])) {
				transposed = transposeChord(transposed, oldKeys, newKeys, index, diff).slice();
			}
			index++;
		}
		index = transposed.indexOf("[", index) + 1;
		trigger++;
	}

	// return transposed 
	newLyrics.innerHTML = transposed;

	// correct formatting
	var cardStack = document.getElementById('card-stack');
	cardStack.prepend(card);
}

// Helper Functions
function transposeChord(transposed, oldKeys, newKeys, index, diff) {
	let chordIndex;
	if (isFS(transposed, index)) {
		chordIndex = oldKeys.indexOf(transposed[index] + transposed[index + 1]);
		transposed = transposed.slice(0, index + 1) + transposed.slice(index + 2);
	} else {
		chordIndex = oldKeys.indexOf(transposed[index]);
	}

	return setCharAt(transposed, index, newKeys.at((chordIndex + diff) % 12));
}

function isFS(transposed, index) {
	if (transposed[index + 1] == 'b' || transposed[index + 1] == '#') return true;
	return false;
}

function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}