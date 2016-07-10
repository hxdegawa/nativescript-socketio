import {Observable} from 'data/observable';
import {SocketIO} from 'nativescript-socketio';
import {} from 'ui/page';
import frameModule = require('ui/frame');
let socketIO;
const server = 'http://192.168.56.1:3001'; //using genymotion
//const server = 'http://localhost:3001';
let pageData = new Observable({
  item: '',
  username: 'Osei'
});

export function navigatingTo() {
  socketIO = new SocketIO(server, {});
  socketIO.on('login', function (data) {
    console.log("Login: ", data);
    frameModule.topmost().navigate({ moduleName: 'main-page', context: { username: pageData.get("username"), socket: socketIO.instance } })
  })
  socketIO.joinNamespace('/chat');
  socketIO.connect();  
}
export function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = pageData;
}
export function join(args) {
 socketIO.leaveNamespace();
  socketIO.emit('add user', { username: pageData.get('username') });
}