import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.9.2:0',
  releaseNotes: {
    en_US:
      'Updated Radicale to 3.9.2. Calendar and contact clients now reliably notice changes instead of occasionally missing them, a damaged item no longer breaks listing of its collection, and searches over endlessly repeating events stay bounded. Also includes performance improvements. Full release notes: https://github.com/Kozea/Radicale/releases/tag/v3.9.2',
    es_ES:
      'Radicale actualizado a 3.9.2. Los clientes de calendario y contactos ahora detectan los cambios de forma fiable en lugar de pasarlos por alto ocasionalmente, un elemento dañado ya no impide listar su colección y las búsquedas sobre eventos que se repiten indefinidamente se mantienen acotadas. Incluye además mejoras de rendimiento. Notas completas: https://github.com/Kozea/Radicale/releases/tag/v3.9.2',
    de_DE:
      'Radicale auf 3.9.2 aktualisiert. Kalender- und Kontakt-Clients erkennen Änderungen jetzt zuverlässig, statt sie gelegentlich zu übersehen, ein beschädigter Eintrag verhindert nicht mehr das Auflisten seiner Sammlung, und Suchen über endlos wiederkehrende Termine bleiben begrenzt. Außerdem Leistungsverbesserungen. Vollständige Versionshinweise: https://github.com/Kozea/Radicale/releases/tag/v3.9.2',
    pl_PL:
      'Zaktualizowano Radicale do 3.9.2. Klienci kalendarzy i kontaktów niezawodnie wykrywają teraz zmiany, zamiast czasem je pomijać, uszkodzony element nie blokuje już wyświetlania swojej kolekcji, a wyszukiwanie w wydarzeniach powtarzających się bez końca pozostaje ograniczone. Zawiera też poprawki wydajności. Pełne informacje: https://github.com/Kozea/Radicale/releases/tag/v3.9.2',
    fr_FR:
      'Radicale passe à la version 3.9.2. Les clients de calendrier et de contacts détectent désormais les modifications de manière fiable au lieu de les manquer parfois, un élément endommagé n’empêche plus l’affichage de sa collection et les recherches sur des événements récurrents sans fin restent bornées. Inclut également des améliorations de performances. Notes complètes : https://github.com/Kozea/Radicale/releases/tag/v3.9.2',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
