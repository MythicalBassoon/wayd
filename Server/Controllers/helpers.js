
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

    var monthFormater = function(month) {
     if(month < 10) {
      return '0' + month.toString()
     } else {
      return month.toString()
     }
    }

    var day = new Date(dateString)
    var dayOfMonth= day.getDate().toString()
    var year = day.getFullYear().toString()
    var month = (day.getMonth() + 1)
      month = monthFormater(month)

    var date = year + month + dayOfMonth;
    return date + '00'

  }


}
