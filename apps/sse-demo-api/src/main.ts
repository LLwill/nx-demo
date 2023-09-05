/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import uuid from 'uuid';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to sse-demo-api!' });
});

app.post('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  let counter = 0;
  const interval = setInterval(() => {
    const eventData = `data: This is event ${counter}\n\n`;
    res.write(eventData);
    counter++;

    if (counter === 10) {
      clearInterval(interval);
      res.end();
    }
  }, 1000);
});

app.post('/conversation/chat/:model', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const model = req.params.model;

  const body = req.body;
  const messages = body.messages;
  const lastMsg = messages[messages.length - 1];
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const content = `${model || '未知模型'} ~ 返回时间: ${time} ~ ${
    lastMsg?.content || '空消息'
  }`;
  const lastMsgId = lastMsg?.messageId;

  const conversationId = '1';
  const temp = {
    messageId: uuid.v4(),
    conversationId,
    type: 'text',
    contentType: 'text',
    createId: '1698325012141121536',
    createTime: new Date(),
    suggest: null,
    reference: null,
    like: 'unknown',
    parentMessageId: lastMsgId,
    progress: null,
    sendTime: '2023-09-05T16:11:06.067',
    status: 'SUCCESS',
    role: 'assistant',
    finished: null,
  };

  let counter = 0;
  const textLength = content.length;
  console.log('\n ---------- \n');
  console.log('响应文本', content);
  console.log('文本长度', textLength);
  console.log('\n ---------- \n');
  const interval = setInterval(() => {
    const eventData =
      'data: ' +
      JSON.stringify({
        ...temp,
        content: content[counter],
      }) +
      '\n\n';
    res.write(eventData);
    counter++;

    if (counter === textLength) {
      res.write('data: ' + JSON.stringify({ finished: 'DONE' }) + '\n\n');
      clearInterval(interval);
      res.end();
    }
  }, 50);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
