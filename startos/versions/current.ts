import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.9.1:0',
  releaseNotes: {
    en_US:
      'Updated Radicale to 3.9.1 with security fixes for authentication and storage hooks, stricter sharing permissions, and improved free/busy views. Requires StartOS 0.4.2 or newer. Full release notes: https://github.com/Kozea/Radicale/releases/tag/v3.9.1',
    es_ES:
      'Radicale actualizado a 3.9.1 con correcciones de seguridad en la autenticación y los hooks de almacenamiento, permisos de uso compartido más estrictos y vistas de disponibilidad mejoradas. Requiere StartOS 0.4.2 o posterior. Notas completas: https://github.com/Kozea/Radicale/releases/tag/v3.9.1',
    de_DE:
      'Radicale auf 3.9.1 aktualisiert: Sicherheitskorrekturen für Authentifizierung und Speicher-Hooks, strengere Freigabeberechtigungen und verbesserte Frei/Belegt-Ansichten. Erfordert StartOS 0.4.2 oder neuer. Vollständige Versionshinweise: https://github.com/Kozea/Radicale/releases/tag/v3.9.1',
    pl_PL:
      'Zaktualizowano Radicale do 3.9.1: poprawki bezpieczeństwa uwierzytelniania i hooków przechowywania danych, bardziej rygorystyczne uprawnienia udostępniania oraz ulepszone widoki dostępności. Wymaga StartOS 0.4.2 lub nowszego. Pełne informacje: https://github.com/Kozea/Radicale/releases/tag/v3.9.1',
    fr_FR:
      'Radicale passe à la version 3.9.1 avec des correctifs de sécurité pour l’authentification et les hooks de stockage, des permissions de partage plus strictes et des vues de disponibilité améliorées. Nécessite StartOS 0.4.2 ou ultérieur. Notes complètes : https://github.com/Kozea/Radicale/releases/tag/v3.9.1',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
