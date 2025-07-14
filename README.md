# PathSpy?
PathSpy is an endpoint enumeration utility written in Node.js and designed to be lightweight, fast, and run smoothly in minimalist environments.

PathSpy scans a list of endpoints (paths) from a target base_url, then sends an HTTP request to each path to check the response whether it's valid (200 OK), protected (403), not found (404), error (500), or failed completely (ERR).
The goal is to uncover hidden or sensitive endpoints that might serve as entry points for further testing.

## Key Features

- **🚀 No Bloat Dependencies**<br>
  No bulky frameworks like Express, no visualizations like Chalk, just Axios + FS, making it fast and lightweight.

- **📂 Wordlist Support**<br>
  Retrieves a list of endpoints from a wordlist.txt file, customizable to your needs.

- **📤 Multiple Output Modes**<br>
`--save`: Saves only 200 OK responses<br>
`--save-all`: Saves all responses, including errors and forbidden responses

- **🖥️ CLI Friendly**<br>
  Built for terminal use, perfect for use in Termux, SSH, or other lightweight terminals.

- **⏱️ Time-Aware Responses**<br>
  Displays the response time (ms) for each endpoint performance analysis request.

- **🌐 HTTP & HTTPS Target Support**
  Regardless of whether the server uses the http or https protocol, this tool can still detect its status.

## 🎯 Main Uses

- Detect sensitive endpoints such as:<br>
`admin`, `login`, `dashboard`, `api/`, `config.php`, etc.
- Develop a strategy for early-stage pentesting (information gathering)
- Audit hidden endpoints in personal projects
- Identify backend vulnerabilities in web applications
- Validate active URL structures in a system

## 🔐 Ethics & Legality
This tool was developed for educational purposes, security research, and testing of proprietary systems or proprietary
systems for which written permission has been granted.

## Requirements & Installation
- Nodejs version 14+
- Git (Optional, to clone the repository)

- **Clone Repository & Install Dependencies**
  ```bash
  git clone https://github.com/ZeltNamizake/pathspy
  cd pathspy && npm install axios
  ```

## ⚠️ Disclaimer 
This tool is for educational, research, and local testing purposes only. 
The developer is not responsible if this tool is used to attack systems without authorization!

###### `Created by ZeltNamizake (Driyasx)`
