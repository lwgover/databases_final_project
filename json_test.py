
import requests
r = requests.post('http://localhost:8080/login', json={
  "user": "lwgover",
  "password": 18.00
})
print(f"Status Code: {r.status_code}, Response: {r.json()}")