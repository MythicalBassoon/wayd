// HELPER FUNCTIONS USED ONLY IN API.JS
module.exports = {

  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  dateFormater: function(dateString) {
    var day;

    var monthFormater = function(month) {
     if(month < 10) {
      return '0' + month.toString()
     } else {
      return month.toString()
     }
    }

    var dayFormater = function(day) {
     if(day < 10) {
      return '0' + day.toString();
     } else {
      return day.toString();
     }
    }

    // console.log('date string', dateString)
    if(typeof dateString === 'object') {
       day = new Date(dateString);
    } else {
       day = new Date(JSON.parse(dateString));
    }

    // console.log('day', day)
    var dayOfMonth= day.getDate().toString();
      dayOfMonth = dayFormater(dayOfMonth);

    var year = day.getFullYear().toString();
    var month = (day.getMonth() + 1);
      month = monthFormater(month);

      // console.log('month', month)
    var date = year + month + dayOfMonth;
    return date + '00';

  }


}
