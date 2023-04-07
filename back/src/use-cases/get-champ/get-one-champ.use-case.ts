import { Champion } from "../../models/champion";
import fetch from 'node-fetch';

export class GetOneChampUseCase {

    public static listChampions = new Array<Champion>();

    constructor() {
        (async () => {
            if (GetOneChampUseCase.listChampions.length === 0) {
                GetOneChampUseCase.listChampions = await GetOneChampUseCase.fetchChampions();
            }
        })();
    }

    getChampTofind(): Champion{
        return this.getRandomHero();
    }

    getChampSelect(nameChamp: string): Champion {        
        return GetOneChampUseCase.listChampions.find(c => c.name == nameChamp)!;
    }

    static async fetchChampions(): Promise<Champion[]> {
        if (!process.env.CHAMPIONS_URL) {
            throw new Error('Pas d\'url api champions en variable d\'environnement');
        }
        const response = await import('node-fetch').then(module => module.default(process.env.CHAMPIONS_URL!));
        const data = await response.json() as { 'hydra:member': any[] };
        return data['hydra:member'].map((champion: any) => new Champion(
            champion.name,
            champion.imageBase64,
            champion.gender,
            champion.positions.map((p: { name: string; }) => p.name),
            champion.species.map((p: { name: string; }) => p.name),
            champion.resource,
            champion.rangeTypes.map((p: { name: string; }) => p.name),
            champion.regions.map((p: { name: string; }) => p.name),
            champion.releaseYear
        ));
    }

    getRandomHero(): Champion {
        const randomIndex = Math.floor(Math.random() * GetOneChampUseCase.listChampions.length);
        return GetOneChampUseCase.listChampions[randomIndex];
    }
}
