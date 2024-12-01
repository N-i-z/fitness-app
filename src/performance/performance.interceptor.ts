// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class PerformanceInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const now = Date.now();

//     return next.handle().pipe(
//       tap(() => {
//         const response = context.switchToHttp().getResponse();
//         const { statusCode } = response;
//         console.log(
//           `Performance: ${request.method} ${request.url} ${statusCode} - ${Date.now() - now}ms`,
//         );
//       }),
//     );
//   }
// }
