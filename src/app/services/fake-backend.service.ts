import { InMemoryDbService } from 'angular-in-memory-web-api';

export class FakeBackendService implements InMemoryDbService {
  createDb() {
    const appointments = [
      {
        id: 1,
        name: 'Cihat Altuntaş',
        phone: '05309631254',
        date: '05.04.2020',
        startTime: '15:30',
        endTime: '16:30',
        description: 'Desc',
      },
      {
        id: 1,
        name: 'Ahmet Mermertaş',
        phone: '05309631254',
        date: '05.07.2020',
        startTime: '15:30',
        endTime: '16:30',
        description: 'Desc',
      }
    ];

    return {
      appointments
    };
  }
}
