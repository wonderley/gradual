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
};