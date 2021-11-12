// 날짜로 변환
function dateFormat(value, form) {
  const date = new Date(value);

  const dateArray = [];
  let result = "";
  const decorationArray = form.match(/[^YMDhms]/g);
  let decorationIndex = 0;

  dateArray.push(yearFormat(date, form));
  dateArray.push(monthFormat(date, form));
  dateArray.push(dayFormat(date, form));
  dateArray.push(hourFormat(date, form));
  dateArray.push(minuteFormat(date, form));
  dateArray.push(secondFormat(date, form));

  dateArray.forEach(v => {
    if (!v) return;

    const decoration = decorationArray[decorationIndex] ? decorationArray[decorationIndex] : "";
    decorationIndex += 1;

    result += `${v}${decoration}`;
  });

  return result;
}

// 지난 시간으로 변환
function timeFormat(value) {
  const date = new Date(value);

  const temp = new Date().getTime() - date.getTime();

  // 1분이하
  if (temp / 1000 < 60) {
    return `${Math.floor(temp / 1000)}초전`;
  }
  // 1시간이하
  if (temp / 1000 / 60 < 60) {
    return `${Math.floor(temp / 1000 / 60)}분전`;
  }
  // 1일이하
  if (temp / 1000 / 60 / 60 < 24) {
    return `${Math.floor(temp / 1000 / 60 / 60)}시간전`;
  }
  // 1월이하
  if (temp / 1000 / 60 / 60 / 24 < 30) {
    return `${Math.floor(temp / 1000 / 60 / 60 / 24)}일전`;
  }
  // 1년이하
  if (temp / 1000 / 60 / 60 / 24 / 30 < 12) {
    return `${Math.floor(temp / 1000 / 60 / 60 / 24 / 30)}개월전`;
  }
  // 1년 이상

  return `${Math.floor(temp / 1000 / 60 / 60 / 24 / 30 / 12)}년전`;
}

// 플레이 시간 변환기
function timeConverter(duration) {
  if (+duration >= 60) {
    return `${Math.floor(duration / 60)} : ${duration % 60}`;
  }
  return `0:${duration % 60}`;
}

module.exports = {
  dateFormat,
  timeFormat,
  timeConverter,
};

// 년 포멧
function yearFormat(date, form) {
  const yearRegexp = /YY{2}/g;
  let year = null;

  // 년에 대해서 언급하지 않으면 포멧하지않음
  if (!form.match(yearRegexp)) return;

  // YYYY일 때 ( 2021 )
  if (form.match(yearRegexp).length === 2) {
    year = +String(date.getFullYear()).slice(2);
  }
  // YY일 때 ( 21 )
  else if (form.match(yearRegexp).length === 1) {
    year = date.getFullYear();
  }

  return year;
}

// 월 포멧
function monthFormat(date, form) {
  const monthRegexp = /M/g;
  let month = null;

  // 월에 대해서 언급하지 않으면 포멧하지않음
  if (!form.match(monthRegexp)) return;

  month = date.getMonth() + 1;

  // mm일 때 ( 06 )
  if (form.match(monthRegexp).length === 2 && month < 10) {
    month = `0${month}`;
  }

  return month;
}

// 일 포멧
function dayFormat(date, form) {
  const dayRegexp = /D/g;
  let day = null;

  // 일에 대해서 언급하지 않으면 포멧하지않음
  if (!form.match(dayRegexp)) return;

  day = date.getDate();

  // mm일 때 ( 06 )
  if (form.match(dayRegexp).length === 2 && day < 10) {
    day = `0${day}`;
  }

  return day;
}

// 시간 포멧
function hourFormat(date, form) {
  const hourRegexp = /h/g;
  let hour = null;

  // 시간에 대해서 언급하지 않으면 포멧하지않음
  if (!form.match(hourRegexp)) return;

  hour = date.getHours();

  // mm일 때 ( 06 )
  if (form.match(hourRegexp).length === 2 && hour < 10) {
    hour = `0${hour}`;
  }

  return hour;
}

// 분 포멧
function minuteFormat(date, form) {
  const minuteRegexp = /m/g;
  let minute = null;

  // 분에 대해서 언급하지 않으면 포멧하지않음
  if (!form.match(minuteRegexp)) return;

  minute = date.getMinutes();

  // mm일 때 ( 06 )
  if (form.match(minuteRegexp).length === 2 && minute < 10) {
    minute = `0${minute}`;
  }

  return minute;
}

// 초 포멧
function secondFormat(date, form) {
  const secondRegexp = /m/g;
  let second = null;

  // 초에 대해서 언급하지 않으면 포멧하지않음
  if (!form.match(secondRegexp)) return;

  second = date.getSeconds();

  // mm일 때 ( 06 )
  if (form.match(secondRegexp).length === 2 && second < 10) {
    second = `0${second}`;
  }

  return second;
}
