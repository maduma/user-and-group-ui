import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const developers = [
            { id: 'snsakala', name: 'Stéphane Nsakala' },
            { id: 'opredi', name: 'Olivier Predi' },
            { id: 'dlouli', name: 'Damien Louli' },
            { id: 'cgalopin', name: 'Chris Galopin' },
            { id: 'tbrass', name: 'Théo Brass' },
            { id: 'aredi', name: 'Amélie Redi'},
        ];
        const people = [
            { id: 'snsakala', name: 'Stéphane Nsakala' },
            { id: 'opredi', name: 'Olivier Predi' },
            { id: 'dlouli', name: 'Damien Louli' },
            { id: 'cgalopin', name: 'Chris Galopin' },
            { id: 'tbrass', name: 'Théo Brass' },
            { id: 'aredi', name: 'Amélie Redi'},
            { id: 'tcharlier', name: 'Thomas Charlier' },
            { id: 'jfontaine', name: 'Juste Fontaine' },
            { id: 'gcouli', name: 'Gerard Couli' },
            { id: 'tbatrero', name: 'Thierry Batrero' },
            { id: 'capati', name: 'Cléo Apati' },
            { id: 'jdans', name: 'Jérémi Dans'},
            { id: 'drirale', name: 'David Rilale'},
            { id: 'oetri', name: 'Ophélie Etri'},
            { id: 'rpasceli', name: 'Rita Pasceli'},
        ];       
      return {
          'developers': developers,
          'people': people,
        };
    }
  }