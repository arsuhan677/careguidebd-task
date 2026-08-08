import axios from 'axios';

async function test() {
  try {
    const api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    api.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // First login to get the cookie
    const loginRes: any = await api.post('/auth/login', { email: 'admin@example.com', password: 'password123' });
    const cookie = loginRes.token ? `accessToken=${loginRes.token}` : '';
    
    const res: any = await api.get('/dashboard', {
        headers: { Cookie: cookie }
    });
    
    console.log("res is array?", Array.isArray(res));
    console.log("Keys in res:", Object.keys(res));
    console.log("Keys in res.data:", res.data ? Object.keys(res.data) : null);
    
    if (res.data && res.data.summary) {
       console.log("IT WORKS: res.data.summary =", res.data.summary);
    } else {
       console.log("IT FAILS: res.data does NOT have summary");
       console.log("Does res have summary directly?", res.summary ? true : false);
       if (res.summary) {
          console.log("res.summary =", res.summary);
       }
    }
  } catch (error: any) {
    console.error("API error:", error.message);
  }
}

test();
