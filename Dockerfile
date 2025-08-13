FROM node:22-slim
WORKDIR /frontend
COPY . .
RUN npm install && npm run build
CMD ["npm", "run", "preview"]
