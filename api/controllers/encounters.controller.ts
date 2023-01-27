import { EncounterModel } from "../models/encounter.model";
import { DataService } from "../services/data.service"

export class EncountersController { 
    public static saveEncounter = async (req: any, res: any) => {
        await DataService.saveEncounter(req.body as EncounterModel);

        res.send('OK');
    }

    public static getEncounters = async (req: any, res: any) => {
        let encounters: EncounterModel[] = await DataService.getEncounters();

        res.send(encounters);
    }

    public static getEncounterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterById(id);

        res.send(encounter);
    }
}