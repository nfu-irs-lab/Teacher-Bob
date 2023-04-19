import { EOLPackageHandler,TCPClientCommDevice} from "./concrete_communication";
document.getElementById("connect")!.onclick=conntect;
function conntect(){
    var commDevice=new TCPClientCommDevice(4444,'192.168.0.190',new EOLPackageHandler());
    commDevice.open();
    commDevice.writeString("OBJECT_DETECTOR ENABLE");
}