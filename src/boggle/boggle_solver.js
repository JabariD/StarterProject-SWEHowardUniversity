/* Payton Dennis - @02877343 */

import { dictionary } from './boggle_dictionary';

// /* Main function */
// const findAllSolutions = function (grid, dictionary) {
// 	dictionary = dict;
// 	if (!grid.length || !dictionary.length) return [];

// 	let solutions = [];

// 	// force all words to be lowercase
// 	for (var i = 0; i < dictionary.length; i++) {
// 		dictionary[i] = dictionary[i].toLowerCase();
// 	}

// 	boggle(grid, dictionary, solutions);

// 	return solutions;
// };

// /* Test each substring in the grid */
// function boggle(grid, dictionary, solutions) {
// 	for (var i = 0; i < grid.length; i++) {
// 		for (var j = 0; j < grid[i].length; j++) {
// 			const startLetter = grid[i][j];

// 			if (checkWordMatch(startLetter, dictionary)) {
// 				let visited = createVisitedArray(grid);
// 				boggleFollowPath(grid, i, j, "", dictionary, visited, solutions);
// 			}
// 		}
// 	}
// }

// /* Follow the path to a possible word */
// function boggleFollowPath(
// 	grid,
// 	row,
// 	col,
// 	currentWord,
// 	dictionary,
// 	visited,
// 	solutions
// ) {
// 	if (!validPosition(grid, row, col) && visited[row][col]) return;
// 	if (!checkWordMatch(currentWord, dictionary)) return;

// 	visited[row][col] = true;
// 	if (
// 		grid[row][col] === "Q" ||
//     grid[row][col] === "q" ||
//     grid[row][col] === "Qu"
// 	) {
// 		currentWord += "QU";
// 	} else {
// 		currentWord += grid[row][col];
// 	}

// 	if (
// 		currentWord.length >= 3 &&
//     dictionary.includes(currentWord.toLowerCase()) &&
//     !solutions.includes(currentWord.toUpperCase())
// 	)
// 		solutions.push(currentWord.toUpperCase());

// 	// check all surrounding letters

// 	// up
// 	tryPosition(grid, row - 1, col, visited, currentWord, dictionary, solutions);

// 	// right up diag
// 	tryPosition(
// 		grid,
// 		row - 1,
// 		col + 1,
// 		visited,
// 		currentWord,
// 		dictionary,
// 		solutions
// 	);

// 	// right
// 	tryPosition(grid, row, col + 1, visited, currentWord, dictionary, solutions);

// 	// right down diag
// 	tryPosition(
// 		grid,
// 		row + 1,
// 		col + 1,
// 		visited,
// 		currentWord,
// 		dictionary,
// 		solutions
// 	);

// 	// down
// 	tryPosition(grid, row + 1, col, visited, currentWord, dictionary, solutions);

// 	// left down diag
// 	tryPosition(
// 		grid,
// 		row + 1,
// 		col - 1,
// 		visited,
// 		currentWord,
// 		dictionary,
// 		solutions
// 	);

// 	// left
// 	tryPosition(grid, row, col - 1, visited, currentWord, dictionary, solutions);

// 	// left up diag
// 	tryPosition(
// 		grid,
// 		row - 1,
// 		col - 1,
// 		visited,
// 		currentWord,
// 		dictionary,
// 		solutions
// 	);
// }

// /** Utility functions */

// /* Try to move to this position in the grid. */
// function tryPosition(
// 	grid,
// 	row,
// 	col,
// 	visited,
// 	currentWord,
// 	dictionary,
// 	solutions
// ) {
// 	if (
// 		validPosition(grid, row, col) &&
//     !visited[row][col] &&
//     checkWordMatch(currentWord, dictionary)
// 	) {
// 		var visitedState = []; // create empty array to hold copy

// 		// slice() is what we are using to pass by value not by reference, so that each state gets a brand new copy.
// 		for (var i = 0; i < visited.length; i++) {
// 			visitedState[i] = visited[i].slice();
// 		}
// 		boggleFollowPath(
// 			grid,
// 			row,
// 			col,
// 			currentWord,
// 			dictionary,
// 			visitedState,
// 			solutions
// 		);
// 	}
// }

// /* We should not have visited in new grid position. */
// function createVisitedArray(grid) {
// 	// visited array
// 	let visited = [];
// 	for (var i = 0; i < grid.length; i++) {
// 		visited.push([]);
// 		for (var j = 0; j < grid[i].length; j++) {
// 			visited[i].push(false);
// 		}
// 	}
// 	return visited;
// }

// /* Check if we have a word match. */
// function checkWordMatch(substring, dictionary) {
// 	const wordsExist = dictionary.filter((word) =>
// 		word.toLowerCase().startsWith(substring.toLowerCase())
// 	);
// 	return wordsExist.length !== 0;
// }

// /* Determine if we are in boundaries of the grid */
// function validPosition(grid, row, col) {
// 	return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
// }


function TrieNode(character) {
	this.character = character;
	this.parent = null;
	this.children = {};
	this.isWord = false;
  }
  
  // Returns the word corresponding to this node.
  TrieNode.prototype.asFullWord = function () {
	var output = [];
	var node = this;
  
	while (node !== null) {
	  output.push(node.character);
	  node = node.parent;
	}
  
	output.reverse();
	return output.join("");
  };
  
  function trieInsert(root, word) {
	let node = root;
	for (let i = 0; i < word.length; ++i) {
	  let c = word[i];
	  // If 'Q' is the final letter, word[i+1] is undefined
	  if (c === "Q" && word[i + 1] === "U") {
		c = "QU";
		i = i + 1;
	  }
	  if (node.children[c] === undefined) {
		node.children[c] = new TrieNode(c);
		node.children[c].parent = node;
	  }
	  node = node.children[c];
	}
	node.isWord = true;
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  // The solver itself. We use a helper struct, to simplify argument passing.
  
  function Solver(dict, grid) {
	this.trieRoot = new TrieNode();
	for (let word of dict) {
		trieInsert(this.trieRoot, word);
	}
	this.grid = grid;
	this.solutions = new Set();
  }
  
  Solver.prototype.solve = function () {
	for (let row = 0; row < this.grid.length; ++row) {
	  for (let col = 0; col < this.grid[0].length; ++col) {
		this.recursiveSolve(row, col, this.trieRoot);
	  }
	}
  };
  
  Solver.prototype.recursiveSolve = function (row, col, parentNode) {
	if (
	  row < 0 ||
	  row >= this.grid.length ||
	  col < 0 ||
	  col >= this.grid[0].length
	)
	  return;
  
	const currentTile = this.grid[row][col];
	const currentNode = parentNode.children[currentTile];
	if (currentNode === undefined) return; // '==' matches null or undef

  
	if (currentNode.isWord) {
	  this.solutions.add(currentNode.asFullWord());
	}
	this.grid[row][col] = "."; // Mark the cell, so we don't repeat it.
  
	for (let dx = -1; dx < 2; ++dx) {
	  for (let dy = -1; dy < 2; ++dy) {
		this.recursiveSolve(row + dx, col + dy, currentNode);
	  }
	}
  
	this.grid[row][col] = currentTile; // Unmark the cell.
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  // The public API
  
  function findAllSolutions(grid, dict) {
	dict = dictionary;
	
	// grid to lowercase
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			grid[i][j] = grid[i][j].toLowerCase();
		}
	}
	let solver = new Solver(dict, grid);
	solver.solve();
	return [...solver.solutions];
  }
  
  export default findAllSolutions;
  
