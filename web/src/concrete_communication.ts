import {PackageHandler} from "./framework_communication";

let EOT=[0x04] as number[];
// 傳輸資料時所需要之通訊協定
export class EOLPackageHandler implements PackageHandler{
    endOfTransmission:number[];
    buffer:number[];
    packages:number[][];

    constructor(endOfTransmission:number[]=EOT){
        this.endOfTransmission=endOfTransmission;
        this.buffer=[];
        this.packages=[];
    }

    handle(data: number[]): void {
        data.forEach(byteData => {
            this.buffer.push(byteData)
            console.log(byteData)
        });

        let indexOfFirstEOL=this.getIndexOfFirstEOL(this.buffer);
        console.log(indexOfFirstEOL)
        while(indexOfFirstEOL!=-1){
            this.packages.push(this.buffer.slice(0,indexOfFirstEOL))
            this.buffer.splice(0,indexOfFirstEOL+this.endOfTransmission.length)
            indexOfFirstEOL=this.getIndexOfFirstEOL(this.buffer);
        }
    }

    hasPackage(): boolean {
        return this.packages.length>0;
    }
    getPackageAndNext(): number[]{
        if(this.hasPackage()){
            let b=this.packages.shift() as number[];
            return b;
        }else{
            throw "No package";
        }
    }
    convertToPackage(data: number[] ): number[] {
        let buffer= [] as number[];
        return buffer.concat(data,this.endOfTransmission);
    }

    getIndexOfFirstEOL(data:number[]): number {
        for(let i=0;i<data.length;i++){
            let found=0;
            for(let j=0;j<this.endOfTransmission.length;j++){
                if(i+j<data.length){
                    let a=this.endOfTransmission[j];
                    let b=data[i+j];
                    if(a==b)
                        found++;
                }
            }
            if(found==this.endOfTransmission.length)
                return i;
        }
        return -1;
    }

}