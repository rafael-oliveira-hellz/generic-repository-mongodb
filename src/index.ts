// importing mongoClient to connect at mongodb
import { MongoClient, ObjectId } from 'mongodb';

import { SpartanRepository } from './repositories/SpartanRepository';
import { Spartan } from './entities/Spartan';

//importing Hero classes
import { HeroRepository } from './repositories/HeroRepository';
import { Hero } from './entities/Hero';

// creating a function that execute self runs
(async () => {
  // connecting at mongoClient
  const connection: MongoClient = await MongoClient.connect(
    'mongodb://127.0.0.1:27017'
  );
  const db = connection.db('warriors');

  // our operations
  // creating a spartan
  /**
     * spartan inserted with success
      the count of spartans is 1
      *
     */

  const spartan = new Spartan('Leonidas', 1020);

  // initializing the repository
  const repository = new SpartanRepository(db, 'spartans');

  // call create method from generic repository
  const result = await repository.create(spartan);
  console.log(`spartan inserted with ${result ? 'success' : 'fail'}`);

  //call specific method from spartan class
  const count = await repository.countOfSpartans();
  console.log(`the count of spartans is ${count}`);

  const findSpartan = await repository.find(spartan);
  console.log('The spartan created is: ', spartan);

  console.log(findSpartan.length);

  // get only the spartan names
  const spartanNames = findSpartan.map(
    (spartan: { item: { name: string; kills: number }, _id: ObjectId  }) => {
      return {
        id: spartan._id.toString(),
        name: spartan.item.name,
        kills: spartan.item.kills,
      }
    }
  );
  console.log('Spartan Data: ', spartanNames);

  /**
     * hero inserted with success
      the count of spartans is 1
      *
     */

  const hero = new Hero('Spider Man', 200);
  const repositoryHero = new HeroRepository(db, 'heroes');
  const resultHero = await repositoryHero.create(hero);
  console.log(`hero inserted with ${resultHero ? 'success' : 'fail'}`);
  const countHeroes = await repositoryHero.countOfHeroes();
  console.log(`the count of heroes is ${countHeroes}`);
  console.log('The hero created is: ', hero);
  const findHero = await repositoryHero.find(hero);
  const heroNames = findHero.map(
    (hero: { item: { name: string; savedLives: number }, _id: ObjectId }) => {
      return {
        id: hero._id.toString(),
        name: hero.item.name,
        savedLives: hero.item.savedLives,
      }
    }
  );
  console.log('Hero Data: ', heroNames);

  const findOneHero = await repositoryHero.findOne(hero._id);
  console.log('Hero Data 2: ', findOneHero);

  connection.close();
})();
