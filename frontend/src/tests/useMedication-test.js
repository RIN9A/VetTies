import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    scenarios: {
        stress: {
            executor: 'per-vu-iterations',
            vus: 30,
            iterations: 20,
            maxDuration: '1m',
        },
    },
};

const testMeds = new SharedArray('meds', function() {
    return [{ id: 'd654dfc7-8279-49c3-aca4-9f591bd6cc63', initialQuantity: 100 }];
});

export function setup() {
    const loginRes = http.post('http://localhost:8080/auth/login', JSON.stringify({
        email: 'admin@clinic.com',
        password: 'admin12'
    }), { headers: { 'Content-Type': 'application/json' } });

    console.log('🟢 Авторизация выполнена. Токен получен.');
    
    return { 
        token: loginRes.json('token'),
        medId: testMeds[0].id
    };
}

export default function (data) {
    const params = {
        headers: {
            'Authorization': `Bearer ${data.token}`,
        },
    };

    const url = `http://localhost:8080/medications/use?id=${data.medId}&quantity=1`;
    const res = http.post(url, null, params);

    const success = check(res, {
        'Use successful or conflict': (r) => r.status === 200 || r.status === 409,
    });

    if (success) {
        console.log(`✔️ Запрос выполнен успешно [${res.status}]`);
    } else {
        console.error(`❌ Ошибка при запросе [${res.status}]`);
    }
}
