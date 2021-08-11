export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__author">&copy; {currentYear} Mesto Russia</p>
    </footer>
  )
}