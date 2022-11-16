import  express, { Express, Request, Response } from 'express';
 
const port = 80;

const app: Express = express();

app.get('/about-me', (request: Request, response: Response) => {
  response.type('text/plain');
  response.send('My name is Jimmy.');
})

// public資料夾的檔案會被顯示在網頁上
app.use(express.static(__dirname + '/public')); 


//  **很重要**
//  一定要在全部express.use或get之後，否則會永遠顯示找不到網頁
app.use((request: Request, response: Response) => {
  response.type('text/plain');
  response.status(404)
  response.send('找不到網頁');
})
// --------------------

// 開啟伺服器
app.listen(port, () => {
  console.log(`server is running on http://localhost:80`)}
);

//------ 單字庫 ----
let arr_card: string[] =
[
'sheep', 'bear', 'giraffe', 'orange', 
'zebra', 'elephant', 'bicycle', 'motorcycle', 
'airplane', 'bus', 'train', 'boat', 
'traffic light', 'sheep', 'fire hydrant', 
'stop sign', 'parking meter', 'bench', 'horse', 
'skis', 'snowboard', 'skateboard', 'cow', 
'backpack', 'umbrella', 'handbag', 'tie', 
'frisbee', 'suitcase', 'fork', 'spoon', 
'kite', 'baseball glove', 'baseball bat', 'knife', 
'bowl', 'car', 'donut', 'cat', 
'apple', 'hot dog', 'bottle', 'carrot', 
'banana', 'broccoli', 'pizza', 'cake', 
'bird', 'sandwich' , 'couch', 'chair', 
'potted plant', 'bed', 'dining table', 'toilet', 
'TV', 'laptop', 'remote', 'surfboard', 
'tennis racket', 'cup', 'keyboard', 'cell phone', 
'microwave', 'oven', 'toaster', 'sink', 
'refrigerator', 'book', 'clock', 'vase', 
'scissors', 'teddy bear', 'hair drier', 'toothbrush', 
'wine glass'
 ];
 function getMessage(arr_card: string | undefined) {
    return arr_card;
  }
  const maybeMessage = Math.random() > 0.5 ? 'Greetings' : undefined;
  getMessage(maybeMessage);
 console.log(maybeMessage);
 