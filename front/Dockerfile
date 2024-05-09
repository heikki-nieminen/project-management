FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN rm -rf node_modules package-lock.json
RUN npm install
COPY tsconfig.* .
COPY vite.config.ts .
COPY index.html .
COPY codegen.ts .
EXPOSE 3456
CMD ["yarn", "run", "codegen-dev"]