let d2 = new Date(2023, 06, 1);

function colorfulPrint(print, string) {
  print(string);
}

setInterval(() => {
  let d1 = new Date();
  let random = Math.floor(Math.random() * 10);
  let difference = d2 - d1;
  let days = Math.floor(difference / 1000 / 60 / 60 / 24);
  let hours = Math.floor((difference / 1000 / 60 / 60 / 24 - days) * 24);
  let minutes = Math.floor(
    ((difference / 1000 / 60 / 60 / 24 - days) * 24 - hours) * 60
  );
  let seconds = Math.floor(
    (((difference / 1000 / 60 / 60 / 24 - days) * 24 - hours) * 60 - minutes) *
      60
  );
  let milli_seconds = Math.floor(
    ((((difference / 1000 / 60 / 60 / 24 - days) * 24 - hours) * 60 - minutes) *
      60 -
      seconds) *
      1000
  );
  let print =
    random < 5 ? console.warn : random < 7 ? console.error : console.log;
  colorfulPrint(
    print,
    `${days > 9 ? days : `0${days}`} days, ${hours > 9 ? hours : `0${hours}`}:${
      minutes > 9 ? minutes : `0${minutes}`
    }:${seconds > 9 ? seconds : `0${seconds}`}:${
      milli_seconds > 9 ? milli_seconds : `0${milli_seconds}`
    }`
  );

  setTimeout(() => {
    console.clear();
  }, 500);
}, 1000);
