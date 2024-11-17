from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from database import *

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_login():
    with open("templates/login.html") as file:
        return HTMLResponse(content=file.read())

@app.get("/register", response_class=HTMLResponse)
async def get_register_page():
    with open("templates/signup.html") as file:
        return HTMLResponse(content=file.read())

@app.post("/register")
async def register_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
):
    result = insert_new_person(username, email, password)
    if result:
        return RedirectResponse(url="/", status_code=303)
    return {"success": False, "message": "Registration failed."}
@app.get("/home", response_class=HTMLResponse)
async def read_homepage():
    with open("templates/homepage.html", encoding="utf-8") as file:
        return HTMLResponse(content=file.read())
# Trang lập kế hoạch học tập
@app.get("/calendar", response_class=HTMLResponse)
async def read_calendar():
    with open("templates/calendar.html",  encoding="utf-8") as file:
        return HTMLResponse(content=file.read())

# # Trang tính GPA
@app.get("/gpa", response_class=HTMLResponse)
async def read_calendar():
    with open("templates/gpa.html",  encoding="utf-8") as file:
        return HTMLResponse(content=file.read())
    
@app.get("/study_result", response_class=HTMLResponse)
async def read_calendar():
    with open("templates/study_result.html",  encoding="utf-8") as file:
        return HTMLResponse(content=file.read())
        
@app.get("/study_target", response_class=HTMLResponse)
async def read_calendar():
    with open("templates/study_target.html",  encoding="utf-8") as file:
        return HTMLResponse(content=file.read())

@app.get("/study_statistics", response_class=HTMLResponse)
async def read_calendar():
    with open("templates/study_statistics.html",  encoding="utf-8") as file:
        return HTMLResponse(content=file.read())
    
@app.get("/notice", response_class=HTMLResponse)
async def read_calendar():
    with open("templates/notice.html",  encoding="utf-8") as file:
        return HTMLResponse(content=file.read())
