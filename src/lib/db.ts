import { AceBase } from 'acebase';
import { AceBaseClient } from 'acebase-client';
import { browser } from '$app/env';

import dbConfig from '$conf/acebase.json';

export const mkDb = (name: string) =>
    browser ?
        AceBase.WithIndexedDB(name, { multipleTabs: true }) :
        new AceBase(name);

export const openDb = async () => {
    console.log({ dbConfig });

    const remote = new AceBaseClient({
        cache: { db: await mkDb(dbConfig.cachename) },
        ...dbConfig
    });

    return remote;
}

export const getStore = async <T>(root: string, default_?: T) => {
    const remote = await openDb();
    await remote.ready();

    const ref = remote.ref(root);

    const proxy = await ref.proxy();
    if (!proxy.hasValue) {
        proxy.value = default_;
    }

    const store = {
        set: (val: T) => { proxy.value = val; },
        subscribe: (cb: (val: T) => void) => {
            cb(proxy.value);
            const stream = ref.on('value', true);
            const sub = stream.subscribe((val: any) => cb(val.val()));
            return sub.stop;
        },
        push: async (child: any) => await ref.push(child),
    }

    return store;
}
