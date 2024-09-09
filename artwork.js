//AUTHOR	BORN-DIED	TITLE	DATE	TECHNIQUE	LOCATION	URL	FORM	TYPE	SCHOOL	TIMEFRAME
//fetches a line from our text file
function getLine(multilineString,num) {
    const line = multilineString.split('\n')[num];
    return line.split('	')
  }

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  
 
//class that holds all the data about our art piece
class Artwork {
    constructor(lineNumber) {
      this.data = getLine(artists,lineNumber)
    }
    
    //we have 52867 images possible
    static maxIndex = 52866
    //one because 0 doesn't have a valid artwork
    static minIndex = 1

    static createRandom(){
        return new Artwork(getRandomNumber(this.maxIndex))
    }

    //uses linear search to return a list of artworks by the same author
    //yes, i do realize that this is ridiculously slow, but it is ok
    static queryAuthor(authorString){
      var out = []
      for (var i = this.minIndex; i <= this.maxIndex; i++){
        if ((new Artwork(i)).author == authorString){
          out.push(new Artwork(i));
        }
      }
      return out;
    }
    
    static queryType(typeString){
      var out = []
      for (var i = this.minIndex; i <= this.maxIndex; i++){
        if ((new Artwork(i)).type == typeString){
          out.push(new Artwork(i));
        }
      }
      return out;
    }

    get author() {
      return this.data[0];
    }
  
    get bornDied() {
      return this.data[1];
    }
  
    get title() {
      return this.data[2];
    }
  
    get date() {
      return this.data[3];
    }
  
    get technique() {
      return this.data[4];
    }
  
    get location() {
      return this.data[5];
    }
  
    get urlForm() {
      return this.data[6];
    }
    
    get type() {
      return this.data[7];
    }
  
    get school() {
      return this.data[8];
    }
  
    get timeframe() {
      return this.data.slice(9,this.data.length).join(" ");
    }

    get imgUrl(){
        return "https://www.wga.hu/detail/" + this.urlForm.split("/").slice(4,this.data.length).join("/").replace(".html",".jpg")
    }
  }


// Artwork.groupArtworksByAuthor()