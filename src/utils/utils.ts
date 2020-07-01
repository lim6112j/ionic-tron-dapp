// tslint:disable-next-line: eofline
export const log = (msg) => (v) => console.log(`%c[${msg}] => [${v}]`, 'color: #0beb43');
export const observer = function(): any {
  let i = 0;
  const obj: any =   {
    next: function(v: any) {
      log('Subscription value')(v);

      this.unsubscribe();
    },
    error: log('Subscription Error'),
    complete: function(){console.log('completed')}
  }
  return obj;
} 