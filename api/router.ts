const express = require("express");

import { AdventuresController } from './controllers/adventures.controller';
import { CreaturesController } from './controllers/creatures.controller';
import { PartiesController } from './controllers/parties.controller';

export const router = express.Router();

router.get('/creatures', CreaturesController.getCreatures);
router.get('/creatures/image/:sourceId/:name', CreaturesController.getCreatureImage);

router.get('/adventures', AdventuresController.getAdventures);
router.get('/adventures/:id', AdventuresController.getAdventureById);

router.get('/parties', PartiesController.getParties);
router.get('/parties/:name', PartiesController.getPartyByName);
router.get('/parties/characterimage/:name', PartiesController.getCharacterImage);