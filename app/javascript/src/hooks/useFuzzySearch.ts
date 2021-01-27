import { useMemo } from 'react'

import { isEmpty } from 'lodash'
import Fuse from 'fuse.js'

export default function useFuzzySearch<T>(
    items: T[],
    query: string,
    options: Fuse.IFuseOptions<T> & { matchIfEmpty?: boolean }
) {
    const index = useMemo(() => new Fuse(items, options), [items, options])

    const results = useMemo(() => {
        if (isEmpty(query) && options.matchIfEmpty)
            return items.map((item, index) => ({
                item,
                matches: [],
                score: 1,
                refIndex: index,
            })) as Fuse.FuseResult<T>[]

        return index.search(query)
    }, [index, query])

    return results
}
