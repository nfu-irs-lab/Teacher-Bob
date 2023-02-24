export interface CommDevice{
    open():void;
    write(data:Uint8Array):number;
    read(): Uint8Array;
    close():void;
}

export interface PackageHandler{
    handle(data:number[]):void;
    hasPackage():boolean;
    getPackageAndNext():number[];
    convertToPackage(data:number[]):number[];
}

export interface ReConnectableDevice{
    accept():[string, string, CommDevice];
    close():void;
}