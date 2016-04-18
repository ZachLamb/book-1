const {Map, Marker, CircleMarker, Popup, TileLayer, MapLayer}  = window.ReactLeaflet

class MapView extends React.Component {
  render(){
    const businesses = this.props.businesses
    const groups = this.props.groups
    const users = this.props.users
    var barNumbers = _.map(groups,'barID');
    var intBars = barNumbers.map(Number);
    var bars = _.pick(businesses,intBars);
    var activeGroups = _.map(groups,function(e){
      return { name : e.name,barID : parseInt(e.barID) };
    });

    var session = window.localStorage["firebase:session::drinktogether"];
    var seesionObj = JSON.parse(session);
    var username = seesionObj['google'].displayName;

    var user = _.find(users,function(d){
      return d.name == username;
    })

    const barElements = _.map(bars, function(u,i){
      var pos = [u.location.coordinate.latitude,u.location.coordinate.longitude];
      var activeGroupName = _.find(activeGroups,function(e){
        return e.barID == i;
      })
      var groupName = activeGroupName.name;
      var u_icon = L.icon({
      iconUrl: '../images/beerIcon.png',
      iconSize: [40, 40],
      iconAnchor: [0, 40],
      popupAnchor: [20, -30]
      })
      var mapURL = "http://www.google.com/maps/place/" + u.location.coordinate.latitude + "," + u.location.coordinate.longitude; 
      return <Marker position={pos} key={i} icon={u_icon}>
        <Popup>
          <span>
          <b> {groupName} </b>
          <br></br>
          <a  target="_blank" href={u.mobile_url}>{u.name}</a> 
          <br></br>
          <a  target="_blank" href= {mapURL} >Google Map</a>
          <br></br>
          Rating: {u.rating}
          </span>
        </Popup>
      </Marker>
    })


    // Note: .bind(this) is important for the handler function's 'this'
    // pointer to refer to this MapView instance

    return  <Map center={this.props.center}
          zoom={14}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {barElements}
      </Map>
  }
}

MyComponents.MapView = MapView