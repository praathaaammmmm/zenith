# 🚀 Zenith

> **An AI-powered multi-agent platform that helps founders validate, analyze, and build startup ideas using intelligent workflows and Retrieval-Augmented Generation (RAG).**

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Overview

Zenith is an AI-powered startup intelligence platform that transforms a simple business idea into structured insights using a team of specialized AI agents.

Instead of relying on a single LLM response, Zenith orchestrates multiple domain-specific agents that collaborate to perform research, validation, strategic analysis, and business planning. A built-in Retrieval-Augmented Generation (RAG) pipeline grounds responses using curated startup frameworks, market reports, case studies, and business knowledge.

The result is a more reliable, explainable, and actionable AI workflow for founders and entrepreneurs.

---

## 🎯 Features

* 🤖 Multi-Agent AI orchestration
* 🧠 Retrieval-Augmented Generation (RAG)
* 📚 Startup knowledge base
* 📊 Business model analysis
* 📈 Market research assistance
* 💡 Startup validation workflows
* ⚡ Real-time workflow streaming
* 🎨 Modern dashboard UI
* 🔑 Secure API key management
* 🧩 Modular backend architecture

---

## 🏗️ Architecture

```
                 User
                   │
                   ▼
          Next.js Frontend
                   │
          REST API Requests
                   │
                   ▼
            FastAPI Backend
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
   Agent Orchestrator      RAG Engine
         │                   │
         ▼                   ▼
 Specialized Agents    Vector Store
         │                   │
         └─────────┬─────────┘
                   ▼
          Knowledge Base
     • Startup Frameworks
     • Case Studies
     • Market Reports
     • Business Models
```

---

## 📂 Project Structure

```
zenith/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── lib/
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── orchestrator/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── prompts/
│   │   └── schemas/
│   │
│   ├── rag/
│   │   ├── embeddings.py
│   │   ├── retriever.py
│   │   ├── vector_store.py
│   │   └── rag_service.py
│   │
│   └── knowledge_base/
│       ├── business_models/
│       ├── case_studies/
│       ├── market_reports/
│       └── startup_frameworks/
```

---

## 🛠 Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* FastAPI
* Python
* Pydantic

### AI

* Multi-Agent Architecture
* Retrieval-Augmented Generation (RAG)
* Vector Embeddings
* Prompt Engineering

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/praathaaammmmm/zenith.git

cd zenith
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Start the server

```bash
uvicorn app.main:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Open

```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
OPENAI_API_KEY=your_api_key

# Add additional provider keys if required
```

---

## 🧠 AI Workflow

1. User submits a startup idea.
2. Request reaches the FastAPI backend.
3. The orchestrator selects the appropriate AI agents.
4. Relevant knowledge is retrieved through the RAG pipeline.
5. Agents collaborate using retrieved context.
6. Results are streamed back to the frontend.

---

## 📚 Knowledge Base

Zenith organizes business intelligence into curated collections:

* Startup Frameworks
* Business Models
* Market Reports
* Case Studies

This allows AI responses to be grounded in structured information instead of relying solely on model memory.

---

## 🚧 Current Status

### Completed

* Frontend dashboard
* Backend API
* Multi-agent orchestration
* RAG pipeline
* Knowledge base integration
* Workflow streaming

### In Progress

* Additional specialized agents
* Persistent vector database
* Authentication
* Conversation history
* Deployment pipeline

---

## 🗺️ Roadmap

* [ ] User authentication
* [ ] Project management
* [ ] Team collaboration
* [ ] File uploads
* [ ] PDF report generation
* [ ] Startup scoring system
* [ ] Market trend visualization
* [ ] Investor-ready business plans
* [ ] Cloud deployment
* [ ] Docker support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Pratham**

Building intelligent products at the intersection of **AI, software engineering, and entrepreneurship.**

---

> **Zenith** aims to become an AI co-founder—helping entrepreneurs move from ideas to validated business strategies through intelligent, collaborative AI.
