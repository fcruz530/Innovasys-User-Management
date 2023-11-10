import { HttpResponse } from '@angular/common/http';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../http/models/paginated-result.model';

export function mapPagination<T>(): OperatorFunction<HttpResponse<T[]>, PaginatedResult<T[]>> {
  return map((response: HttpResponse<T[]>) => {
    const total = response.headers.get('X-Pagination-Total') ?? '0';

    const paginatedResult: PaginatedResult<T[]> = {
      result: response.body as T[],
      total: parseInt(total, 10)
    };
    return paginatedResult;
  });
}
