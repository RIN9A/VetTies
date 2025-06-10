import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // разогрев
    { duration: '1m', target: 100 },  // нагрузка
    { duration: '30s', target: 0 },   // спад
  ],
};



export default function () {
  const url = 'ws://localhost:8080/ws/appointments/websocket'; // SockJS endpoint
  const params = { tags: { my_tag: 'websocket_test' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => {
      console.log('🔗 Соединение открыто');
    });

    socket.on('message', (msg) => {
      console.log(`📩 Получено сообщение: ${msg}`);
    });

    socket.on('close', () => {
      console.log('❌ Соединение закрыто');
    });

    socket.on('error', (e) => {
      console.error('⚠️ Ошибка:', e.error());
    });

    socket.setTimeout(() => {
      socket.close();
    }, 10000); // Закрываем через 10 сек
  });

  check(res, { 'успешное подключение': (r) => r && r.status === 101 });
}
