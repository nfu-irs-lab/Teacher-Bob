export interface CommDevice{
    open():void;
    write(data:Uint8Array):number;
    writeString(data:string):number;
    setOnReadCallback(callback:(data:Uint8Array)=>void):void;
    close():void;
}

export interface PackageHandler{
    hasPackage():boolean;
    getPackageAndNext():Uint8Array;
    handle(data:Uint8Array):void;

    convertToPackage(data:Uint8Array):Uint8Array;
    convertStringToPackage(data: string): Uint8Array

}
