import * as mongoDB from "mongodb";
import { v4 as uuid } from 'uuid';

import { EncounterModel } from "../models/encounter.model";

export class DataService {
    private static dbUrl: string = 'mongodb://localhost:27017/3ncount3r';
    private static mongoClient: mongoDB.MongoClient = new mongoDB.MongoClient(this.dbUrl);
    private static collections: { encounters?: mongoDB.Collection<EncounterModel> } = {};

    private static async connectToDb() {
        await this.mongoClient.connect();

        const db: mongoDB.Db = this.mongoClient.db('3ncount3r_data');
        const encounterCollection: mongoDB.Collection<EncounterModel> = db.collection<EncounterModel>('Encounters');
        this.collections.encounters = encounterCollection;
        
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${encounterCollection.collectionName}`);
    }

    public static async saveEncounter(encounter: EncounterModel) {
        await this.connectToDb();
        encounter.id = uuid();
        await this.collections.encounters?.insertOne(encounter);
    }

    public static async getEncounters(): Promise<EncounterModel[]> {
        await this.connectToDb();
        return (await this.collections.encounters?.find({}).toArray()) as EncounterModel[];
    }

    public static async getEncounterById(id: string): Promise<EncounterModel> {
        await this.connectToDb();
        let encounter = (await this.collections.encounters?.findOne({ id: id })) as EncounterModel;

        return encounter;
    }
}