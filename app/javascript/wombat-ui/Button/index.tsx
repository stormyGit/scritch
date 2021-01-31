import React, { HTMLAttributes, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import classnames from 'classnames'

import { useWombatTheme } from '../theme'
import { IconProps } from '../../icons'
import ScritchProgress from '../../src/components/utils/ScritchProgress'

export type ButtonVariant = 'primary' | 'subtle' | 'ghost' | 'link' | 'subtle-link' | 'danger'
export type ButtonScale = 'xs' | 'sm' | 'base' | 'md' | 'lg'

export type ButtonProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    /**
     * Button type
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset'
    /**
     * Variant of the button
     * @default 'contained'
     */
    variant?: ButtonVariant
    /**
     * Scale to be applied to the button
     * @default 'base'
     */
    scale?: ButtonScale
    /**
     * Defines if the button is loading
     * By default a loading button will be disabled, to override this behaviour pass a 'disabled' prop
     * @default false
     */
    loading?: boolean
    /**
     * Icon only button
     * @default undefined
     */
    icon?: React.ElementType<IconProps>
    /**
     * Leading icon
     * @default undefined
     */
    leadingIcon?: React.ElementType<IconProps>
    /**
     * Trailing icon
     * @default undefined
     */
    trailingIcon?: React.ElementType<IconProps>
    /**
     * To ensure proper shadow a button element is wrapped within a span
     * Note: you probably don't want to alter those styles
     * @default: ''
     */
    containerClassname?: string
    /**
     * If set to true, the button will take 100% width of it's parent container
     * @default false
     */
    block?: boolean
    /**
     * Disabled state
     * @default false
     */
    disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            scale = 'base',
            variant = 'primary',
            block = false,
            type = 'button',
            icon = null,
            leadingIcon = null,
            trailingIcon = null,
            loading = false,
            className,
            containerClassname = '',
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const { theme } = useWombatTheme()

        const containerStyle = classnames(
            theme.button.container[variant],
            block && theme.button.block,
            containerClassname
        )
        const buttonStyle = classnames(
            theme.button.base,
            theme.button.variant[variant],
            theme.button.scale[scale],
            block && theme.button.block,
            className && className
        )

        const Icon = icon
        const LeadingIcon = leadingIcon
        const TrailingIcon = trailingIcon

        const iconStyle = classnames(theme.button.icon[scale].only)
        const leadingIconStyle = classnames(theme.button.icon[scale].leading)
        const trailingIconStyle = classnames(theme.button.icon[scale].trailing)

        const loaderContainerStyle = classnames(theme.button.loader[variant])
        const loaderStyle = classnames(theme.button.icon[scale].only)

        return (
            <span className={containerStyle}>
                <button
                    ref={ref}
                    disabled={loading ? true : disabled}
                    aria-disabled={loading || disabled ? 'true' : 'false'}
                    type={type}
                    className={buttonStyle}
                    {...props}
                >
                    {loading && (
                        <span className={loaderContainerStyle}>
                            <ScritchProgress size={10} />
                        </span>
                    )}
                    {icon && <Icon iconClassName={iconStyle} />}
                    {!icon && leadingIcon && <LeadingIcon iconClassName={leadingIconStyle} />}
                    {!icon && children}
                    {!icon && trailingIcon && <TrailingIcon iconClassName={trailingIconStyle} />}
                </button>
            </span>
        )
    }
)

Button.displayName = 'Button'

export default Button
