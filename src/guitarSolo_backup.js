import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class GuitarSolo{
  heading = 'Guitar Solo';
  totalPoints = 0;
  chances = [
    {
      id: 1,
      soloToGuessId: -1,
      userHasMadeAGuess: false,
      guessIsCorrect: false,
      guessIsPartiallyCorrect: false,
      points: 0,
      className: "btn btn-info"},
    {
      id: 2,
      soloToGuessId: -1,
      userHasMadeAGuess: false,
      guessIsCorrect: false,
      guessIsPartiallyCorrect: false,
      points: 0,
      className: "btn btn-default disabled"},
    {
      id: 3,
      soloToGuessId: -1,
      userHasMadeAGuess: false,
      guessIsCorrect: false,
      guessIsPartiallyCorrect: false,
      points: 0,
      className: "btn btn-default disabled"},
    {
      id: 4,
      soloToGuessId: -1,
      userHasMadeAGuess: false,
      guessIsCorrect: false,
      guessIsPartiallyCorrect: false,
      points: 0,
      className: "btn btn-default disabled"},
    {
      id: 5,
      soloToGuessId: -1,
      userHasMadeAGuess: false,
      guessIsCorrect: false,
      guessIsPartiallyCorrect: false,
      points: 0,
      className: "btn btn-default disabled"
    }
  ];
  artists = [];
  songs = [];
  soloToGuessOgg = "";
  soloToGuess = "";
  soloToGuessId = -1;
  soloToGuessLabelText = "";
  artistLabelText = "";
  songLabelText = "";
  guessButtonLabelText = "";
  nextButtonLabelText = "";
  selectedArtist: "";
  previouslySelectedArtist: "";
  selectedSong: "";
  url = 'http://localhost:9001/getSongsByArtist';

  constructor(http){
    this.http = http;
    //alert(getGuid());
    
    this.uId = generateGuid();
    
    function generateGuid() {
     return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
  }

  get changedArtist(){
    var artistId;
    
    alert(this.selectedArtist);
    if (this.previouslySelectedArtist === this.selectedArtist){
	  }else{
	  this.previouslySelectedArtist = this.selectedArtist;
	  
    this.url = 'http://localhost:9001/getSongsByArtist';
    artistId = this.selectedArtist;
      
    this.url += "?artistId=" + artistId;
    
    return this.http.jsonp(this.url).then(response => {
        this.songs = response.content.songs;
      });
	  }
  }
  
  submitGuess(){
    var artistId;
    var songId;
    var soloToGuessId;
    
    artistId = this.selectedArtist;
    songId = this.selectedSong;
    soloToGuessId = this.soloToGuessId;
    
    this.url = 'http://localhost:9001/guessSong';
    
    this.url = this.url.concat("?artistId=", artistId, "&songId=", songId, "&soloToGuessId=", soloToGuessId);
    
    //alert(`Guess, ${this.url}`);
    return this.http.jsonp(this.url).then(response => {
        //alert(`Guess Return, ${response.content.result}`);
        var index;
        var chancesLength;
        var chance;
        var className;
        
        chancesLength = this.chances.length;
        for (index = 0; index < chancesLength; index++) {
          chance = this.chances[index];
          if (chance.userHasMadeAGuess === true){
          } else {
            chance.userHasMadeAGuess = true;
            if (response.content.result === 0){
              chance.guessIsCorrect = true;
              chance.points = 7;
              this.totalPoints = this.totalPoints + 7;
              className = "btn btn-success";
            } else {
              if (response.content.result === -1){
                  chance.guessIsPartiallyCorrect = true;
                  chance.points = 3;
                  this.totalPoints = this.totalPoints + 3;
                  className = "btn btn-warning";  
              } else {
                if (response.content.result === 1){
                  className = "btn btn-danger";  
                }
              }
            }
            chance.className = className;
            if (index < chancesLength) {
              this.chances[index + 1].className = "btn btn-info";
            }
            break;
          }
        }
        this.selectedArtist = "";
        this.selectedSong = "";
        this.songs = [];
        this.getNextSongToGuess();
      });
  }

  activate(){
 	  this.url = 'http://localhost:9001/initialData';
    this.url = this.url.concat("?sessionId=", this.uId);
    return this.http.jsonp(this.url).then(response => {
        var soloToGuessFile;
        this.artists = response.content.artists;
        soloToGuessFile = response.content.soloToGuessFile;
	      this.soloToGuess = response.content.soloToGuessFile.concat(".mp3");
        //this.soloToGuess = "<source type='audio/mpeg' src='solos/" + soloToGuessFile + ".mp3'>";
        this.soloToGuessOgg = response.content.soloToGuessFile.concat(".ogg");
        this.soloToGuessId = response.content.soloToGuessId;
	      this.soloToGuessLabelText = "Guess The Solo";
  	    this.artistLabelText = "Artist";
  	    this.songLabelText = "Song";
	      this.guessButtonLabelText = "Guess";
        this.nextButtonLabelText = "Next";
        this.soloToGuessArtistAndSong = response.content.soloToGuessArtistAndSong;
        this.onNextButtonClicked = function onNextButtonClicked() {
                                     this.resetChances();
                                     this.selectedArtist = "";
                                     this.selectedSong = "";
                                     this.songs = [];
                                     this.getNextSongToGuess();
                                   };
        this.onSelectedArtistChanged = function onSelectedArtistChanged() {
                                          this.getSongsByArtistId();
                                        };
      });
      
  }

  canDeactivate(){
    //return confirm('Are you sure you want to leave?');
  }
  
  getSongsByArtistId(){
  var artistId;
	  
  this.url = 'http://localhost:9001/getSongsByArtist';
  artistId = this.selectedArtist;
      
  this.url += "?artistId=" + artistId;
    
  return this.http.jsonp(this.url).then(response => {
      this.songs = response.content.songs;
    });
  }
  
  getNextSongToGuess(){
 	  this.url = 'http://localhost:9001/initialData';
    this.url = this.url.concat("?sessionId=", this.uId);
    return this.http.jsonp(this.url).then(response => {
        var soloToGuessFile;
        var audioElement;
        //this.artists = response.content.artists;
        soloToGuessFile = response.content.soloToGuessFile;
	      this.soloToGuess = response.content.soloToGuessFile.concat(".mp3");
        //alert('this.soloToGuess: ' + this.soloToGuess);
        //this.soloToGuess = "<source type='audio/mpeg' src='solos/" + soloToGuessFile + ".mp3'>";
        this.soloToGuessOgg = response.content.soloToGuessFile.concat(".ogg");
        this.soloToGuessId = response.content.soloToGuessId;
        audioElement = document.getElementById("audioElement");
        this.soloToGuessArtistAndSong = response.content.soloToGuessArtistAndSong;
        if (audioElement) {
          setTimeout(function(){
            //audioElement.load();  
            audioElement.load(); 
          }, 300);
        }
	      // this.soloToGuessLabelText = "Guess The Solo";
  	    // this.artistLabelText = "Artist";
  	    // this.songLabelText = "Song";
	      // this.guessButtonLabelText = "Guess";
        // this.nextButtonLabelText = "Next2";
      });
  }
  
  resetChances(){
   var index;
   var chancesLength;
   var chance;
   var className;

   this.totalPoints = 0;
   chancesLength = this.chances.length;
   for (index = 0; index < chancesLength; index++) {
    chance = this.chances[index];
    chance.userHasMadeAGuess = false;
    chance.guessIsCorrect = false;
    chance.guessIsPartiallyCorrect = false;
    chance.points = 0;
    if (index === 0){
      className = "btn btn-info";
    } else {
      className = "btn btn-default disabled";
    }
    chance.className = className;
    
   }
  }
}