class AppMap extends React.Component {
  render(){
    return (
      <div>
      	<MyComponents.NavBar 
      		user={this.props.data.user}
      		actions={this.props.actions}/>
      	<MyComponents.MapView
            groups={this.props.data.groups}
            center={this.props.data.center}
            users={this.props.data.users}
            businesses={this.props.data.businesses}/>
      </div>
      );
  }
}

MyComponents.AppMap = AppMap;
