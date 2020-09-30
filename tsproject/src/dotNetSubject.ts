// Wraps a Subject-like object received from the .NET code
export class DotNetSubject {

  constructor(private subject: any) { }

  next(obj?: any) {
    const json = !!obj ? JSON.stringify(obj) : null;
    this.subject.invokeMethodAsync('OnNext', json);
  }

  complete() {
    this.subject.invokeMethodAsync('OnCompleted');
  }

  error(message: string) {
    this.subject.invokeMethodAsync('OnCompleted', message);
  }

  test(data: any) {
    debugger;
    this.subject.invokeMethodAsync('Test', JSON.stringify(data));
  }

  //nextComplete(subject: any, obj: any) {
  //  this.next(obj);
  //  this.complete();
  //}
}