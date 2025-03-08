# Usa uma imagem base do Node.js com Alpine (mais leve)
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala o PM2 globalmente
RUN npm install -g pm2

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Compila a aplicação NestJS
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação usando PM2
CMD ["pm2-runtime", "dist/main.js"]
