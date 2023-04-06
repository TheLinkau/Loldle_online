import { Champion } from "../../models/champion";


export class GetOneChampUseCase {

    getChampTofind(): Champion{
        let champion = new Champion("Aatrox", "zzz", "Male", ["Top"], ["Darkin"], "Manaless", ["Mele"], ["Runetterra"], 2013);

        return champion;
    }

    getChampSelect(id: string) {        
        let champion = new Champion("Aatrox", "zzz", "Male", ["Top"], ["Darkin"], "Manaless", ["Mele"], ["Runetterra"], 2013);

        return champion;
    }
}
