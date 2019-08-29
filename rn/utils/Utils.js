export default Utils = {
  timestampToDateString: timestamp => {
    const date = new Date(timestamp);
    // e.g. Mon Jul 29 2019
    let dateString = date.toDateString();
    if (date.getFullYear() === (new Date()).getFullYear()) {
      // Don't show the year if it's the current year
      dateString = dateString.split(' ').slice(0, -1).join(' ');
    }
    return dateString;
  },

  timestampToTimeString: timestamp => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    if (minutes < 10) minutes = '0' + minutes;
    return hours + ':' + minutes + ampm;
  },

  timestampToDateAndTimeString: timestamp => {
    return `${Utils.timestampToDateString(timestamp)} at ${Utils.timestampToTimeString(timestamp)}`;
  },
};