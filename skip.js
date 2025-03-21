document.addEventListener("DOMContentLoaded", function () {
  const audioElement = document.getElementById("background-audio");
  const staticEffect = new Audio("audio/radio-static.mp3");
  const musicPlayer = document.getElementById("music-player");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const nextButton = document.getElementById("next");

 // Array of 24 tracks
 const tracks = [
  "audio/track1.mp3",
  "audio/track2.mp3",
  "audio/track3.mp3",
  "audio/track4.mp3",
  "audio/track5.mp3",
  "audio/track6.mp3",
  "audio/track7.mp3",
  "audio/track8.mp3",
  "audio/track9.mp3",
  "audio/track10.mp3",
  "audio/track11.mp3",
  "audio/track12.mp3",
  "audio/track13.mp3",
  "audio/track14.mp3",
  "audio/track15.mp3",
  "audio/track16.mp3",
  "audio/track17.mp3",
  "audio/track18.mp3",
  "audio/track19.mp3",
  "audio/track20.mp3",
  "audio/track21.mp3",
  "audio/track22.mp3",
  "audio/track23.mp3",
  "audio/track24.mp3",
  "audio/track25.mp3",
  "audio/track26.mp3",
  "audio/track27.mp3",
  "audio/track28.mp3",
  "audio/track29.mp3",
  "audio/track30.mp3",
  "audio/track31.mp3",
  "audio/track32.mp3",
  "audio/track33.mp3",
  "audio/track34.mp3",
  "audio/track35.mp3",
  "audio/track36.mp3",
  "audio/track37.mp3",
  "audio/track38.mp3",
  "audio/track39.mp3",
  "audio/track40.mp3",
  "audio/track41.mp3",
  "audio/track42.mp3",
  "audio/track43.mp3",
  "audio/track44.mp3",
  "audio/track45.mp3",
  "audio/track46.mp3",
  "audio/track47.mp3",
  "audio/track48.mp3",
  "audio/track49.mp3",
  "audio/track50.mp3",
  "audio/track51.mp3",
  "audio/track52.mp3",
  "audio/track53.mp3"
  ];

  function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
  }

  const shuffledTracks = shuffle([...tracks]);
  let currentTrackIndex = 0;
  let isPlaying = false;

  // Play track with slight overlap of static
  function playTrack(index, fadeInOnLoad = false) {
      audioElement.src = shuffledTracks[index];
      audioElement.volume = fadeInOnLoad ? 0 : 1;
      audioElement.play().then(() => {
          if (fadeInOnLoad) fadeInAudio(audioElement, 5000);
          isPlaying = true;
      }).catch(err => console.error("Playback error:", err));
  }

  // Fade-in only for first track
  function fadeInAudio(audio, duration) {
      let step = 0.05;
      let interval = duration / (1 / step);
      let fadeIn = setInterval(() => {
          if (audio.volume < 1) {
              audio.volume = Math.min(audio.volume + step, 1);
          } else {
              clearInterval(fadeIn);
          }
      }, interval);
  }

// Play static effect for a brief moment with a fade-out transition
function playStaticEffect(callback) {
    staticEffect.currentTime = 0;
    staticEffect.volume = 0.5;
    // Start static immediately so it overlaps the very end of the track
    staticEffect.play();
    
    // Let the static play for a brief duration (say, 400ms)
    setTimeout(() => {
      // Fade out static over 100ms
      let fadeDuration = 200; // duration in ms for fade out
      let fadeSteps = 1;
      let fadeStepTime = fadeDuration / fadeSteps;
      let volumeStep = staticEffect.volume / fadeSteps;
      let fadeInterval = setInterval(() => {
        staticEffect.volume = Math.max(0, staticEffect.volume - volumeStep);
        if (staticEffect.volume === 0) {
          clearInterval(fadeInterval);
          staticEffect.pause();
          staticEffect.currentTime = 0;
          // Now call the callback to start the next track
          callback();
        }
      }, fadeStepTime);
    }, 500); // static plays fully for 400ms before starting fade-out
  }
  // Natural track transition (with static overlap)
  audioElement.addEventListener("ended", function () {
      playStaticEffect(() => {
          currentTrackIndex = (currentTrackIndex + 1) % shuffledTracks.length;
          playTrack(currentTrackIndex);
      });
  });

  // Autoplay with fade-in on page load
  window.addEventListener("load", function () {
      setTimeout(() => {
          playTrack(currentTrackIndex, true);
      }, 1000); // Slight delay before playing
  });

  // --- Control Buttons ---
  if (playButton) {
      playButton.addEventListener("click", function (e) {
          e.stopPropagation();
          if (audioElement.paused) {
              audioElement.play();
          }
      });
  }

  if (pauseButton) {
      pauseButton.addEventListener("click", function (e) {
          e.stopPropagation();
          if (!audioElement.paused) {
              audioElement.pause();
          }
      });
  }

  if (nextButton) {
      nextButton.addEventListener("click", function (e) {
          e.stopPropagation();
          playStaticEffect(() => {
              currentTrackIndex = (currentTrackIndex + 1) % shuffledTracks.length;
              playTrack(currentTrackIndex);
          });
      });
  }
});
 