import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card', className)}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('mb-6', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  icon?: React.ReactNode
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  children,
  icon,
  ...props
}, ref) => {
  return (
    <h2
      ref={ref}
      className={clsx('text-xl font-display font-semibold text-neutral-800 flex items-center gap-2', className)}
      {...props}
    >
      {icon && <span className="text-primary-500">{icon}</span>}
      {children}
    </h2>
  )
})

CardTitle.displayName = 'CardTitle'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('space-y-6', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }