
import requests
r = requests.post('http://localhost:8080/MakeQuiz', json={
  "qid": 1
})
print(f"Status Code: {r.status_code}, Response: {r.json()}")