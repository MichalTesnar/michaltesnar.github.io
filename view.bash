# Open a server
python3 -m http.server 8000

# Open the files
open http://localhost:8000/github/michaltesnar.github.io/

# Kill the process
# kill -9 $(lsof -t -i :8000)