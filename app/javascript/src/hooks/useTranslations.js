import React from 'react'
import { useIntl } from 'react-intl'

export const formatOptions = {
    sup: (str) => <sup key={str}>{str}</sup>,
    b: (str) => (
        <span style={{ fontWeight: 'bold' }} key={str}>
            {str}
        </span>
    ),
}

const useTranslations = (options) => {
    const { formatMessage: t } = useIntl(options)

    return (id, options = {}) =>
        t(
            { id },
            {
                ...formatOptions,
                ...options,
            }
        )
}

export default useTranslations
