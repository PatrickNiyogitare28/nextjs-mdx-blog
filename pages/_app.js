import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {  
  return (
   <div className="flex flex-col">
      <nav style={{height: '20vh'}} className="flex place-content-center">
        <ul className="flex w-50 justify-between">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
         
        </ul>
      </nav>
      <div className="flex place-content-center">
        <Component {...pageProps} />
      </div>
   </div>
  )
}

export default MyApp
