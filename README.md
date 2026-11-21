# AIRWISE + BULBA AI (Netlify)

Файлдар: index.html (сайт), netlify/functions/bulba.mjs (AI сервері), netlify.toml.

## Іске қосу
1. aistudio.google.com/app/apikey бетінде жаңа Gemini кілтін жасаңыз (кілтті ешкімге жібермеңіз).
2. Папканы GitHub репозиторийіне салыңыз да, Netlify-да "Add new site -> Import from Git" арқылы қосыңыз.
   (Баламасы: `npm i -g netlify-cli`, сосын папкада `netlify deploy --prod`.)
3. Netlify -> Site settings -> Environment variables -> GEMINI_API_KEY = сіздің кілт.
   Қаласаңыз GEMINI_MODEL айнымалысымен модельді ауыстырыңыз.
4. Сайтты қайта жариялаңыз (Deploys -> Trigger deploy). BULBA AI бөлімінде сұрақ қойып тексеріңіз.

## Нақты ESP32
Баптаулар -> Нақты құрылғы: WebSocket мекенжайы. JSON: {"co2":640,"temp":22.4,"hum":47,"pm25":8,"pm10":12,"voc":90,"noise":41}
