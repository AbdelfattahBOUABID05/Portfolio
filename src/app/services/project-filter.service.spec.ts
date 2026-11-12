import { TestBed } from '@angular/core/testing';

import { ProjectFilterService } from './project-filter.service';

describe('ProjectFilterService', () => {
  let service: ProjectFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start without any selected technology', () => {
    expect(service.selectedTech()).toBeNull();
  });

  it('should select a technology', () => {
    service.select('Angular');
    expect(service.selectedTech()).toBe('Angular');
  });

  it('should clear the selected technology', () => {
    service.select('Angular');
    service.clear();
    expect(service.selectedTech()).toBeNull();
  });
});
