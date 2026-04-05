type HeaderProps = {
  title?: string
  subtitle?: string
  className?: string
}

export function Header({
  title = 'PRD Copilot',
  subtitle = 'Turn rough ideas into structured product requirements.',
  className,
}: HeaderProps) {
  return (
    <header
      className={className}
      style={{
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--border)',
        textAlign: 'left',
      }}
    >
      <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.75rem' }}>{title}</h1>
      <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.95rem' }}>
        {subtitle}
      </p>
    </header>
  )
}
