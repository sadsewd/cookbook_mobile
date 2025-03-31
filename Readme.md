# "Cookbook"

## Pamatinformācija

- Projeka autori: Kārlis Lācītis, Endijs Dārznieks
- Projekta nosaukums: "Cookbook"
- Projekta apraksts: Projekta mērķis ir izveidot lietotni, kur lietotāji var glabāt savas receptes. Receptes tiek saistītas ar lietotāju izveidoto kontu un informācija tiek glabāta attālināti.

## Kā palaist projektu

### APK

APK build neizdevās

### Expo go

1. Installēt Node.js 22
2. Klonēt projektu
3. Veikt komandas `npm i` izpildi direktorijā /client
4. Direktorijā /client palaist komandu `npm start` vai `npx expo start --tunnel`
5. Sekot komandlīnijas izvaddatiem lai savienotos ar Expo Go

## Lietotās bibliotēkas

### Lietotne

- `@fortawesome/free-solid-svg-icons` Ikonas
- `@fortawesome/react-native-fontawesome` Ikonu komponente
- `@react-native-async-storage/async-storage` Vietējā glabātuve
- `axios` Aizvieto funkciju fetch
- `expo-checkbox` Expo checkbox komponente, izmantots jo react-native nepiedāva bāzes komponenti
- `expo-router` Expo maršrutēšanas risinajums

### Serveris

- `bcrypt` Šifrēšana
- `express` Express.js
- `mysql2` MySQL vaicajumi serverim
- `nodemon` Servera izstrādes rīks, restartē serveri pēc jaunām izmaniņām pirmkodā
- `jsonwebtoken` JWT token
- `cookie-parser` Darbības ar cookies
- `moment` Darbības ar datumiem

## Arhitektūras diagramma

![Arhitektūras diagramma](/assets/architectureDiagramm.drawio.png)

Viena datubāze un serveris kurš apstrādā vaicājumus datubāzei, visi lietotāji izmanto vienu un to pašu datubāzi
Datubāze tiek hostēta Google Cloud pakalpojumā
REST API serveris tiek hostēts vietnē Render.com

## Attēli

![Sākumlapa](/assets/main.PNG)

Aplikācijas sākumlapa, opcijas atvērt autorizācijas un reģistrācijas lapas.

![Reģistrācijas lapa](/assets/register.PNG)

Reģistrēšanās lapa, iespēja izveidot jaunu lietotāja kontu.

![Autorizācijas lapa](/assets/login.PNG)

Autorizēšanās lapa, ievadot tikai pareizus ielogošanās datus varēs tikt sistēmā.

![Recepšu saraksta lapa](/assets/recipeList.PNG)

Recepšu saraksts, iespējams atvērt recepti vai rediģēt to, opcija veidot jaunu recepti, kā arī filtrēt receptes pēc nosaukuma.

![Profila lapa](/assets/profile.PNG)

Profila/iestatījumu lapa, var nomainīt e-pastu, paroli, aplikācijas motīvu un iespējams izlogoties.

![Atvērtas receptes lapa](/assets/viewRecipe.PNG)

Vienas receptes lapa, opcija veikt receptes rediģēšanu.

![Receptes rediģēšanas lapa](/assets/editRecipe.PNG)

Receptes rediģēšanas lapa, var pārmainīt recpetes nosaukumu, sastāvdaļu un soļu sarakstus, veicot to rediģēšanu, pievienošanu un dzēšanu.

![Receptes pievienošanas lapa](/assets/addRecipe.PNG)

Receptes pievienošanas lapa, pieejamas visas tās pašas darbības, kuras ir rediģēšanas lapai.

## Idejas nākotnei

- Konta dzēšana
- Kontu epasta verifikācija
- MFA ieviešana
- Uzlabot recepšu vizualizāciju (piemēram kopējais nepieciešamais laiks receptes sagatavei, laiks katram solim)
