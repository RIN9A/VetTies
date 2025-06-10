import http from 'k6/http';
import { check, sleep } from 'k6';
import ws from 'k6/ws';

export let options = {
    vus: 10,
    duration: '30s',
};

const BASE_URL = 'http://localhost:8080';
const LOGIN_PAYLOAD = JSON.stringify({
    email: 'admin@clinic.com',
    password: 'admin12'
});

const headers = { 'Content-Type': 'application/json' };

export default function () {
    // === Шаг 1: логинимся и получаем токен ===
    const loginRes = http.post(`${BASE_URL}/auth/login`, LOGIN_PAYLOAD, { headers });
    check(loginRes, {
        'Логин успешен': (r) => r.status === 200 && r.json('token') !== undefined,
    });

    const token = loginRes.json('token'); // достаём JWT

    const authHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // === Шаг 2: делаем защищённый REST запрос ===
    const getMeds = http.get(`${BASE_URL}/medications`, { headers: authHeaders });
    check(getMeds, {
        'GET /medications (авторизован)': (r) => r.status === 200,
    });

    // === Шаг 3: подключаемся к WebSocket с JWT ===
    const wsUrl = `ws://localhost:8080/ws/appointments/websocket`;
    const params = { tags: { my_tag: 'websocket_test' } };

    const wsRes = ws.connect(wsUrl, params, function (socket) {
        socket.on('open', function open() {
            console.log('📡 WS соединение открыто');
            socket.send(JSON.stringify({
                action: 'subscribe',
                channel: '/topic/admin-notifications'
            }));
        });

        socket.on('message', function (msg) {
            const data = JSON.parse(msg);
            console.log('🔔 Уведомление:', data);
        });

        socket.setTimeout(() => {
            socket.close();
        }, 10000);
    });

    check(wsRes, {
        'WebSocket подключение успешно': (r) => r && r.status === 101,
    });

    sleep(1); // пауза между итерациями
}
