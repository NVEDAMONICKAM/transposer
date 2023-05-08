// script to transpose given chords 
// Noah Vedamonickam - 08.05.23

let flatKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
let sharpKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Main Functions

function doTranspose() {
	let oldKey = document.querySelector("#oldKey").value;
	let newKey = document.querySelector("#newKey").value;
	let transposed = document.querySelector("#lyrics").value;
	let newLyrics = document.querySelector("#newLyrics");

	let allKeys;
	if (transposed.includes("#")) {
		allKeys = sharpKeys.slice();
	} else {
		allKeys = flatKeys.slice();
	}

	if (!allKeys.includes(oldKey) || !allKeys.includes(newKey)) {
		alert("Invalid Key!");
		return;
	}

	let diff = allKeys.indexOf(newKey) - allKeys.indexOf(oldKey);

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

	newLyrics.innerHTML = transposed;
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


//// Tests
// [Hello] [Hello] [Hello]
