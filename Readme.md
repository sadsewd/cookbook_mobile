# "Cookbook"

## Pamatinformācija

- Projeka autori: Kārlis Lācītis, Endijs Dārznieks
- Projekta nosaukums: "Cookbook"
- Projekta apraksts: Projekta mērķis ir izveidot lietotni, kur lietotāji var glabāt savas receptes. Receptes tiek saistītas ar lietotāju izveidoto kontu un informācija tiek glabāta attālināti.
- Kā palaist projektu:

## Kā palaist projektu

### APK

1. No builds direktorijas lejupielādēt .APK failu un installēt lietotni

### Expo go

1. Installēt Node.js 22
2. Klonēt projektu
3. Veikt komandas `npm i` izpildi direktorijā /client
4. Direktorijā /client palaist komandu `npm start`
5. Sekot komandlīnijas izvaddatiem lai savienotos ar Expo Go

## Ekrānšāviņi

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

## Idejas nākotnei

- Konta dzēšana
- Kontu epasta verifikācija
- MFA ieviešana
- Uzlabot recepšu vizualizāciju (piemēram kopējais nepieciešamais laiks receptes sagatavei, laiks katram solim)
