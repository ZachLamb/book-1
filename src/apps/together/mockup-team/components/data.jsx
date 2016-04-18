// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  center: [40.015, -105.27], // Boulder
  groups: [],
  users: [],
  businesses: []
}

// a single 'handlers' object that holds all the actions of your entire app
var actions = {}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}
        actions={actions}/>,
    $('#app-container').get(0)
  )
}

//
// DATA
//

var firebaseRef = new Firebase('https://drinktogether.firebaseio.com')

// Real-time Data (load constantly on changes)

firebaseRef.child('yelp/businesses')
  .on('value', function(snapshot){

    data.businesses = _.values(snapshot.val())

    render()

  })
firebaseRef.child('users')
  .on('value', function(snapshot){

    data.users = _.values(snapshot.val())

    render()

  })

firebaseRef.child('groups/id')
  .on('value', function(snapshot){

    data.groups = _.values(snapshot.val())

    render()

  })
actions.setUserLocation = function(latlng){

  if (data.user){
    firebaseRef
      .child('users')
      .child(data.user.username)
      .child('pos')
      .set([latlng.lat, latlng.lng])
  }
}

actions.login = function(){
  firebaseRef.authWithOAuthPopup("google", function(error, authData){
    // handle the result of the authentication
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);


      // create a user object based on authData
      var user = {
        duration: 0.000000000,
        groupID: "00000",
        isGroupOwner: false,
        lat: 40.01125266376242,
        lon: -105.27781252232103,
        name: authData.google.displayName
      }

      var userRef = firebaseRef.child('users').child(user.name)

      // subscribe to the user data
      userRef.on('value', function(snapshot){
        data.user = snapshot.val()
        render()
      })

      // set the user data
      userRef.set(user)

    }
  })

}

actions.logout = function(){

  if (window.localStorage["firebase:session::drinktogether"]){

    firebaseRef.unauth()

    var userRef = firebaseRef
      .child('users')
      .child(data.user.username)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')

    data.user = null
    
    localStorage.clear();

    render()

  }

}