"use client";
import Button from '../components/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  return (
    <div className='min-h-screen'>
        <main className="flex flex-col items-center text-center p-8">
          {/* Hero Section */}
          <section className="text-center py-20 bg-blue-500 text-white mb-4 w-6xl">
            <h2 className="text-4xl font-bold">Welcome to NextBank</h2>
            <p className="mt-4 text-lg">The secure and smart way to manage your finances online.</p>
            <Link href="/accounts/create" className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg mt-6 inline-block">
              Get Started
            </Link>
          </section>

                {/* Features Section */}
          <section className="py-16 px-8 w-6xl">
            <h3 className="text-3xl font-semibold text-center mb-8">Why Choose NextBank?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard title="Secure Transactions" desc="Your money is safe with our top-tier security measures." icon="🔒" />
              <FeatureCard title="Easy Online Banking" desc="Manage your accounts anytime, anywhere." icon="💻" />
              <FeatureCard title="Fast Payments" desc="Send and receive money instantly with zero fees." icon="⚡" />
            </div>
          </section>
        
              {/* Testimonials Section */}
          <section className="py-16 bg-gray-200 px-8 w-6xl">
            <h3 className="text-3xl font-semibold text-center mb-8">What Our Customers Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Testimonial name="John Doe" review="NextBank has transformed the way I handle my finances. Highly recommend!" />
              <Testimonial name="Jane Smith" review="Seamless transactions and a user-friendly interface. Love it!" />
            </div>
          </section>

          {/* <div className="m-3">
          <h1 className="text-4xl font-bold mb-4">Secure and Reliable Online Banking</h1>
          <p className="text-lg text-gray-700 max-w-xl mb-6">
            Manage your accounts, make transactions, and stay in control of your finances with our secure banking platform.
          </p>
          </div> */}

          
          <div className="flex space-x-4 m-5">
            <Button onClick={() => router.push('/auth/login')} text="Login" color="blue" />
            <Button onClick={() => router.push('/auth/register')} text="Get Started" color="blue" />
          </div>
      </main>
    </div>
  );
}


/* Feature Card Component */
function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white p-6 shadow-md rounded text-center">
      <p className="text-4xl">{icon}</p>
      <h4 className="text-xl font-semibold mt-4">{title}</h4>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

/* Testimonial Card Component */
function Testimonial({ name, review }) {
  return (
    <div className="bg-white p-6 shadow-md rounded">
      <p className="text-lg font-semibold">"{review}"</p>
      <p className="text-gray-600 mt-2">- {name}</p>
    </div>
  );
}