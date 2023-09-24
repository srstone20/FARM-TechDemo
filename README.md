# FARM-TechDemo

- Using FarmAPI, ReactJS, and MongoDB

# Local Backend Setup:

### Step 1: Create  Virtual Environment

- `cd` into backend directory
- Run: `python -m venv venv`
- Start Virtual Environment
  - Mac CMD: source venv/bin/activate
  - Windows CMD: .\venv\Scripts\activate
- Install Packages: `pip install -r requirements.txt`

### Step 2: Create Environment variable

- In backend directory create file: `.env`
- Add line: `ConnectionString=`
- Set this line equal to the MongoDB connection string

### Step 3: Start FastAPI server

- While in backend directory and virtual environment running
- Run: `uvicorn main:app --reload`
- Can navigate to "url/docs" to see the FastAPI tester
  - Local version runs at: "http://127.0.0.1:8000/docs"

# Local Frontend Setup:

### Step 1: Install NPM packages

- `cd` into frontend directory
- Run: `npm install`

### Step 2: Run React Server

- Run while in the frontend directory
- Run: `npm start`
