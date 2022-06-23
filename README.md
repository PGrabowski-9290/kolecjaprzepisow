### Projekt 2 Node.JS + Frameworki
#### Instalacja:
1. Instalacja modułów node
```bash
cd backend 
npm install
cd ../recipes-react-app
npm i
```

2. W folderze backend nalerzy utworzyć plik .env. Przykład zawartości pliku
```env
ACCESS_TOKEN_SECRET=secret token
REFRESH_TOKEN_SECRET=seret token
MONGO_URI=uri do bazy mongo
```

3. Uruchomienie aplikacji:
```npm
BACKEND: 
cd backen
npm run dev

FRONTEND:
cd recipes-react-app
npm start
```

Aplikacja backend domyślnie uruchomi się  na porcie 8000
Aplikacja react domyślnie będzie pod adresem: http://localhost:3000
