type Words = {
	[key: string]: string;
};

class Dict {
	private words: Words;
	constructor() {
		this.words = {};
	}

	public add(word: Word) {
		if (this.words[word.term] === undefined) this.words[word.term] = word.def;
	}

	public find(term: string) {
		return this.words[term];
	}

	public remove(term: string) {
		if (this.words[term] !== undefined) {
			const removedMap = new Map(Object.entries(this.words).filter(([k, v]) => k !== term))
			this.words = Object.fromEntries(removedMap);
		}
	}
}

class Word {
	constructor(public readonly term: string, public readonly def: string) {}
}

const kimchi = new Word("kimchi", "The most popular food in Korea");
const test = new Word("test", "test")

const dict = new Dict();

dict.add(kimchi);
dict.add(test)
