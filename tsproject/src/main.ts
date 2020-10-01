import { PlayerService } from './player.service';
import { Firebase } from './firebase';

(<any>window)['PlayerService'] = new PlayerService();
(<any>window)['Firebase'] = new Firebase();