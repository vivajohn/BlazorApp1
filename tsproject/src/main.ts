import { PlayerService } from './player.service';

(<any>window)['PlayerService'] = new PlayerService();
