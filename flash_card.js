var Reader = Reader || {}

var FlashCard = function(text) {

    var name = text;
    var faceUp = false;

    function show_word(word) {
        //word should slide in from the left\
        slide_into_view();
    }

    function slide_into_view() {

    }
    
    function cardName(){
        return name;
    }

    function match_word(word) {
        //every time a word is said this should be called
        if (word == card_name) {
            return true;
        }
        return false;
    }

    return {
        match: match_word,
        cardName: cardName()
    }
}

var Deck = function() {
    this.cards = [];
    this.open_card_index = 0;

    function add_card(text) {
        cards.push(new FlashCard(text));
    }

    function next_card() {
        open_card_index++;
    }

    function does_open_card_match(spoken_word) {
        if (get_open_card().match_word(spoken_word)) {
            next_card();
            return true;
        }
        else {
            return false;
        }
    }
}

Deck.prototype.getFaceUpCard = function() {
    return this.cards[this.open_card_index];
}

Deck.prototype.loadDeck = function(rootWord, words){
    var topCard = new FlashCard(rootWord);
    for(var i= 0; i < words.length; i++){
        var flashCard = new FlashCard(words[i]);
        this.cards.push(flashCard);
    }
    this.cards.push(topCard);
    return this.cards;
}