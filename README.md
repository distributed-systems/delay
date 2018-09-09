# Delay

Asynchronous Delay aka Timeouts for Async/Await

Attention: be aware that if you're waiting for a delay and it gets canceled
the code after the await `delay.wait(n)` statement is never executed and 
asynchronous wrapping the delay will never finish to run! You should use this
library only if the async function wrapping the delay doesn't need to be 
finished. Alternatively you may not cancel the delay or use the 
`cancelAndResolve` or `cancelAndReject` methods ot cancel the delay 


## API

```javascript

import Delay from '@distributed-systems/delay';

const delay = new Delay();

// wait for 10 seconds
delay.wait(10*1000);
```



### delay.wait(milliseconds)

Wait n milliseconds with the code execution

```javascript
delay.wait(250);
```



### delay.cancel()

cancels the delay. Attention: the code after the `delay.wait()` statement will 
never be executed!

```javascript
delay.cancel();
```



### delay.cancelAndResolve(value)

Cancels the delay, continues to run the code after the delay and returns the 
value.

```javascript
setTimeout(() => {
    delay.cancelAndResolve(35);
}, 10);

const value = delay.wait(100);

console.log(value); // 35
```





### delay.cancelAndReject(err)

Cancels the delay, continues to run the code after the delay but throws err as 
exception.

```javascript
setTimeout(() => {
    delay.cancelAndReject(new Error('stop!'));
}, 10);


try {
    delay.wait(100);
} catch (err) {
    console.log(err.message); // stop!
}
```