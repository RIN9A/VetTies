import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 50 },  // постепенный рост нагрузки
        { duration: '1m', target: 100 },   // пиковая нагрузка
        { duration: '30s', target: 0 },    // спад
    ],
};

const BASE_URL = 'http://localhost:8080';
const AUTH_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${__ENV.API_TOKEN}`,
};

export function setup() {
    // Получаем токен один раз для всех VU
    const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
        email: 'admin@clinic.com',
        password: 'admin12'
    }), { headers: { 'Content-Type': 'application/json' } });
    return { token: loginRes.json('token') };
}

export default function (data) {
    const params = {
        headers: { ...AUTH_HEADERS, Authorization: `Bearer ${data.token}` },
        tags: { name: 'MedicationsThreshold' },
    };

    // Тестируем с пагинацией
    const thresholdRes = http.get(`${BASE_URL}/medications/expiring`, params);
    check(thresholdRes, {
        'GET /medications/expiring status 200': (r) => r.status === 200,
        'Response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(0.5);
}