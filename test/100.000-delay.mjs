import section from 'section-tests';
import assert from 'assert';
import Delay from '../Delay.mjs';



section('Delay', (section) => {
    section.test('Instantiate', async() => {
        new Delay();
    });


    section.test('Wait', async() => {
        const delay = new Delay();
        const start = Date.now();

        await delay.wait(250);

        assert(Date.now() - start >= 250);
    });


    section.test('Cancel', async() => {
        const delay = new Delay();
        const testDelay = new Delay();
        let called = false;

        delay.wait(250).then(() => {
            called = true;
        });

        delay.cancel();

        await testDelay.wait(350);

        assert(called === false);
    });


    section.test('Cancel and Resolve', async() => {
        const delay = new Delay();
        const testDelay = new Delay();
        let called = false;
        let value;

        delay.wait(250).then((val) => {
            value = val;
            called = true;
        });

        delay.cancelAndResolve(1);

        await testDelay.wait(100);

        assert(called === true);
        assert(value === 1);
    });


    section.test('Cancel and Reject', async() => {
        const delay = new Delay();
        const testDelay = new Delay();
        let called = false;
        let value;

        delay.wait(250).catch((err) => {
            value = err;
            called = true;
        });

        delay.cancelAndReject(new Error('2'));

        await testDelay.wait(100);

        assert(called === true);
        assert(value.message === '2');
    });
});
