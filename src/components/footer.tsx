import Link from 'next/link';
import { LuFacebook, LuInstagram, LuTwitter } from 'react-icons/lu';

export function Footer() {
  return (
    <footer className=" text-gray-400 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Acme Inc.</h3>
            <p className="mb-2">
              <span className="font-medium">Hours:</span>
              9am - 5pm, Mon - Fri{'\n                    '}
            </p>
            <p className="mb-2">
              <span className="font-medium">Phone:</span>
              +1 (555) 123-4567{'\n                    '}
            </p>
            <p className="mb-2">
              <span className="font-medium">Address:</span>
              123 Main St, Anytown USA{'\n                    '}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link className="hover:text-gray-300" href="#">
                <LuTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link className="hover:text-gray-300" href="#">
                <LuFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link className="hover:text-gray-300" href="#">
                <LuInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div />
          <div className="text-right">
            <p className="mb-2">© 2024 Acme Inc. All rights reserved.</p>
            <Link className="text-gray-400 hover:text-gray-300" href="#">
              Terms of Service
            </Link>
            <span className="mx-2">|</span>
            <Link className="text-gray-400 hover:text-gray-300" href="#">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
