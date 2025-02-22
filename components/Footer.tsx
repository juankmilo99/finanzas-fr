export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-center py-4 flex-shrink-0">
       © {new Date().getFullYear()} JxcrDev. Todos los derechos reservados.
      <br />
      <a href="https://portfolio-juan-r.netlify.app/" className="text-blue-500 hover:underline">Contact me here</a>
     
    </footer>
  );
}
