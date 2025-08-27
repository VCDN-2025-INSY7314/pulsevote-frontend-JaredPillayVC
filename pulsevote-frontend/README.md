## PulseVote Frontend (React + Vite)

The React-based frontend for the PulseVote project.
Stack: Vite + React + Axios + React Router DOM.
Displays a welcome message and consumes the backend `/test` JSON endpoint.

---

✨ **Features**

- Vite React project scaffold
- Fetches JSON from the backend (`/test`)
- React Router DOM installed (ready for routing)
- Axios installed (ready for API calls)
- Simple component-based structure

---

📦 **Prerequisites**

- Node.js 18+ (works on 20/22 as well)
- npm 8+
- Backend service running locally on port 5000 (see backend README)

---

🚀 **Quick Start**

```sh
# clone your Classroom repo
git clone https://github.com/<org>/<pulsevote-frontend-JaredPillayVC>.git
cd pulsevote-frontend-JaredPillayVC/pulsevote-frontend

# install deps
npm install

# run dev server
npm run dev
```

Open the provided Vite local URL (usually http://localhost:5173/).

---

🧭 **Scripts**

`package.json`:

```json
{
	"scripts": {
		"dev": "vite",
		"build": "vite build",
		"preview": "vite preview"
	}
}
```

- `npm run dev` — run dev server with hot reload
- `npm run build` — create production build in /dist
- `npm run preview` — preview production build locally

---

⚙️ **Environment Variables**

If you need environment-specific API URLs later, create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Use in code:

```js
const res = await fetch(`${import.meta.env.VITE_API_URL}/test`);
```

⚠️ Never commit secrets to `.env` — `.gitignore` should already exclude it.

---

🔐 **Security Hygiene**

- `.gitignore` excludes node_modules, .env, and dist
- No secrets hardcoded in code
- Plan to implement secure routing and token storage later

---

🐛 **Troubleshooting**

**CORS error:**
Ensure the backend allows requests from your frontend dev URL. In backend `app.js`:

```js
app.use(cors({ origin: 'http://localhost:5173' }));
```

**Nothing shows under JSON:**
Make sure the backend is running on port 5000:
http://localhost:5000/test

**Port conflict:**
If 5173 is in use, Vite will prompt to use another port. Adjust backend CORS if needed.
