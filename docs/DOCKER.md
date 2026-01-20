# Docker - Guide rapide

## Build & Run

```bash
# Build
docker build --build-arg VITE_OPENWEATHER_API_KEY=votre_clé -t weather-app .

# Run
docker run -d -p 8080:80 --name weather-app weather-app
```

Accès : http://localhost:8080

## Commandes utiles

```bash
docker stop weather-app      # Arrêter
docker start weather-app     # Démarrer
docker logs -f weather-app   # Logs
docker rm weather-app        # Supprimer
```

## Architecture

- **Stage 1** : Build avec Node.js 22 Alpine
- **Stage 2** : Production avec nginx 1.25 Alpine (~45MB)

## Optimisations

✅ Multi-stage build (image légère)
✅ Cache optimisé (dépendances en premier)
✅ Health check intégré
✅ .dockerignore configuré
✅ Pas de secrets hardcodés

## Note importante

La clé API est embeddée dans le JS final (normal pour une app frontend).
