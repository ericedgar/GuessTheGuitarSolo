import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class GuitarSolo{
  heading = 'Guess The Guitar Solo';
  totalPoints = 0;
  chanceLevel2IsVisible = false;
  chanceLevel3IsVisible = false;
  allLevelsComplete = false;
  isButtonsDisabled = false;
  chancesLevel1 = [
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
  
  chancesLevel2 = [
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
  
  chancesLevel3 = [
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
  originalArtists = [];
  artistsAndSongs = [];
  originalArtistsAndSongs = [];
  songs = [];
  rockIsChecked = true;
  metalIsChecked = true;
  classicIsChecked = true;
  oldiesIsChecked = true;
  countryIsChecked = true;
  soloToGuessOgg = "";
  soloToGuess = "";
  soloToGuessId = -1;
  soloToGuessLabelText = "";
  artistLabelText = "";
  songLabelText = "";
  songSelectSize = 2;
  guessButtonLabelText = "";
  giveUpButtonLabelText = "";
  startOverButtonLabelText = "";
  modalTitleText = "";
  modalMessageText = ""
  selectedArtist: "";
  previouslySelectedArtist: "";
  selectedSong: "";
  songHasFocus: "";
  searchValue: "";
  searchPlaceholderText: "";
  clearButtonText: "";
  sortButtonText: "";
  totalPointsLabelText: "";
  level1LabelText: "";
  level2LabelText: "";
  level3LabelText: "";
  rockLabelText: "";
  metalLabelText: "";
  classicLabelText: "";
  oldiesLabelText: "";
  countryLabelText: "";
  selectArtistValidationTitle = "";
  selectArtistValidationText = "";
  selectSongValidationTitle = "";
  selectSongValidationText = "";
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
  
  getLevelGuessCount(level) {
    var chancesLength;
    var index;
    var chance;
    var levelGuessCount;
    var chancesLevelToUse;
    
    chancesLevelToUse = this.getChancesByLevel(level);
    
    levelGuessCount = 0;
    chancesLength = chancesLevelToUse.length;
    for (index = 0; index < chancesLength; index++) {
      chance = chancesLevelToUse[index];
      if (chance.userHasMadeAGuess === true) {
        levelGuessCount += 1;
      }
    }
    
    return levelGuessCount;

  }
  
  getLevel() {
    var level;
    var level1GuessCount;
    var level2GuessCount;
    
    level1GuessCount = this.getLevelGuessCount(1);
    if (level1GuessCount === 5) {
      level2GuessCount = this.getLevelGuessCount(2);
      if (level2GuessCount === 5) {
        level = 3;        
      } else {
        level = 2;
      }
    } else {
      level = 1;
    }
    
    return level;
  }
  
  areAllLevelsComplete() {
    var level3GuessCount;
    var returnValue;
    
    level3GuessCount = this.getLevelGuessCount(3);
    if (level3GuessCount === 5) {
      returnValue = true;
    } else {
      returnValue = false;
      
    }
    
    return returnValue;
  }
  
  showModal(title, message) {
      this.modalTitleText = title;
      this.modalMessageText = message;
      let modalDiv;
      modalDiv = document.getElementById("myModal");
      $(modalDiv).modal('show');
  }

  submitGuess(){
    var artistId;
    var songId;
    var soloToGuessId;

    artistId = this.selectedArtist;
    if (artistId === null || artistId === "-1" || artistId === "") {
      this.showModal(this.selectArtistValidationTitle, this.selectArtistValidationText);
      return;
    }
    songId = this.selectedSong;
    if (songId === null || songId === "-1" || songId === "") {
      this.showModal(this.selectSongValidationTitle, this.selectSongValidationText);
      return;
    }

    this.isButtonsDisabled = true;
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
        var chancesLevelToGrade;
        var levelCorrectMultiplier;
        var levelPartialCorrectMultiplier;
        var level;
        
        this.clearSelected();
        level = this.getLevel();
        chancesLevelToGrade = this.getChancesByLevel(level);
        levelCorrectMultiplier = (level - 1) * 2;
        levelPartialCorrectMultiplier = (level - 1) * 1;
        
        chancesLength = chancesLevelToGrade.length;
        for (index = 0; index < chancesLength; index++) {
          chance = chancesLevelToGrade[index];
          if (chance.userHasMadeAGuess === true){
          } else {
            chance.userHasMadeAGuess = true;
            if (response.content.result === 0){
              toastr.success("", "Correct: " + response.content.artistAndSongDescription);
              chance.guessIsCorrect = true;
              chance.points = 7 + levelCorrectMultiplier;
              this.totalPoints = this.totalPoints + chance.points;
              className = "btn btn-success";
            } else {
              if (response.content.result === -1){
                  toastr.warning("", "You've selected the correct artist, but the wrong song: " + response.content.artistAndSongDescription);
                  chance.guessIsPartiallyCorrect = true;
                  chance.points = 3 + levelPartialCorrectMultiplier;
                  this.totalPoints = this.totalPoints + chance.points;
                  className = "btn btn-warning";  
              } else {
                if (response.content.result === 1){
                  toastr.error("", "Incorrect: " + response.content.artistAndSongDescription);
                  className = "btn btn-danger";  
                }
              }
            }
            chance.className = className;
            if (index < chancesLength) {
              if (chancesLevelToGrade[index + 1]) {
                chancesLevelToGrade[index + 1].className = "btn btn-info";                
              }
            }
            break;
          }
        }
        this.selectedArtist = "";
        this.selectedSong = "";
        this.songHasFocus = true;
        this.songs = [];
        this.artists = this.originalArtists;
        this.artistsAndSongs = this.originalArtistsAndSongs;
        this.searchValue = "";
        if (this.areAllLevelsComplete()) {
          this.allLevelsComplete = true;
        } else {
          this.getNextSongToGuess();
        }
        
      });
  }

  getCurrentChancesLevel() {
    var level;
    var returnValue;
    
    level = this.getLevel();
    returnValue = this.getChancesByLevel(level);
    
    return returnValue;
  }
  
  getChancesByLevel(level) {
    var returnValue;

    switch (level){
      case 1:
        returnValue = this.chancesLevel1;
        break;
      case 2:
        returnValue = this.chancesLevel2;
        break;
      case 3:
        returnValue = this.chancesLevel3;
        break;
      default:
    }
    
    return returnValue;
  }

  activate(){
 	  this.url = 'http://localhost:9001/initialData';
    this.url = this.url.concat("?sessionId=", this.uId);
    return this.http.jsonp(this.url).then(response => {
        var soloToGuessFile;
        this.artists = response.content.artists;
        this.originalArtists = this.artists;
        this.artistsAndSongs = response.content.artistsAndSongs;
        this.originalArtistsAndSongs = this.artistsAndSongs;
        soloToGuessFile = response.content.soloToGuessFile;
	      this.soloToGuess = response.content.soloToGuessFile.concat(".mp3");
        //this.soloToGuess = "<source type='audio/mpeg' src='solos/" + soloToGuessFile + ".mp3'>";
        this.rockIsChecked = true;
        this.metalIsChecked = true;
        this.classicIsChecked = true;
        this.oldiesIsChecked = true;
        this.countryIsChecked = true;
        this.soloToGuessOgg = response.content.soloToGuessFile.concat(".ogg");
        this.soloToGuessId = response.content.soloToGuessId;
	      this.soloToGuessLabelText = "Guess The Guitar Solo";
  	    this.artistLabelText = "Artist";
  	    this.songLabelText = "Song";
	      this.guessButtonLabelText = "Guess";
        this.giveUpButtonLabelText = "Give Up";
        this.startOverButtonLabelText = "Start Over";
        this.totalPointsLabelText = "Total Points:";
        this.level1LabelText = "Level 1";
        this.level2LabelText = "Level 2";
        this.level3LabelText = "Level 3";
        this.rockLabelText = "Rock";
        this.metalLabelText = "Metal";
        this.classicLabelText = "Classic";
        this.oldiesLabelText = "Oldies";
        this.countryLabelText = "Country";
        this.selectArtistValidationTitle = "Select Artist";
        this.selectArtistValidationText = "Select an artist before guessing.";
        this.selectSongValidationTitle = "Select Song";
        this.selectSongValidationText = "Select a song before guessing.";
        this.searchPlaceholderText = "Search Artist or Song...";
        this.clearButtonText = "";
        this.sortButtonText = "";
        this.soloToGuessArtistAndSong = response.content.soloToGuessArtistAndSong;
        this.onGiveUpButtonClicked = function onGiveUpButtonClicked(a) {
                                     this.selectedArtist = "";
                                     this.selectedSong = "";
                                     this.songHasFocus = true;
                                     this.songs = [];
                                     this.artists = this.originalArtists;
                                     this.artistsAndSongs = this.originalArtistsAndSongs;
                                     this.searchValue = "";
                                     this.getNextSongToGuess();
                                   };
                                   
        this.onStartOverButtonClicked = function onStartOverButtonClicked() {
                                     this.resetChances();
                                     this.selectedArtist = "";
                                     this.selectedSong = "";
                                     this.songHasFocus = true;
                                     this.songs = [];
                                     this.artists = this.originalArtists;
                                     this.artistsAndSongs = this.originalArtistsAndSongs;
                                     this.searchValue = "";
                                     
                                     this.chanceLevel2IsVisible = false;
                                     this.chanceLevel3IsVisible = false;
                                     this.allLevelsComplete = false;
                                     
                                     this.getNextSongToGuess();
                                   };
                                   
        this.onSelectedArtistChanged = function onSelectedArtistChanged() {
                                          this.getSongsByArtistId();
                                        };

        this.onListItemClicked2 = function onListItemClicked2(key) {
          //alert("onListItemClicked2 - key: " + key);
          let artistAndSongCount;
          let artistId;
          let index;
          let artistAndSongObject;
          let keyArray;
          let songId;

          artistAndSongCount = this.originalArtistsAndSongs.length;
          keyArray = key.split("|");
          artistId = Number(keyArray[0]);
          songId = Number(keyArray[1]);
          this.selectedArtist = artistId;
          this.selectedSong = songId;
          for (index = 0; index < artistAndSongCount; index++) {
            artistAndSongObject = this.artistsAndSongs[index];
            if (artistId === artistAndSongObject.artistId) {
              if (songId === artistAndSongObject.songId) {
                artistAndSongObject.isChecked = true;
              } else {
                artistAndSongObject.isChecked = false;
              }
            } else {
              artistAndSongObject.isChecked = false;
            }
          }

          //this.getSongsByArtistId();
          return true;
        };

        this.onListItemClicked = function onListItemClicked(id) {
          //alert("onListItemClicked - id: " + id);
          let artistCount;
          let artistId;
          let index;
          let artistObject;
          artistCount = this.originalArtists.length;
          this.selectedArtist = id;
          for (index = 0; index < artistCount; index++) {
            artistObject = this.artists[index];
            artistId = artistObject.id;
            if (artistId === id) {
              artistObject.isChecked = true;
            } else {
              artistObject.isChecked = false;
            }
          }

          this.getSongsByArtistId();
          return true;
        };

        this.onSearchArtistChanged = function onSearchArtistChanged() {
                                          //this.filterArtistsBySearchValue();
                                          this.filterArtistsAndSongsBySearchValue();
                                        };

        this.onGenreChanged = function onSearchArtistChanged() {
          this.filterArtistsAndSongsBySearchValue();
        };
              
        this.onClearButtonClicked = function onClearButtonClicked() {
                                      this.clearSelected();
                                      this.selectedArtist = "";
                                      this.selectedSong = "";
                                      this.songHasFocus = true;
                                      this.songs = [];
                                      this.artists = this.originalArtists;
                                      this.artistsAndSongs = this.originalArtistsAndSongs;
                                      this.searchValue = "";
                                    };

        this.onSortButtonClicked = function onSortButtonClicked() {
                                     //this.reverseSortArtists();
                                     this.reverseSortArtistsAndSongs();
                                   };
      });
      
  }

  canDeactivate(){
    //return confirm('Are you sure you want to leave?');
  }

  reverseSortArtistsAndSongs(){
    let foundArtistAndSongArray;
 
    foundArtistAndSongArray = this.artistsAndSongs.reverse();;
 
    this.artistsAndSongs = foundArtistAndSongArray;
  }

 reverseSortArtists(){
   let foundArtistArray;

   foundArtistArray = this.artists.reverse();;

   this.artists = foundArtistArray;
 }

 clearSelected(){
  let artistAndSongCount;
  let index;
  let artistAndSongObject;

  if (this.selectedArtist === "") {
  } else {
    artistAndSongCount = this.artistsAndSongs.length;
    for (index = 0; index < artistAndSongCount; index++) {
      artistAndSongObject = this.artistsAndSongs[index];
      if (artistAndSongObject.isChecked) {
        artistAndSongObject.isChecked = false;
        //toastr.success("", "isChecked: " + artistAndSongObject.songName);
      }
    }
  }
 }

 filterArtistsAndSongsBySearchValue(){
  let artistAndSongCount;
  let index;
  let searchValue;
  let artistName;
  let songName;
  let foundArtistAndSongArray;
  let artistAndSongObject;
  let songFound;
  
  this.clearSelected();
  // if (this.selectedArtist === "") {
  // } else {
  //   artistAndSongCount = this.artistsAndSongs.length;
  //   for (index = 0; index < artistAndSongCount; index++) {
  //     this.artistsAndSongs[index].isChecked = false;
  //     toastr.success("", "isChecked: " + index);
  //   }
  // }

  this.selectedArtist = "";
  this.selectedSong = "";
  this.songs = [];
  foundArtistAndSongArray = [];

  artistAndSongCount = this.originalArtistsAndSongs.length;
  searchValue = this.searchValue;
  if (searchValue) {
    searchValue = searchValue.toLowerCase();
  } else {
    searchValue = "";
  }
  for (index = 0; index < artistAndSongCount; index++) {
    artistAndSongObject = this.originalArtistsAndSongs[index];
    artistName = artistAndSongObject.artistName;
    artistName = artistName.toLowerCase();
    songName = artistAndSongObject.songName;
    songName = songName.toLowerCase();
    songFound = false;
    if (searchValue === "" || artistName.includes(searchValue) === true) {
      songFound = true;
    } else {
      if (songName.includes(searchValue) === true) {
        songFound = true;
      }
    }

    if (songFound) {
      songFound = false;
      if (this.rockIsChecked && artistAndSongObject.genre === 1) {
        songFound = true;
      } else {
        if (this.metalIsChecked && artistAndSongObject.genre === 2) {
          songFound = true;
        } else {
          if (this.classicIsChecked && artistAndSongObject.genre === 3) {
            songFound = true;
          } else {
            if (this.oldiesIsChecked && artistAndSongObject.genre === 4) {
              songFound = true;
            } else {
              if (this.countryIsChecked && artistAndSongObject.genre === 5) {
                songFound = true;
              } 
            }
          }
        }
      }
    }

    if (songFound) {
      foundArtistAndSongArray.push(artistAndSongObject);
    }
  }

  this.artistsAndSongs = foundArtistAndSongArray;
 }

 filterArtistsBySearchValue(){
   let artistCount;
   let index;
   let searchValue;
   let artistName;
   let foundArtistArray;
   let artistObject;
   
   this.selectedArtist = "";
   this.songs = [];
   foundArtistArray = [];
   artistCount = this.originalArtists.length;
   searchValue = this.searchValue;
   searchValue = searchValue.toLowerCase();
   for (index = 0; index < artistCount; index++) {
     artistObject = this.originalArtists[index];
     artistName = artistObject.name;
     artistName = artistName.toLowerCase();
     if (artistName.includes(searchValue) === true) {
       foundArtistArray.push(artistObject);
     } 
   }

   this.artists = foundArtistArray;
 }

  getSongsByArtistId(){
  var artistId;
	  
  this.url = 'http://localhost:9001/getSongsByArtist';
  artistId = this.selectedArtist;
      
  this.url += "?artistId=" + artistId;
    
  return this.http.jsonp(this.url).then(response => {
      this.songs = response.content.songs;
        let songCount;
        let selectSize;
        songCount = this.songs.length;
        if (songCount < 1) {
          songCount = 2;
        } else {
          if (songCount > 10) {
            songCount = 10;
          } else {
            if (songCount === 2) {
              //auto select
              this.selectedSong = "6051";
              this.songHasFocus = true;
              //alert('auto select');
            }
          }
        }
        selectSize = songCount;
        this.songSelectSize = selectSize;
    });
  }
  
  getNextSongToGuess(){
    var level;
    
    level = this.getLevel();
    if (level === 2) {
      this.chanceLevel2IsVisible = true;
    } else {
      if (level === 3) {
        this.chanceLevel3IsVisible = true;
      }
    }
    
 	  this.url = 'http://localhost:9001/initialData';
    this.url = this.url.concat("?sessionId=", this.uId, "&level=", String(level));
    return this.http.jsonp(this.url).then(response => {
        var soloToGuessFile;
        var audioElement;
        var enableButtonsFunc;
                
        //this.artists = response.content.artists;
        soloToGuessFile = response.content.soloToGuessFile;
	      this.soloToGuess = response.content.soloToGuessFile.concat(".mp3");
        //alert('this.soloToGuess: ' + this.soloToGuess);
        //this.soloToGuess = "<source type='audio/mpeg' src='solos/" + soloToGuessFile + ".mp3'>";
        this.rockIsChecked = true;
        this.metalIsChecked = true;
        this.classicIsChecked = true;
        this.oldiesIsChecked = true;
        this.countryIsChecked = true;
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
        
        enableButtonsFunc = function(){
          this.isButtonsDisabled = false;
        };
        
        setTimeout(enableButtonsFunc.bind(this), 500);
        
      });
  }
  
  resetChances(){
    var index;
    var chancesLength;
    var chance;
    var className;
    var levelIndex;
    var numberOfLevels;
    var level;
    var chancesLevelToUse;   

    this.totalPoints = 0;
    numberOfLevels = 3;
    for (levelIndex = 0; levelIndex < numberOfLevels; levelIndex++) {
      level = levelIndex + 1;
      chancesLevelToUse = this.getChancesByLevel(level);
    
      chancesLength = chancesLevelToUse.length;
      for (index = 0; index < chancesLength; index++) {
        chance = chancesLevelToUse[index];
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
}