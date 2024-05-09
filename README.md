## React-Frontend für die Konvertierung von Testlink-Testfällen zu .qft-Dateien

Das Frontend stellt auf Basis einer ID- und Versionskombination die Struktur eines QF-Test-Testfalls mit den gewählten Parametern bereit
Dieser Testfäll enthält bereits die korrekten Testschritte, die korrekten Beschreibungen (Auszuführende Aktionen und erwartete Ergebnisse)
sowie Informationen über die eingebundenen Bibliotheken aus dem QF-Test-Repository und einen Link zum urspruenglichen Testlink-Testfall

### `npm start`

Startet die App im dev-Modus \
Läuft auf [http://localhost:3111](http://localhost:3111).

### `npm test`

Starte einen Testdurchlauf (siehe Frontend.test.js).\

### `npm run build`

Baut eine möglichst kleine Version der App und legt sie im "build"-Ordner ab.\