import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECERT_KEY } from '../src/config/config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {
  const url = request.url;
  if(!url){
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get('token');
      if(token){
        try{
       const decodeData = jwt.verify(token,JWT_SECERT_KEY);
       if(!(decodeData as JwtPayload).userId){
        ws.close();
        return;
       }
        }catch(err){
          console.log("JWT ERROR ",err)
          return
        }
      }
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});