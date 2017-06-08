import { TestBed, inject } from '@angular/core/testing';
import { RecordsServiceService } from './records-service.service';

describe('RecordsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordsServiceService]
    });
  });

  it('should ...', inject([RecordsServiceService], (service: RecordsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
