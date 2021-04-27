WormGameEngine.Debugger = {
  assert : function assert( value, msg ){
    if( value ){
      console.assert( value, {msg : msg} );
      return false;
    } else {
      return true;
    }
  },
  log : function log( msg ){
    console.log( msg );
  }
}