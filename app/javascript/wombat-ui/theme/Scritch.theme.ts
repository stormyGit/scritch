import { Theme } from '../types/Theme'

const theme: Theme = {
    badge: {
        base: {
            base: 'inline-block py-1 px-2 text-sm font-medium rounded max-w-max',
            sm: 'inline-block py-1 px-2 text-xs font-medium rounded max-w-max',
        },
        variant: {
            base: {
                primary: 'bg-primary-100 text-dark-100',
                secondary: 'bg-secondary-100 text-dark-100',
                danger: 'bg-danger-100 text-dark-100',
                warning: 'bg-warning-100 text-dark-100',
                success: 'bg-success-100 text-dark-100',
                help: 'bg-help-100 text-dark-100',
            },
            solid: {
                primary: 'bg-primary-700 text-light-0',
                secondary: 'bg-secondary-700 text-light-0',
                danger: 'bg-danger-700 text-light-0',
                warning: 'bg-warning-700 text-light-0',
                success: 'bg-success-700 text-light-0',
                help: 'bg-help-700 text-light-0',
            },
        },
    },
    button: {
        base:
            'inline-flex relative items-center font-medium justify-center transition duration-150 ease-in-out border rounded-md focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed',
        block: 'w-full',
        container: {
            primary: 'inline-flex rounded-md shadow-sm',
            danger: 'inline-flex rounded-md shadow-sm',
            subtle: 'inline-flex rounded-md shadow-sm',
            ghost: 'inline-flex rounded-md',
            link: 'inline-flex rounded-md',
            'subtle-link': 'inline-flex rounded-md',
        },
        loader: {
            primary:
                'absolute inset-0 flex items-center justify-center text-light-0 bg-primary-500',
            danger: 'absolute inset-0 flex items-center justify-center text-light-0 bg-error-500',
            subtle: 'absolute inset-0 flex items-center justify-center text-dark-100 bg-light-100',
            ghost: 'absolute inset-0 flex items-center justify-center text-dark-100 bg-light-100',
            link: 'invisible',
            'subtle-link': 'invisible',
        },
        variant: {
            primary:
                'text-light-0 bg-primary-500 border-transparent hover:bg-secondary-500 focus:bg-dark-500 active:bg-dark-500',
            danger:
                'text-light-0 bg-error-500 border-transparent hover:bg-error-300 focus:bg-error-700 active:bg-error-700',
            subtle:
                'uppercase text-light-100  border-light-300 hover:bg-light-0 hover:text-dark-500 focus:bg-dark-500 focus:text-light-0 active:bg-dark-500 active:text-light-0',
            ghost:
                'text-dark-100 border-transparent hover:bg-light-0 focus:bg-light-0 active:bg-light-0',
            link:
                'text-primary-500 border-transparent hover:underline focus:underline active:underline',
            'subtle-link':
                'text-dark-100 border-transparent hover:underline focus:underline active:underline',
        },
        scale: {
            xs: 'px-2.5 py-1.5 text-xs',
            sm: 'px-3 py-2 text-sm',
            base: 'px-4 py-2 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-base',
        },
        icon: {
            xs: {
                leading: '-ml-0.5 mr-1.5 h-3 w-3',
                trailing: 'ml-1.5 -mr-0.5 h-3 w-3',
                only: 'h-3 w-3',
            },
            sm: {
                leading: '-ml-0.5 mr-2 h-4 w-4',
                trailing: 'ml-2 -mr-0.5 h-4 w-4',
                only: 'h-4 w-4',
            },
            base: {
                leading: '-ml-1 mr-2 h-4 w-4',
                trailing: 'ml-2 -mr-1 h-4 w-4',
                only: 'h-4 w-4',
            },
            md: {
                leading: '-ml-1 mr-3 h-4 w-4',
                trailing: 'ml-3 -mr-1 h-4 w-4',
                only: 'h-4 w-4',
            },
            lg: {
                leading: '-ml-1 mr-3 h-5 w-5',
                trailing: 'ml-3 -mr-1 h-5 w-5',
                only: 'h-5 w-5',
            },
        },
    },
    link: {
        base:
            'text-primary-500 border-transparent hover:underline focus:underline active:underline',
        block: 'text-primary-500 border-transparent',
        button:
            'inline-flex rounded-md shadow-sm text-light-0 px-4 py-2 text-sm bg-primary-500 border-transparent no-underline hover:bg-secondary-500 focus:bg-dark-500 active:bg-dark-500',
        'button-subtle':
            'inline-flex rounded-md shadow-sm text-dark-100 px-4 py-2 text-sm text-dark-100 bg-light-100 border-light-300 hover:bg-light-0 focus:bg-dark-500 focus:text-light-0 active:bg-dark-500 active:text-light-0',
    },
    form: {
        checkbox: {
            base:
                'w-4 h-4 transition duration-150 ease-in-out rounded-sm text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
            variant: {
                container: {
                    base: 'relative flex items-start',
                    boxed: 'relative flex items-start px-3 py-2 rounded',
                },
                input: {
                    base: '',
                    boxed: 'self-center flex flex-col',
                },
                state: {
                    base: {
                        checked: '',
                        unchecked: '',
                    },
                    boxed: {
                        checked: '',
                        unchecked: '',
                    },
                },
            },
            group: {
                title: 'text-sm font-medium text-dark-100',
                description: 'mt-1 text-xs font-normal text-light-900',
                layout: {
                    col: 'flex flex-col pt-4 gap-y-2',
                    row: 'flex flex-wrap pt-4 gap-2',
                },
                help: {
                    default: 'mt-1 text-xs text-dark-100',
                    error: 'mt-1 text-xs text-error-500',
                },
            },
            status: {
                default: 'focus:shadow-outline-brand focus:border-primary-100',
                error:
                    'border-error-300 text-error-500 placeholder-error-300 focus:border-error-300 focus:shadow-outline-red',
            },
            label: {
                base: 'font-medium',
                able: 'text-dark-100',
                disabled: 'text-light-900',
            },
            help: {
                default: 'text-xs text-light-900',
                error: 'text-xs text-error-500',
            },
        },
        entry: {
            title: 'text-base font-medium text-dark-100',
            description: 'mt-1 text-xs font-normal leading-5 text-light-900',
            container: 'flex flex-col pt-3 gap-y-2',
        },
        input: {
            base:
                'block w-full transition duration-150 border-light-500 ease-in-out shadow-sm rounded sm:text-sm disabled:bg-light-0 disabled:cursor-not-allowed',
            size: {
                xsmall: 'max-w-xxs sm:max-w-xxxs',
                small: 'max-w-lg sm:max-w-xs',
                medium: 'max-w-lg',
                large: 'max-w-lg sm:max-w-2xl',
            },
            status: {
                default:
                    'focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
                error:
                    'border-error-300 text-error-500 placeholder-error-300 focus:border-error-300 focus:shadow-outline-red',
            },
            icon: {
                error: 'w-5 h-5 text-error-300',
            },
            label: {
                base: 'block text-sm font-medium mb-1',
                able: 'text-dark-100',
                disabled: 'text-light-900',
            },
            description: 'mt-1 text-sm font-normal text-dark-100',
            help: {
                default: 'mt-1 text-xs text-dark-100',
                error: 'mt-1 text-xs text-error-500',
            },
        },
        radio: {
            base:
                'w-4 h-4 align-baseline transition duration-150 ease-in-out text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
            variant: {
                container: {
                    base: 'relative flex items-start',
                    boxed: 'relative flex items-start px-3 py-2 rounded',
                },
                input: {
                    base: '',
                    boxed: 'flex flex-col pt-0.5',
                },
                state: {
                    base: {
                        checked: '',
                        unchecked: '',
                    },
                    boxed: {
                        checked: '',
                        unchecked: '',
                    },
                },
            },
            group: {
                title: 'text-sm font-medium text-dark-100',
                description: 'mt-1 text-xs font-normal text-light-900',
                layout: {
                    col: 'flex flex-col pt-4 gap-y-2',
                    row: 'flex flex-wrap pt-4 gap-4',
                },
                help: {
                    default: 'mt-1 text-xs text-dark-100',
                    error: 'mt-1 text-xs text-error-500',
                },
            },
            status: {
                default: 'focus:shadow-outline-brand focus:border-primary-100',
                error:
                    'border-error-300 text-error-500 placeholder-error-300 focus:border-error-300 focus:shadow-outline-red',
            },
            label: {
                base: 'font-medium',
                able: 'text-dark-100',
                disabled: 'text-light-900',
            },
            help: {
                default: 'text-xs text-dark-100',
                error: 'text-xs text-error-500',
            },
        },
        select: {
            base:
                'px-3 py-2 flex flex-wrap gap-1 block w-full transition duration-150 border border-light-500 ease-in-out bg-white shadow-sm rounded sm:text-sm sm:leading-5 disabled:bg-light-0 disabled:cursor-not-allowed',
            item: {
                base: 'py-2 px-3 hover:bg-primary-200 active:bg-primary-200 text-primary-900',
                selected: 'py-2 px-3 bg-primary-600 text-white font-semibold',
            },
            status: {
                default:
                    'focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50',
                error:
                    'border-error-300 text-error-500 placeholder-error-300 focus-within:border-error-300 focus-within:shadow-outline-red',
            },
            icon: {
                error: 'w-5 h-5 text-error-300',
            },
            label: {
                base: 'block text-sm font-medium leading-5 mb-1',
                able: 'text-dark-500',
                disabled: 'text-light-900',
            },
            description: 'mt-1 text-sm font-normal leading-5 text-dark-100',
            help: {
                default: 'mt-1 text-xs text-dark-100',
                error: 'mt-1 text-xs text-error-500',
            },
        },
        textarea: {
            base:
                'block w-full transition duration-150 shadow-sm rounded ease-in-out sm:text-sm sm:leading-5 border border-light-500 disabled:bg-light-0 disabled:cursor-not-allowed',
            status: {
                default:
                    'focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
                error:
                    'border-error-300 text-error-500 placeholder-error-300 focus:border-error-300 focus:shadow-outline-red',
            },
            icon: {
                error: 'w-5 h-5 text-error-300',
            },
            label: {
                base: 'block text-sm font-medium leading-5',
                able: 'text-dark-500',
                disabled: 'text-light-900',
            },
            help: {
                default: 'mt-1 text-xs text-dark-100',
                error: 'mt-1 text-xs text-error-500',
            },
        },
    },
    layout: {
        container: {
            base: 'max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8',
            narrow: 'max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8',
        },
    },
    typography: {
        h1: {
            header: 'text-light-100 text-4xl font-medium pt-14 first:pt-0 max-w-h1',
            description: 'text-light-700 text-base font-normal max-w-paragraph pt-2',
        },
        h2: {
            header: 'text-light-100 text-2xl font-semibold pt-10 first:pt-0 max-w-h2',
            description: 'text-light-700 text-sm font-normal max-w-paragraph pt-1',
        },
        h3: {
            header: 'text-light-100 text-lg font-semibold pt-8 first:pt-0 max-w-h3',
            description: 'text-light-700 text-sm font-normal max-w-paragraph',
        },
        h4: {
            header: 'text-light-100 text-base font-semibold pt-6 first:pt-0 max-w-h4',
            description: 'text-light-700 text-sm font-normal max-w-paragraph',
        },
        h5: {
            header: 'text-light-700 text-sm font-semibold pt-4 first:pt-0 max-w-h5',
            description: 'text-light-700 text-xs font-normal max-w-paragraph',
        },
        h6: {
            header: 'text-light-700 text-xs font-bold pt-4 first:pt-0 max-w-h6',
            description: 'text-light-700 text-sm font-normal max-w-paragraph',
        },
        ul: {
            base:
                'list-disc text-light-100 text-base font-normal space-y-1 max-w-paragraph pt-4 pl-10',
            item: '',
        },
        ol: {
            base:
                'list-decimal text-light-100 text-base font-normal space-y-1 max-w-paragraph pt-4 pl-10',
            item: '',
        },
        p: 'text-light-100 font-normal max-w-paragraph pt-4',
        span: 'text-light-100',
        base: 'text-light-100',
    },
}

// Used for Headwind to sort class properly
// <div className="pt-4 pl-10 font-normal justi text ring-primary-500 max-w-prose">

export default theme
