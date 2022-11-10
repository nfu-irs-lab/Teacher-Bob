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
