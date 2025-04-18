# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


 Steganography Web App

This is a full-stack web app that lets users hide secret messages inside image or video files using steganography.

Tech Stack:
- React + Vite (Frontend)
- Firebase Authentication
- Python Flask backend
- Bit-level steganography algorithm in `stego.py`

 Project Structure:
- `/src`: React components (Signup, Login, Homepage)
- `/server`: Flask API server (app.py, stego.py)
- `/uploads`: Uploaded files
- `/results`: Stego output files



1. Clone the repo and install dependencies:

Frontend:
```
npm install
npm run dev
```

Backend:
```
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

#packages 
python3 -m pip install flask
pip install bitstring
npm install axios
python3 -m venv venv

my website :
website:https://stego-site.vercel.app