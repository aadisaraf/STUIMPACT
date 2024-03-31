'use client'
import AgeDropdown from '../../components/AgeDropDown.js'
import InternshipTypeDropdown from '../../components/InternshipTypeDropdown.js'
import Location from '../../components/Location.js'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import {redirect} from 'next/navigation'
import UserCard from '../../components/UserCard'
import { signOut } from 'next-auth/react'
import Navbar from '../../components/Navbar'

export default function Home() {
  const { data:session } = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/api/auth/signin?callbackUrl=/')
    }
  })
  const handleSignOut = async () =>{
    await signOut
  }
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedInternshipTypes, setSelectedInternshipTypes] = useState([]);
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: '',
  });

  console.log('Selected Grade:', selectedGrade);
  console.log('Selected Internship Types:', selectedInternshipTypes);
  console.log('Selected Location:', location);

  const handleSubmit = async () => {
    try {
      // Make a POST request to your Flask API with the location, grade, and internship types data
      const response = await fetch('http://localhost:5000/api/save_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          selectedGrade,
          selectedInternshipTypes,
        }),
      });

      if (response.ok) {
        console.log('Data sent successfully.');
        alert("Successful submission")
      } else {
        console.error('Failed to send data.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col">
    <main>
    <Navbar/>
    </main>
    <UserCard user = {session?.user} pagetype = {"Client"}/> 
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative">
        <AgeDropdown setSelectedGrade={setSelectedGrade} />
        <InternshipTypeDropdown setSelectedInternshipTypes={setSelectedInternshipTypes} />
        <Location
          city={location.city}
          state={location.state}
          country={location.country}
          onCityChange={(e) => setLocation((prev) => ({ ...prev, city: e.target.value }))}
          onStateChange={(e) => setLocation((prev) => ({ ...prev, state: e.target.value }))}
          onCountryChange={(e) => setLocation((prev) => ({ ...prev, country: e.target.value }))}
        />

        {/* Add a "Submit" button within the form */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
          Submit
        </button>
      </div>
    </main>
    </section>
  );
}

          
          {/* <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
} */}
