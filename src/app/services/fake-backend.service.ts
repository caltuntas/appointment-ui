import { InMemoryDbService } from 'angular-in-memory-web-api';

export class FakeBackendService implements InMemoryDbService {
  createDb() {
    const appointments = [
      {
        id: 1,
        name: 'Cihat Altuntaş',
        date: '05.04.2020',
        startTime: '15:30',
        endTime: '16:30',
      },
      {
        id: 1,
        name: 'Ahmet Mermertaş',
        date: '05.07.2020',
        startTime: '15:30',
        endTime: '16:30',
      }
    ];

    return {
      appointments
    };
  }
}
