var q;
teacher = new Teacher([]);


function setArtworkImage(imageUrl) {
  const artworkImage = document.getElementById('artwork_image');
  artworkImage.src = imageUrl;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
function hideArtworkInfo(){
  const infoDiv = document.getElementById('artwork-info');
  const questionDiv = document.getElementById("question-div")
  infoDiv.hidden=true;
  questionDiv.hidden=false;
  setUpImageAndQuestions();
}
function showArtworkInfo(artwork) {
  const infoDiv = document.getElementById('artwork-info');
  const questionDiv = document.getElementById("question-div")
  infoDiv.innerHTML = `
    <h2>${artwork.title}</h2>
    <p><strong>Author:</strong> ${artwork.author}</p>
    <p><strong>Born/Died:</strong> ${artwork.bornDied}</p>
    <p><strong>Date:</strong> ${artwork.date}</p>
    <p><strong>Technique:</strong> ${artwork.technique}</p>
    <p><strong>Location:</strong> ${artwork.location}</p>
    <p><strong>Type:</strong> ${artwork.type}</p>
    <p><strong>School:</strong> ${artwork.school}</p>
    <p><strong>Timeframe:</strong> ${artwork.timeframe}</p>
    <img src="${artwork.imgUrl}" alt="${artwork.title}">
    <button onclick="hideArtworkInfo()">Next Page</button>
  `;
  infoDiv.hidden=false;
  questionDiv.hidden=true;
}

function setUpImageAndQuestions(){
  const questionField = document.getElementById("question");
  q = teacher.createQuestion();
  questionField.innerHTML = q.question;
  window.correctArt = q.answer;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll('label');
  setArtworkImage(q.answer.imgUrl)
  for (let i = 0; i < q.choices.length; i++) {

    radioButtons[i].value = q.choices[i][q.type];
    radioButtons[i].checked = false;
    labels[i].value = q.choices[i][q.type];
    labels[i].innerHTML = q.choices[i][q.type];
  }
}

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
  const selectedChoice = document.querySelector('input[type="radio"]:checked').value;
  console.log(selectedChoice)
  const isCorrect = selectedChoice === window.correctArt[q.type]

  if (isCorrect) {
    alert('Correct!');
    showArtworkInfo(window.correctArt)
    
  } else {
    alert('Incorrect. The correct answer is: ' + window.correctArt[q.type]);
    showArtworkInfo(window.correctArt);
  }
  if (teacher.isTimeForNewTeacher()){
    teacher = new Teacher(teacher.artPool)
  }
  setUpImageAndQuestions()
});

setUpImageAndQuestions()


