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
	let allKeys;
	if (sharps.includes(oldKey)) {
		if (flats.includes(newKey)) {
			alert("Invalid Key!");
			return;
		} else {
			allKeys = sharpKeys.slice();
		}
	} else {
		if (sharps.includes(newKey)) {
			alert("Invalid Key!");
			return;
		} else {
			allKeys = flatKeys.slice();
		}
	}

	let diff = allKeys.indexOf(newKey) - allKeys.indexOf(oldKey);

	// begin chord search and change
	let index = transposed.indexOf("[");
	let trigger = index - 1;
	while (trigger < index) {
		let chordIndex;
		if (containsFS(transposed, index)) {
			chordIndex = allKeys.indexOf(transposed[index + 1] + transposed[index + 2]);
			transposed = transposed.slice(0, index + 2) + transposed.slice(index + 3);
		} else {
			chordIndex = allKeys.indexOf(transposed[index + 1]);
		}

		if (chordIndex == -1) {
			alert("Invalid chord found in song!");
			return;
		}

		transposed = setCharAt(transposed, index + 1, allKeys.at((chordIndex + diff) % 12));
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
function containsFS(transposed, index) {
	if (transposed[index + 2] == 'b' || transposed[index + 2] == '#') return true;
	return false;
}

function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
}