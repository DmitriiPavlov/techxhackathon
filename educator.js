//this determined what image comes next
function isAlphabetic(str) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
  }

class Teacher {
    //needs to 
    constructor(artPool) {
      this.artworkPool =artPool;
      this.length = artPool.length;
      this.seenArtworks = [];
      this.seenAuthors = [];
      this.seenTimePeriods = [];
      this.answeredCorrectly = 0
      this.answeredIncorrectly = 0
      while(this.artworkPool.length < 50 + this.length){
        let potentialNewArt = Artwork.createRandom();
        if(!isAlphabetic(potentialNewArt.author)){
            continue;
        }
        let sameauthorArray = Artwork.queryAuthor(potentialNewArt.author)
        shuffleArray(sameauthorArray)
        if (sameauthorArray.length > 5){
            sameauthorArray = sameauthorArray.slice(0,5)
        }
        this.artworkPool = this.artworkPool.concat(sameauthorArray)
      }
    }
    


    fetchRandom(){
        return this.artworkPool[getRandomNumber(this.artworkPool.length)];
    }

    createQuestion(){
        let type = ""
        let rand = getRandomNumber(3)
        console.log(rand)
        if (rand == 1){
            type = "title"
        }
        if (rand == 2){
            type = "author"
        }
        else{
            type = "timeframe"
        }

        var answer = this.fetchRandom()
        var choices = [answer, this.fetchRandom(),this.fetchRandom()]
        if (choices[1][type] == choices[0][type] | choices[2][type] == choices[0][type] | choices[2][type] == choices[1][type]){
            choices[1] = Artwork.createRandom();
            choices[2] = Artwork.createRandom();
        }
        shuffleArray(choices)

        return new Question("Which of the following is the "+type+" of this work?",answer,choices,type)

    }

    checkAnswer(question,answer){
        isCorrect = question.answer == answer;
        if (isCorrect){
            this.answeredCorrectly ++;
        }
        else{
            this.answeredIncorrectly ++;
        }
    }

    isTimeForNewTeacher(){
        return ((this.answeredCorrectly + this.answeredIncorrectly > 5) && this.answeredCorrectly/this.answeredIncorrectly > 4.0)
    }
  }

class Question{
    constructor(question,answer,choices,type){
        console.log(answer["author"])
        this.question = question;
        this.answer = answer;
        this.choices = choices;
        this.type = type
    }
}