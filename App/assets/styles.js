const React = require('react-native');

const {
  StyleSheet,
  Dimensions
} = React

const {
  height,
  width
} = Dimensions.get('window');


module.exports = {
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#484848'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    fontFamily: 'Bebas',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 1,
    textAlign: 'center',
    color: 'black'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginBottom: 10,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  facebookLogin: {
    width: 290,
    height: 62,
  },
  facebookContainer:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  facebook: {
    height: 80,
    width: 80,
    backgroundColor: '#304FFE',
    borderRadius: 40,
    alignSelf: 'center',
    flex: 0,
    justifyContent: 'flex-end',
     shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  buttonText: {
    fontSize: 15,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#304FFE',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 22,
  },
    spinnerContainer: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ECEFF1'
  },
  imageContainer: {
    alignItems: 'center'
  },

  icon: {
    height: width,
    width: width
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#b6b6b6',
    marginTop: 40,
  },
  textInput: {
      backgroundColor: 'rgba(125,125,125,0.1)',
      height: 33,
      borderRadius: 7,
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 6,
      paddingRight: 6,
      marginTop: 3,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 15,
    },
    datePicker:{
      backgroundColor: '#b6b6b6'
    },

  buttonText: {
    fontSize: 45,
    paddingTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    alignSelf: 'center'
  },
   smallButtonText: {
    fontSize: 12,
    paddingTop: 0,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    alignSelf: 'center'
  },
  button: {
    marginRight: 30,
    marginLeft: 30,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
   bigButton: {
    marginRight: 30,
    marginLeft: 30,
    height: 260,
    width: 260,
    borderRadius: 130,
    flexDirection: 'column',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
   smallButton: {
    marginRight: 30,
    marginLeft: 30,
    height: 100,
    width: 100,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  bodytext: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#607D8B'
  },

  autocomplete: {
            description: {
              fontWeight: 'bold',
            },
            body: {flex: .8},
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              backgroundColor: 'white',
              height: 60,
              borderTopColor: 'black',
              borderBottomColor: 'black',
              borderLeftColor: 'black',
              borderRightColor: 'black',
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              marginTop: 10
            },
            textInput: {
              backgroundColor: 'rgba(125,125,125,0.1)',
              fontFamily: 'Bebas',
              fontStyle: 'normal',
              fontWeight: 'normal',
              letterSpacing: 0,
              height: 55,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              fontSize: 15
            },
          },

  errortext: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#C62828'
  },
  sliderView: {
    marginBottom: 10,
    flex: .5
  },

  datePickerContainer:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    opacity: .8
  }, 
  modal: {
    flexDirection: 'row',
  },

   mainContainerEventRec: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#b6b6b6'
  },
  titleEventRec: {
    marginBottom: 20,
    fontSize: 17,
    textAlign: 'center',
    color: '#607D8B',
  },
  loadingTitleEventRec: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: '#607D8B',
    fontFamily: 'Bebas',
      fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
  },
  toggleText:{
    fontFamily: 'Bebas',
      fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    fontSize: 12,

  },
  textInfo: {
    padding: 0,
    fontFamily: 'Bebas',
      fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    fontSize: 15,
    color: 'black'
  },
  eventTitle: {
    marginBottom: 5,
    fontSize: 40,
    textAlign: 'center',
    color: '#607D8B',
    fontFamily: 'Bebas',
      fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
  },
 buttonTextEventRec: {
    fontSize: 15,
    paddingTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
      fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    alignSelf: 'center'
  },
  buttonEventRec: {
    marginRight: 30,
    marginLeft: 30,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },


  image: {
    height: 150,
    width: 150,
    borderRadius: 65,
    marginTop: 50,
    alignSelf: 'center'
  },
  spinner: {
    color: 'blue',
    width: 50,
    height: 50,
    marginLeft: 170,
    marginRight: 170
  },
  spinnerContainer: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ECEFF1'
  },
   webBtn: {
    fontSize: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    

  },
   map: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
    mainEmailContainer: {
    flex: 1,
    padding: 10,
    marginTop: 55,
    backgroundColor: 'white'
  },
  modalContainerEmail: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  addFromContacts: {
    flex: 1,
    borderRadius: 25
  },
  contactRow:{
    marginRight: 0,
    marginLeft: 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
  },
  contactRowText:{
    fontFamily: 'Bebas',
    fontSize: 15,
    paddingTop: 10,
    alignSelf: 'center'
  },
  smallButtonEmail: {
    marginTop: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  buttonTextEmail: {
    fontSize: 15,
    paddingTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    alignSelf: 'center'
  },
  listview: {
    flex: 1
  },
  buttonEmail: {
    marginRight: 0,
    marginLeft: 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  emailText: {
    fontSize: 15,
    padding: 15,
    color: 'black',
    fontFamily: 'Bebas',
    alignSelf: 'center'
  },
  topSection: {
    flex: .35
  },
  middleSection: {
    flex: .5
  },
  bottomSection: {
    flex: .15
  },
  rowStyle: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1
  },
  sectionHeaderText: {
    color: 'black',
    fontFamily: 'Bebas',
    paddingHorizontal: 8,
    fontSize: 16
  },
    section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#B6B6B6',
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 60,
    borderTopColor: 'black',
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderRightColor: 'black',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10
  },
  textInput: {
    backgroundColor: 'rgba(125,125,125,0.1)',
    fontFamily: 'Bebas',
    textAlign: 'center',
    height: 55,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
};
