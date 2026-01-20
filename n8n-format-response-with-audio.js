// Format Response JavaScript for n8n
// This generates both text and audio with random voice selection

const https = require('https');

// Extract reflection text from Groq response
const groqOutput = $input.item.json;
let reflectionText = '';

// Try multiple possible locations for the generated text
if (groqOutput.message?.content) {
  reflectionText = groqOutput.message.content;
} else if (groqOutput.content) {
  reflectionText = groqOutput.content;
} else if (groqOutput.text) {
  reflectionText = groqOutput.text;
} else if (groqOutput.output) {
  reflectionText = groqOutput.output;
} else if (typeof groqOutput === 'string') {
  reflectionText = groqOutput;
} else {
  // Fallback
  const entry = $('Webhook').first().json.body;
  reflectionText = `This passage reveals Jesus Christ in a profound way. ${entry.howItPointsToJesus} As we contemplate this Old Testament text, we see how God was preparing His people for the coming of the Messiah.`;
}

reflectionText = reflectionText.trim();

// Azure Speech API credentials
const subscriptionKey = $env.AZURE_SPEECH_KEY || 'YOUR_AZURE_KEY';
const region = $env.AZURE_REGION || 'eastus';

// Randomly select from 6 natural voices
const voices = [
  'en-US-AndrewNeural',
  'en-US-BrianNeural',
  'en-US-ChristopherNeural',
  'en-US-EricNeural',
  'en-US-SteffanNeural',
  'en-US-RogerNeural'
];

const selectedVoice = voices[Math.floor(Math.random() * voices.length)];

console.log('Selected voice:', selectedVoice);

// SSML for Azure TTS
const ssml = `<speak version='1.0' xml:lang='en-US'>
  <voice xml:lang='en-US' name='${selectedVoice}'>
    <prosody rate='0.95'>
      ${reflectionText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}
    </prosody>
  </voice>
</speak>`;

// Call Azure Speech API
const options = {
  hostname: `${region}.tts.speech.microsoft.com`,
  path: '/cognitiveservices/v1',
  method: 'POST',
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Content-Type': 'application/ssml+xml',
    'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3'
  }
};

return new Promise((resolve, reject) => {
  const req = https.request(options, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      if (res.statusCode !== 200) {
        console.log('Azure TTS failed with status:', res.statusCode);
        resolve({
          reflectionText: reflectionText,
          audioUrl: null,
          error: `Azure TTS returned status ${res.statusCode}`
        });
        return;
      }

      const audioBuffer = Buffer.concat(chunks);
      const audioBase64 = audioBuffer.toString('base64');
      const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

      console.log('Audio generated successfully, size:', audioBuffer.length);

      resolve({
        reflectionText: reflectionText,
        audioUrl: audioUrl,
        voice: selectedVoice
      });
    });
  });

  req.on('error', (error) => {
    console.log('Azure TTS error:', error.message);
    resolve({
      reflectionText: reflectionText,
      audioUrl: null,
      error: error.message
    });
  });

  req.write(ssml);
  req.end();
});
