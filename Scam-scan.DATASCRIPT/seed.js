// Importer Faker et MongoDB
const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

// Configuration de la connexion MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'Manga'; // Remplacez par le nom de votre base de données
const client = new MongoClient(url);

// Listes de valeurs possibles pour les filtres
const genres = ['Action', 'Romance', 'Comédie', 'Fantaisie', 'Horreur'];
const statuses = ['En cours', 'Terminé', 'En pause'];
const authors = ['Oda', 'Kishimoto', 'Kubo'];
const popularityOptions = [0, 1];
const years = [2020, 2021, 2022, 2023];
const languages = ['Français', 'Anglais', 'Japonais'];
const ratings = [1, 2, 3, 4, 5];
const types = ['Manga', 'Manhwa', 'Manhua'];

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await client.connect();
    console.log('Connecté à MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('mangas'); // Remplacez par le nom de votre collection

    const mangas = Array.from({ length: 100 }).map(() => {
      const name = faker.commerce.productName();
      const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`; // Suffixe aléatoire pour garantir l'unicité du manga
      return {
        name,
        slug: `${faker.helpers.slugify(name)}-${uniqueSuffix}`, // Ajout du suffixe pour garantir l'unicité du slug
        description: faker.lorem.paragraph(),
        image: faker.image.url({ width: 150, height: 400, category: 'dog', randomize: true }),
        variousName: faker.commerce.productName(),
        genre: faker.helpers.arrayElement(genres),
        status: faker.helpers.arrayElement(statuses),
        author: faker.helpers.arrayElement(authors),
        popularity: faker.helpers.arrayElement(popularityOptions),
        publicationYear: faker.helpers.arrayElement(years),
        language: faker.helpers.arrayElement(languages),
        rating: faker.helpers.arrayElement(ratings),
        type: faker.helpers.arrayElement(types),
        chapters: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map(() => {
          const chapterName = `Chapter ${faker.number.int(100)}`;
          const chapterUniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`; // Suffixe unique pour chaque chapitre
          return {
            name: chapterName,
            slug: `${faker.helpers.slugify(chapterName)}-${chapterUniqueSuffix}`, // Unicité du slug de chapitre
            updated_at: faker.date.recent(),
            images: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map(() => ({
              path: faker.image.url({ width: 650, height: 2000, category: 'dog', randomize: true })
            }))
          };
        }),
        updated_at: faker.date.recent(),
        created_at: faker.date.past()
      };
    });

    // Insertion dans MongoDB
    const result = await collection.insertMany(mangas);
    console.log(`${result.insertedCount} documents insérés`);

  } catch (error) {
    console.error('Erreur lors de l’insertion :', error);
  } finally {
    // Fermer la connexion
    await client.close();
  }
}

seedDatabase();
