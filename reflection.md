# Spies u25033931
# IMY 210 – Assignment 3 Reflection

**Name:** Spies  
**Student Number:** u25033931

---

## GitHub Repository

https://github.com/zander-spies/imy210-a3

---

## Strapi Cloud API

https://upbeat-fruit-289f00e6ec.strapiapp.com/api/blog-posts

---

## Commands to Run the Project

### NuxtJS (Frontend — Development)
```bash
cd nuxt-blog
npm install
npm run dev
```
The site will be available at `http://localhost:3000`.  
The app fetches data from the live Strapi Cloud instance at `https://upbeat-fruit-289f00e6ec.strapiapp.com`.

### Docker — Build and run NuxtJS
```bash
cd nuxt-blog
docker build -t nuxt-blog .
docker run -p 3000:3000 nuxt-blog
```
> The Strapi Cloud URL is baked in as the default build arg. No extra flags needed.

---

## Reflection

Working through this assignment introduced me to a Jamstack architecture that I had not previously used in practice. Setting up Strapi as a headless CMS was surprisingly straightforward — the admin panel made it easy to define a `blog-posts` collection type with fields for `title`, `author`, `content`, `snippet`, and `category`, and populate it with real data without writing any backend code. Deploying it to Strapi Cloud meant I had a live, publicly accessible REST API almost immediately, which simplified the NuxtJS integration considerably.

Integrating the Strapi API with NuxtJS without using the official Strapi module forced me to engage with the raw HTTP layer. Using `useAsyncData` together with `fetch` made me think carefully about server-side rendering and when data is fetched. Centralising all API calls in a `useStrapi` composable kept the data-fetching logic reusable across the homepage, search page, and single post page, while each page remained clean and focused on presentation.

One interesting challenge was that my Strapi schema stores `author` and `category` as plain string fields rather than relational content types. This meant deriving the unique category list for the dropdown filter directly from the posts array on the client, rather than hitting a separate `/api/categories` endpoint. Adapting to the actual shape of the API response — rather than assuming a structure — was a useful real-world lesson.

Docker was the most challenging part. The key insight was that NuxtJS bakes public runtime config into the bundle at build time, so the `STRAPI_BASE_URL` must be passed as a build argument, not just a runtime environment variable. Understanding the difference between build-time and runtime config in a SSR framework was a genuine learning moment that I will carry forward.

Overall, the assignment gave me a realistic picture of how a modern decoupled web application is structured, built, and deployed.
