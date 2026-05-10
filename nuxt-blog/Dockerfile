# Spies u25033931
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG STRAPI_BASE_URL=https://upbeat-fruit-289f00e6ec.strapiapp.com
ENV NUXT_PUBLIC_STRAPI_BASE=$STRAPI_BASE_URL
RUN npm run build

FROM base AS runner
COPY --from=builder /app/.output ./.output
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
