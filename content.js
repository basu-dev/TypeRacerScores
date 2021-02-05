"use strict";
function downloadScore() {
  let scoreBoard = document.querySelector('.dialogContent');
  let score = scoreBoard.querySelectorAll('.gwt-Label');
  // let accuracy = score.querySelector('.gw');
  let recentScores = [];
  let totalScore = 0;

  score.forEach((element, index) => {
    let recentScore = {};
    recentScore.score = element.innerHTML;
    let intScore = parseInt(element.innerHTML.split(' ')[0]);
    totalScore += intScore;
    // recentScore.accuracy=accuracy[index].innerHTML;
    recentScores.push(recentScore);
  });
  let average = `${totalScore / score.length} wpm`;
  console.log("Your average is ", average);
  let obj = { average, recentScores }
  let dlAnchorElem = document.createElement('a');
  document.body.appendChild(dlAnchorElem);
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("style", "display:none");
  let fileName = `typeracer-scores-${Date.now().toString()}.json`;
  dlAnchorElem.setAttribute("download", fileName);
  dlAnchorElem.click();
  dlAnchorElem.remove();
}
let buttonNode, button, playButton, popup;
function buttonClicked() {
  console.log("Recent Scores Button Clicked")
  setTimeout(_ => {
    popup = document.querySelector(".practiceViewScoresPopup");
    let table = popup.querySelector('.headerRow');
    if (table) {
      attachDownloadButton(popup)
    } else {
      console.log("You don't have any recent scores.");
    }

  })
}
function css(element, css) {
  Object.keys(css).forEach((x, i) => {


    element.style[x] = css[x];
  })

}
function attachDownloadButton(popup) {
  console.log("attaching dwonload button")
  let buttonPlace = popup.querySelectorAll(".dialogContent div div")[4];
  let downloadBtn = document.createElement('a');
  downloadBtn.setAttribute('href', '#');
  downloadBtn.classList.add('gwt-Anchor');
  buttonPlace.prepend(downloadBtn);
  css(downloadBtn, { backgroundColor: 'green !important' });
  downloadBtn.padding = '10px 5px';
  downloadBtn.innerText = 'Download';
  downloadBtn.addEventListener('click', downloadScore);
  buttonPlace.style.display = 'flex';
  buttonPlace.style.justifyContent = 'space-around';
}
function playButtonClicked() {
  console.log("playButon clicked")
  setTimeout(_ => {
    buttonNode = document.querySelectorAll('.gwt-Anchor')[3];
    buttonNode.addEventListener('click', buttonClicked)
  }, 1000)
}

function main() {
  console.log("Type Racer Score Box");
  setTimeout(_ => {
    playButton = document.querySelectorAll(".gwt-Anchor.bkgnd-blue")[0];
    playButton.addEventListener('click', playButtonClicked);
  }, 2000);

}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === "interactive") {
    console.log("loading");
  }
  if (event.target.readyState === "complete") {
    main();
  }
});

