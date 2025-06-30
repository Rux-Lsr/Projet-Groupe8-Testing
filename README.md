# Propelize – Projet Groupe 8

## Prérequis
- Node.js >= 18
- Docker & Docker Compose (pour la base de données)
- MySQL (si vous ne souhaitez pas utiliser Docker)

## Installation

1. **Cloner le dépôt**
   ```sh
   git clone https://github.com/Rux-Lsr/Projet-Groupe8-Testing.git
   cd Projet-Groupe8-Testing
   ```

2. **Installer les dépendances Node.js**
   ```sh
   npm install
   ```

3. **Configurer les variables d'environnement**
   - Copier `.env.example` en `.env` et adapter si besoin.

## Lancer la base de données avec Docker

```sh
# Démarrer MySQL avec Docker Compose
npm run db:up
# ou directement
# docker-compose up -d mysql
```

> Le script SQL `db/db.sql` sera automatiquement exécuté à la première initialisation du conteneur.

## Lancer l'API en développement

```sh
npm run dev
```

## Lancer les seeds manuellement

```sh
npm run seed
```

## Lancer les tests

- **Tous les tests** :
  ```sh
  npm test
  ```
- **Unitaires** :
  ```sh
  npm run test:unit
  ```
- **Intégration** :
  ```sh
  npm run test:integration
  ```

## Documentation API (Swagger)

- Lancer l'API puis accéder à :
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Scripts disponibles

| Commande              | Description                                 |
|----------------------|---------------------------------------------|
| npm run dev          | Démarre l'API en mode développement         |
| npm start            | Démarre l'API (prod)                        |
| npm run seed         | Exécute le script de seed (remplit la BDD)  |
| npm test             | Lance tous les tests                        |
| npm run test:unit    | Lance les tests unitaires                   |
| npm run test:integration | Lance les tests d'intégration           |

## Structure du projet

- `src/` : Code source de l'API (routes, contrôleurs, services...)
- `db/` : Script SQL de création et seed de la base
- `tests/` : Tests unitaires et d'intégration
- `scripts/seed.js` : Script Node.js pour insérer les seeds

## Notes
- Les utilisateurs n'ont que les champs : `id`, `name`, `password`.
- Les tokens JWT sont nécessaires pour accéder à la plupart des routes.
- La documentation Swagger est toujours à jour avec le code.

---

Pour toute question, ouvrez une issue sur le dépôt GitHub.
