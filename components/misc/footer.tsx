import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div><div className="footer-title"><span aria-hidden="true">✦</span> Payden K. Pringle</div><p>Work, interests, and stories worth sharing.</p></div>
        <Link href="/" className="footer-home">Back to the beginning <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-bottom"><span>A collection by Payden Pringle</span><span>MADE WITH CURIOSITY</span></div>
    </footer>
  )
}
