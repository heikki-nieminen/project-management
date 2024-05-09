FROM node:18-alpine
WORKDIR /app
COPY .env .
COPY prisma ./prisma
COPY package.json .
RUN npm install
COPY tsconfig.json .
EXPOSE 4000
CMD ["yarn", "run", "dev"]