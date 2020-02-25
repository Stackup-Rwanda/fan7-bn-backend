FROM node:12
WORKDIR /app
# COPY ["package.json", "package-lock.json", "./"]
COPY package*.json ./
COPY . .
RUN npm install
RUN ls /app/
RUN ls /app/src/
EXPOSE 5000
CMD ["npm", "start"]
