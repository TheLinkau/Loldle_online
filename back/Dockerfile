# Utilisez une image Node.js comme base
FROM node:latest

# Définissez le répertoire de travail
WORKDIR /app

# Copiez le fichier package.json
COPY package.json .

# Copiez le dossier src/
COPY src/ ./src/

# Exécutez la commande npm install
RUN npm install

# Exposez le port sur lequel le serveur écoute
EXPOSE 3002

# Démarrez le serveur
CMD ["yarn", "serve"]