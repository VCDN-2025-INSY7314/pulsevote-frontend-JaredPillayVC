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

### SSL/TLS Research & Local HTTPS Setup (PulseVote)

SSL/TLS is the cryptographic protocol that secures data in transit between clients and servers, giving us confidentiality, integrity, and server authenticity over HTTPS instead of plaintext HTTP. Modern browsers now call out non-HTTPS sites as “Not secure”, which nudges the whole web to adopt encryption by default and protects users from passive snooping and tampering on open networks.

### JWT Research

JSON Web Tokens (JWTs) are an RFC 7519 standard for compact, signed tokens that carry claims (like a user id and expiry) between parties. They’re popular because they’re stateless and verifiable: the server signs a token (HMAC secret or RSA/EC private key) and later verifies it without a database lookup. A JWT is three Base64URL parts — header, payload, and signature — joined by dots; the signature prevents tampering. Using HTTPS is still essential: without TLS, tokens and credentials can be intercepted or modified (e.g., via SSL-strip/Downgrade) and session cookies or bearer tokens stolen. Real-world incidents show JWT issues tend to come from misconfig (e.g., the historical “alg=none”/algorithm confusion or weak HS256 secrets) or library bugs that bypass verification, which led to multiple advisories and hardening guidance. In practice: use strong keys, set expirations, validate audience/issuer, and always serve tokens only over HTTPS.