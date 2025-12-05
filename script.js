// Your script here.
 const textInput = document.getElementById("text-input");
    const voiceSelect = document.getElementById("voice-select");
    const rate = document.getElementById("rate");
    const pitch = document.getElementById("pitch");
    const rateValue = document.getElementById("rate-value");
    const pitchValue = document.getElementById("pitch-value");
    const speakBtn = document.getElementById("speak");
    const stopBtn = document.getElementById("stop");

    const synth = window.speechSynthesis;
    let voices = [];

    function populateVoices() {
      voices = synth.getVoices();
      voiceSelect.innerHTML = "";

      voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
      });

      if (voices.length === 0) {
        const option = document.createElement("option");
        option.textContent = "No voices available";
        voiceSelect.appendChild(option);
      }
    }

    // Load voices
    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;

    function speakText() {
      const text = textInput.value.trim();
      if (!text) return;

      synth.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = rate.value;
      utter.pitch = pitch.value;

      if (voices.length > 0) {
        utter.voice = voices[voiceSelect.value];
      }

      synth.speak(utter);
    }

    speakBtn.addEventListener("click", speakText);

    stopBtn.addEventListener("click", () => {
      synth.cancel();
    });

    rate.addEventListener("input", () => {
      rateValue.textContent = rate.value;
    });

    pitch.addEventListener("input", () => {
      pitchValue.textContent = pitch.value;
    });

    voiceSelect.addEventListener("change", () => {
      if (textInput.value.trim()) speakText();
    });
