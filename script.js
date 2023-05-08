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
		let chordIndex;
		if (isFS(transposed, index)) {
			chordIndex = oldKeys.indexOf(transposed[index + 1] + transposed[index + 2]);
			transposed = transposed.slice(0, index + 2) + transposed.slice(index + 3);
		} else {
			chordIndex = oldKeys.indexOf(transposed[index + 1]);
		}

		if (chordIndex == -1) {
			alert("Invalid chord found in song (-1)!");
			return;
		}

		transposed = setCharAt(transposed, index + 1, newKeys.at((chordIndex + diff) % 12));
		index = transposed.indexOf("[", index + 1);
		trigger++;
	}

	// return transposed 
	newLyrics.innerHTML = transposed;

	// correct formatting
	var cardStack = document.getElementById('card-stack');
	cardStack.prepend(card);
}

// Helper Functions
function isFS(transposed, index) {
	if (transposed[index + 2] == 'b' || transposed[index + 2] == '#') return true;
	return false;
}

function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}