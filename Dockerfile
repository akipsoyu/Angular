# Aşama 1: Node.js ile Angular uygulamasını derleme
FROM node:16 AS build
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Projedeki NPM bağımlılıklarını yükleyin
RUN npm install

# Projenin geri kalanını kopyalayın
COPY . .

# Angular uygulamasını derleyin (projeye özgü build komutuna dikkat edin)
RUN npm run build

# Aşama 2: Nginx ile uygulamayı sunma
FROM nginx:alpine

# Derlenmiş uygulamayı Nginx'in HTML dizinine kopyalayın
# Burada "/dist/my-angular-app" kısmını projenizin ismine göre değiştirmelisiniz
COPY --from=build /usr/src/app/dist/api-lifecyle /usr/share/nginx/html

# Port 80'i dış dünyaya açın
EXPOSE 80

# Nginx'i başlatın
CMD ["nginx", "-g", "daemon off;"]

