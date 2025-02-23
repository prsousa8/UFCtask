import Link from "next/link";

// components/Header.tsx
const Header = () => {
    return (
      <header className="bg-indigo-600 py-4 px-6">
        <nav className="container mx-auto flex justify-between items-center text-white">
          <div className="text-xl font-semibold"><Link href="/">UFCTask</Link></div>
          <div className="space-x-6">
            <Link href="/" className="hover:text-indigo-300">Home</Link>
            <Link href="/cadastro" className="hover:text-indigo-300">Cadastro</Link>
            <Link href="/lista" className="hover:text-indigo-300">Lista</Link>
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;
  